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
import BottomSection from '../../components/BottomSection/BottomSection';
import Header from "../../components/default/Header";

function Profile({ navigation }) {
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/headerBgImg.png')}
        style={styles.headerBgImg}>
        <Header isMenu={true} rightIcon={true} rightIconImage={require("../../assets/images/Notification.png")} navigation={navigation} />
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
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('../../assets/images/userBack.png')}
            style={{
              width: 63,
              height: 63,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/userr.png')}
              style={{ width: 22, height: 22 }}
            />
          </ImageBackground>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: '#000' }]}>{'Hello, '}</Text>
          <Text style={[styles.titleText2, , { color: '#000' }]}>{'User'}</Text>
        </View>
        <Text style={styles.titleTxt}>{'Registered details'}</Text>
        <Text style={styles.textStyle}>UserName</Text>
        <Text style={styles.textStyle}>9876543210</Text>
        <Text style={styles.textStyle}>user@techforceglobal.com</Text>
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
    backgroundColor: '#F8F8F8',
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
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleTxt: {
    fontSize: 17,
    // alignSelf: "center",
    color: '#444444',
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
    color: '#444444',
    paddingLeft: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    color: '#FFFFFF',
  },
  titleText2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textStyle: {
    padding: 16,
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#ffffff',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
});
