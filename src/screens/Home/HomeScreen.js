import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSection from '../../components/BottomSection/BottomSection';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/default/Header';
import Carousel from 'react-native-snap-carousel';
import Helpers from '../../utils/Helpers';
import Constant from '../../utils/Constant';
import axiosPostClient from '../../api/ApiClient';
import ApiRequest from '../../api/ApiRequest';
import {useDispatch} from 'react-redux';
import {SET_NOTIFICATION_COUNT} from '../../redux/types';
import Colors from '../../config/Colors';
import PushNotification from 'react-native-push-notification';
import Logger from '../../utils/Logger';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlertDialog from '../../components/default/CustomAlertDialog';

const {width: screenWidth, height} = Dimensions.get('window');

const contactUsUrl = 'https://www.uptrust.co.in/contact.php';

const imageData = [
  {
    image: require('../../assets/images/image11.png'),
  },
  {
    image: require('../../assets/images/image13.png'),
  },
  {
    image: require('../../assets/images/image10.png'),
  },
  {
    image: require('../../assets/images/image9.png'),
  },
  {
    image: require('../../assets/images/image12.png'),
  },
];

const HomeScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isSessionExpired, setSessionExpired] = useState(false);
  const dispatch = useDispatch();

  const getUsetNameFromPref = async () => {
    const name = await Helpers.getFromPref(Constant.PREF_USER_NAME, '');
    setUserName(name);
  };

  useEffect(() => {
    getUsetNameFromPref();
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callGetNotificationListApi();
    });
    return unsubscribe;
  }, [navigation]);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      await messaging().registerDeviceForRemoteMessages();
      await messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log('fcmToken is--', fcmToken);
            AsyncStorage.setItem('fcmToken', fcmToken.toString());
          }
        });
    }
  }

  const openContactUsPage = () => {
    //Opening default browser and loading uptrust url
    Linking.canOpenURL(contactUsUrl).then(supported => {
      if (supported) {
        Linking.openURL(contactUsUrl);
      } else {
        Logger.log("Don't know how to open URI: " + contactUsUrl);
      }
    });
  };

  const callGetNotificationListApi = async () => {
    if (await Helpers.checkInternet()) {
      const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, '');
      const access_token = await Helpers.getFromPref(
        Constant.PREF_ACCESS_TOKEN,
        '',
      );
      Logger.log(
        'Calling GetHealthCardList Api:=>>' +
          Constant.API_BASE_URL +
          Constant.API_GET_USER_DETAIL,
      );
      var params = await ApiRequest.getInquiryListRequest(userId, access_token);
      axiosPostClient()
        .post(Constant.API_GET_NOTIFICATIONS, params)
        .then(response => {
          if (response?.data && response?.data?.status == 200) {
            setNotificationCount(response?.data?.data.length);
            dispatch({
              type: SET_NOTIFICATION_COUNT,
              payload: response?.data?.data.length,
            });
          } else if (response?.data && response?.data?.status == 401) {
            setMessage(response?.data?.message);
            setSessionExpired(true);
          } else {
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
    }
  };

  const proceedLogout = async () => {
    /*await Helpers.saveInPref(Constant.PREF_TOKEN, "")
         await Helpers.removeFromPref(Constant.PREF_USER_INFO)
         await Helpers.removeFromPref(Constant.PREF_ACCESS_TOKEN)
         await Helpers.removeFromPref(Constant.PREF_USER_NAME)
          dispatch({
             type: SIGN_IN,
             payload: ''
         })*/
    await Helpers.performLogout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    dispatch({
      type: SIGN_IN,
      payload: '',
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginVertical: 20}}>
        <Image
          source={item.image}
          style={styles.bannerImg}
          // resizeMode={'contain'}
        />
      </View>
    );
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/headerBgImg.png')}
        style={styles.headerBgImg}>
        <Header
          isMenu={true}
          rightIcon={true}
          notificationCnt={notificationCount ? notificationCount : null}
          rightIconImage={require('../../assets/images/Notificationbell.png')}
          navigation={navigation}
        />
        <View style={styles.headerName}>
          <Text style={styles.headerText}>{'Hello,'}</Text>
          <Text style={styles.headerText2}>
            {userName ? userName : 'User long name'}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 1,
          }}>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth}
            loop
            autoplay
            autoplayDelay={1000}
            data={imageData}
            renderItem={renderItem}
          />

          <View style={styles.bottomContainer}>
            <View>
              <TouchableOpacity
                style={styles.columnImgView}
                onPress={() => navigation.navigate('HealthCard')}>
                <Image
                  source={require('../../assets/images/HealthCard.png')}
                  style={styles.columnImg}
                />
              </TouchableOpacity>
              <Text style={styles.columntext}>Health Card</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.columnImgView}
                onPress={() => navigation.navigate('Inquiry')}>
                <Image
                  source={require('../../assets/images/Group.png')}
                  style={styles.columnImg}
                />
              </TouchableOpacity>
              <Text style={styles.columntext}>Inquiry</Text>
            </View>
          </View>
          <View style={[styles.bottomContainer, {marginVertical: 20}]}>
            <View>
              <TouchableOpacity
                style={styles.columnImgView}
                onPress={() => navigation.navigate('Reminder')}>
                <Image
                  source={require('../../assets/images/Group28.png')}
                  style={styles.columnImg}
                />
              </TouchableOpacity>
              <Text style={styles.columntext}>Reminder</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.columnImgView}
                onPress={() => openContactUsPage()}>
                <Image
                  source={require('../../assets/images/Frame(1).png')}
                  style={styles.columnImg}
                />
              </TouchableOpacity>
              <Text style={styles.columntext}>About Us</Text>
            </View>
          </View>
        </ScrollView>
        <CustomAlertDialog
          visible={isSessionExpired}
          onCloseDialog={() => {
            setSessionExpired(false);
            proceedLogout();
          }}
          description={message}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    // alignItems: "center",
    // display: 'flex'
    flex: 1,
  },
  container: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: height - 200,
    position: 'absolute',
    bottom: 0,
  },
  headerSec: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '300',
    color: Colors.whiteColor,
    fontFamily: 'Poppins-Regular',
  },
  headerText2: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.whiteColor,
    fontFamily: 'Poppins-SemiBold',
  },
  bannerImg: {
    height: screenWidth - 50,
    width: screenWidth,
    alignSelf: 'center',
    // resizeMode: 'stretch',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnImg: {
    width: 75,
    height: 60,
    resizeMode: 'contain',
  },
  columntext: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.blackColor,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  columnImgView: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.columnImgBorderColor,
    width: 132,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
