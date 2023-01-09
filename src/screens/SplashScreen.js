import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Constant from '../utils/Constant';
import Helpers from '../utils/Helpers';
import { SET_USER_INFO } from '../redux/types';

function SplashScreen({navigation}) {
  const isLoading = useSelector(state => state.login.loading);
  const userToken = useSelector(state => state.login.userToken);
  const dispatch = useDispatch();
  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    let loginStatus = await AsyncStorage.getItem('isUserLoggedIn');
    var userInfo = await Helpers.getFromPref(Constant.PREF_USER_INFO);
    console.log('loginStatus', loginStatus);
    setTimeout(() => {
      if (loginStatus) {
        navigation.navigate('Drawer');
        dispatch({
          type: SET_USER_INFO,
          payload: userInfo,
        });
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Splash.png')}
        style={styles.headerBgImg}
      />
    </View>
  );
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: -20,
  },
  headerBgImg: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    resizeMode: 'stretch',
  },
});
