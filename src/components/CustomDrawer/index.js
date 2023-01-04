import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Helpers from '../../utils/Helpers';
import Constant from '../../utils/Constant';
import CustomLogoutDialog from '../default/CustomLogoutDialog';
import axiosPostClient from '../../api/ApiClient';
import ApiRequest from '../../api/ApiRequest';
import Indicator from '../default/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerList = [
  {
    title: 'Home',
    slug: 'dashboard',
  },
  {
    title: 'My Claim',
    slug: 'claim_history',
  },
  {
    title: 'My Inquiry',
    slug: 'inquiry_list',
  },
  {
    title: 'My Reminders',
    slug: 'reminder_list',
  },
  {
    title: 'My Notifications',
    slug: 'notifications_list',
  },
  {
    title: 'Get A Quote',
    slug: 'get_a_quote',
  },
  {
    title: 'Profile',
    slug: 'profile',
  },
  {
    title: 'Logout',
    slug: 'logout',
  },
];

const CustomDrawer = props => {
  const [indexs, setIndex] = useState(0);
  const dispatch = useDispatch();
  const [showLogoutDialog, setLogoutDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const onItemClick = (slug, index) => {
    setIndex(index);
    if (slug == 'dashboard') {
      props.navigation.closeDrawer();
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else if (slug == 'profile') {
      props.navigation.closeDrawer();
      props.navigation.navigate('Profile');
    } else if (slug == 'claim_history') {
      props.navigation.closeDrawer();
      props.navigation.navigate('ClaimList');
    } else if (slug == 'inquiry_list') {
      props.navigation.closeDrawer();
      props.navigation.navigate('InquiryList');
    } else if (slug == 'reminder_list') {
      props.navigation.closeDrawer();
      props.navigation.navigate('ReminderList');
    } else if (slug == 'notifications_list') {
      props.navigation.closeDrawer();
      props.navigation.navigate('NotificationList', {
        isBack: false,
      });
      // props.navigation.navigate("MyPushnotifications");
    } else if (slug == 'get_a_quote') {
      props.navigation.closeDrawer();
      props.navigation.navigate('GetAQotes', {
        isBack: false,
      });
      // props.navigation.navigate("GetAQuote");
    } else if (slug == 'logout') {
      setLogoutDialog(true);
    }
  };
  const getIcon = slug => {
    if (slug == 'dashboard') {
      return require('../../assets/images/home3.png');
    } else if (slug == 'profile') {
      return require('../../assets/images/Vectoruserpic.png');
    } else if (slug == 'claim_history') {
      return require('../../assets/images/Vectorcla.png');
    } else if (slug == 'inquiry_list') {
      return require('../../assets/images/Vectorinq.png');
    } else if (slug == 'reminder_list') {
      return require('../../assets/images/Vectorrem.png');
    } else if (slug == 'notifications_list') {
      return require('../../assets/images/ic_notification.png');
    } else if (slug == 'get_a_quote') {
      return require('../../assets/images/ic_quote_slider.png');
    } else if (slug == 'logout') {
      return require('../../assets/images/ic_logout.png');
    }
  };

  const getUsetNameFromPref = async () => {
    let name = await Helpers.getFromPref(Constant.PREF_USER_INFO, '');
    setUser(JSON.parse(name));
  };

  useEffect(() => {
    getUsetNameFromPref();
  }, []);

  const onLogoutYesClick = async () => {
    /*await Helpers.saveInPref(Constant.PREF_TOKEN, "") 
        await Helpers.removeFromPref(Constant.PREF_USER_INFO)
        await Helpers.removeFromPref(Constant.PREF_ACCESS_TOKEN)
        await Helpers.removeFromPref(Constant.PREF_USER_NAME)
        await Helpers.removeFromPref(Constant.PREF_USER_ID)

        if (auth().currentUser != null) {
            auth().signOut()
        }*/
    await AsyncStorage.clear();
    // await Helpers.performLogout();
    // dispatch({
    //   type: SIGN_IN,
    //   payload: "",
    // });
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    // props.navigation.navigate('Login');
  };

  const callLogoutApi = async () => {
    if (await Helpers.checkInternet()) {
      const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, '');
      const access_token = await Helpers.getFromPref('');
      setLoading(true);
      var params = await ApiRequest.logoutRequest(userId, access_token);
      axiosPostClient()
        .post(Constant.API_LOGOUT, params)
        .then(response => {
          console.log('response--', response);
          setLoading(false);
          if (response?.status == 200) {
            onLogoutYesClick();
          } else if (response?.status == 401) {
            //Logout user if received 401 status code.
            // setMessage(response?.data?.message);
          } else {
            // setMessage(response?.data?.message);
          }
        })
        .catch(error => {
          setLoading(false);
          // setMessage(JSON.stringify(error));
          Logger.log('error' + JSON.stringify(error));
        });
    } else {
      // setMessage(Constant.NO_INTERNET);
    }
  };

  const renderItem = ({ item, index }) => {
    return indexs == index ? (
      <TouchableOpacity
        onPress={() => {
          onItemClick(item.slug, index);
        }}
        style={styles.tabContainer}>
        <LinearGradient
          colors={['#0077B6', '#0096C7', '#0077B6']}
          style={{ flex: 1, borderRadius: 10 }}>
          <View style={styles.tab}>
            <Image source={getIcon(item.slug)} style={styles.imageActive} />
            <Text style={styles.textActive}>{item.title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          onItemClick(item.slug, index);
        }}
        style={styles.tabContainer}>
        <View style={styles.tab}>
          <Image source={getIcon(item.slug)} style={styles.imageTab} />
          <Text style={styles.textTab}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <View>
            <Text style={styles.textHello}>Hello,</Text>
            <Text style={styles.textName}>{user?.name}</Text>
          </View>
          <View style={{ width: '30%' }}>
            <ImageBackground
              source={require('../../assets/images/userBack1.png')}
              style={styles.userPic}>
              <Text style={styles.userPictext}>
                {user?.name.charAt(0).toUpperCase()}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.mobEmailView}>
          <View style={styles.mobEmail}>
            <Image
              source={require('../../assets/images/call.png')}
              style={styles.mobEmailPic}
            />
            <Text style={styles.mobEmailText}>+91 {user?.phone}</Text>
          </View>
          <View style={styles.mobEmail}>
            <Image
              source={require('../../assets/images/emailIcon.png')}
              style={[styles.mobEmailPic, { tintColor: '#0090C3' }]}
            />
            <Text style={styles.mobEmailText}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.flatlist}>
          {/* <DrawerItemList {...props} /> */}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={drawerList}
            renderItem={renderItem}
            style={{ padding: 5 }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Image
          source={require('../../assets/images/comn.png')}
          style={styles.footerLogo}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textV}>Version</Text>
          <Text style={styles.textVersion}>1.0</Text>
        </View>
      </View>
      <CustomLogoutDialog
        visible={showLogoutDialog}
        onNoClick={() => {
          setLogoutDialog(false);
        }}
        onYesClick={() => {
          setLogoutDialog(false);
          callLogoutApi();
          // onLogoutYesClick();
        }}
        message={'Are you sure you want to logout?'}
      />
      <Indicator showLoader={isLoading} />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
  },
  userPic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPictext: {
    fontSize: 50,
    fontWeight: '600',
    color: '#ffffff',
    position: 'absolute',
  },
  textHello: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  textName: {
    color: '#000',
    fontSize: 14,
    marginRight: 5,
    fontWeight: '400',
    maxWidth: 150,
  },
  mobEmail: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mobEmailPic: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  mobEmailText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#444444',
    marginLeft: 10,
    // maxWidth: 160,
  },
  textV: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
  textVersion: {
    fontSize: 16,
    marginLeft: 5,
    color: '#F27C22',
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
  },
  tabContainer: {
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  tab: {
    height: 50,
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  imageActive: {
    // tintColor: "white",
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  textActive: {
    color: 'white',
    paddingStart: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  imageTab: {
    // tintColor: "white",
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: '#9D9696',
  },
  textTab: {
    color: 'black',
    paddingStart: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerLogo: {
    width: 150,
    height: 40,
    resizeMode: 'stretch',
  },
  mobEmailView: {
    display: 'flex', 
    justifyContent: 'flex-start', 
    paddingLeft: 10, 
    paddingRight: 10
  }
});
