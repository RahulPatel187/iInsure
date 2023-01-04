import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import BottomSection from '../../components/BottomSection/BottomSection';
import Header from "../../components/default/Header";
import Colors from '../../config/Colors';

function Profile({ navigation }) {
  const userInfo = useSelector((state) => state.login.userInfo);
  const notificationCount = useSelector((state) => state.login.notificationCount);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/headerBgImg.png')}
        style={styles.headerBgImg}>
        <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/userScreen.png')}
            style={styles.logoImg}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{'My '}</Text>
          <Text style={styles.titleText2}>{'Profile'}</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <View
          style={styles.flex}>
          <ImageBackground
            source={require('../../assets/images/userBack.png')}
            style={styles.flexImgBg}>
            <Image
              source={require('../../assets/images/userr.png')}
              style={styles.flexImg}
            />
          </ImageBackground>
        </View>
        <View style={styles.titleContainer2}>
          <Text style={[styles.titleText, { color: Colors.blackColor }]}>{'Hello, '}</Text>
          <Text style={[styles.titleText2, , { color: Colors.blackColor }]}>{userInfo ? userInfo.name : 'User'}</Text>
        </View>
        <Text style={styles.titleTxt}>{'Registered details'}</Text>
        <Text style={styles.textStyle}>{userInfo ? userInfo.name : 'UserName'}</Text>
        <Text style={styles.textStyle}>{userInfo ? userInfo.phone : '9876543210'}</Text>
        <Text style={styles.textStyle}>{userInfo ? userInfo.email : 'user@techforceglobal.com'}</Text>
      </View>
    </>
  );
}
export default Profile;

const styles = StyleSheet.create({
  headerBgImg: {
    width: '100%',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: "center",
    // paddingBottom: 20,
  },
  logoImg: {
    width: 100,
    height: 110,
    resizeMode: 'stretch',
  },
  container: {
    backgroundColor: Colors.containerColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    bottom: 0,
    padding: 20,
    width: '100%',
    height: '68%',
  },
  keyboardViewStyle: {
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  keyboardStyle: {
    marginTop: -25,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleTxt: {
    fontSize: 17,
    // alignSelf: "center",
    color: Colors.labelTextColor,
    fontWeight: '500',
    // textAlign: "center",
    marginTop: 10,
  },
  mainBox: {
    width: '90%',
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: 10,
  },
  labelTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.labelTextColor,
    paddingLeft: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  titleContainer2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: '300',
    color: Colors.whiteColor,
  },
  titleText2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: '600',
    color: Colors.whiteColor,
    flexWrap: 'wrap'
  },
  textStyle: {
    padding: 16,
    borderRadius: 5,
    color: Colors.blackColor,
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: Colors.unSelectTextColor
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexImgBg: {
    width: 63,
    height: 63,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexImg: { 
    width: 22, 
    height: 22 
  }
});
