import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

function SplashScreen({navigation}) {
  const isLoading = useSelector(state => state.login.loading);
  const userToken = useSelector(state => state.login.userToken);
  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    let loginStatus = await AsyncStorage.getItem('isUserLoggedIn');
    console.log('loginStatus', loginStatus);
    setTimeout(() => {
      if (loginStatus) {
        navigation.navigate('Drawer');
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
