import {Dimensions, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logger from '../utils/Logger';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import Constant from '../utils/Constant';

const fontScale = Dimensions.get('window').fontScale;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Helpers = {
  saveInPref: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      Logger.log('Error storing ' + key, error);
    }
    Logger.log('Helpers saveInPref' + key + ' ' + value);
  },

  getFromPref: async (key, defaultValue) => {
    var value = defaultValue;
    try {
      value = await AsyncStorage.getItem(key);
      console.log(value);
      if (value !== null) {
        // We have data!!
      } else {
        value = defaultValue;
      }
    } catch (error) {
      // Error retrieving data
      value = defaultValue;
      Logger.log('Error getting ' + key, error);
    }
    return value;
  },

  removeFromPref: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      Logger.log('Error removing ' + key, error);
    }
    Logger.log('RemoveValue ' + key);
  },

  removeAllPref: async () => {
    try {
      await AsyncStorage.clear();
      Logger.log('Storage successfully cleared!');
    } catch (e) {
      Logger.log('Failed to clear the async storage. ' + error);
    }
  },

  getDynamicSize(size) {
    if (windowHeight > windowWidth) {
      // if (fontScale > 1) {
      //     return (windowWidth * size) / 375;
      // } else {
      //     return (windowWidth * size) / 375 / fontScale;
      // }
      return (windowWidth * size) / 375;
    } else {
      return (windowHeight * size) / 667 / fontScale; // For Returning in px
    }
  },
  errorDialog: async (title, description) => {
    return Alert.alert(
      '',
      description,
      [{text: 'OK', onPress: () => Logger.log('OK Pressed')}],
      {cancelable: false},
    );
  },
  getFormattedQty: value => {
    //return Number(value).toFixed(2)
    //Logger.log("Value inside method" + value)
    if (value % 1 == 0) {
      //Logger.log("Value not contains point")
      return Number(value).toFixed(2);
    } else {
      //Logger.log("Value contains point")
      return value;
    }
  },
  checkInternet: async () => {
    try {
      // NetInfo.fetch().then(state => {
      //     Logger.log("Connection type" + state.type);
      //     Logger.log("Is connected?" + state.isConnected);
      //     return state.isConnected
      // });
      var netInfo = await NetInfo.fetch();
      return netInfo.isConnected;
    } catch (e) {
      Logger.log('error ' + error);
    }
  },
  performLogout: async () => {
    await AsyncStorage.clear();
    await Helpers.saveInPref(Constant.PREF_TOKEN, '');
    await Helpers.removeFromPref(Constant.PREF_USER_INFO);
    await Helpers.removeFromPref(Constant.PREF_ACCESS_TOKEN);
    await Helpers.removeFromPref(Constant.PREF_USER_NAME);
    await Helpers.removeFromPref(Constant.PREF_USER_ID);
    if (auth().currentUser != null) {
      Logger.log('logout from firebase');
      auth().signOut();
    }
  },
};
export default Helpers;
