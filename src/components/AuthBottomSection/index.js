import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const contactNo = '919879208610';
const supportEmail = 'hello@uptrust.co.in';

export default props => (
  <>
    <View style={[styles.bottomSec, props.containerStyle]}>
      <LinearGradient
        colors={['#0096C7', '#0077B6', '#0077B6']}
        style={[
          styles.middleBtn,
          {
            marginTop: -60,
          },
        ]}>
        <TouchableOpacity
          style={styles.middleBtn}
          onPress={() => {
            Linking.openURL(`mailto:reach@techforceglobal.com`);
          }}>
          <Image
            style={styles.middleIcon}
            source={require('../../assets/images/email.png')}
          />
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity
        style={styles.middleBtn}
        onPress={() =>
          props.navigation.navigate('GetAQotes', {
            isBack: false,
          })
        }>
        <Image
          style={[styles.middleIcon, {marginTop: -60, width: 76, height: 76}]}
          source={require('../../assets/images/i-ensure.png')}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={['#0096C7', '#0077B6', '#0077B6']}
        style={[
          styles.middleBtn,
          {
            marginTop: -60,
          },
        ]}>
        <TouchableOpacity
          style={styles.middleBtn}
          onPress={() => {
            Linking.openURL(`tel:${+917948904529}`);
          }}>
          <Image
            style={styles.middleIcon}
            source={require('../../assets/images/call2.png')}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </>
);
const styles = StyleSheet.create({
  bottomSec: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // position: "absolute",
    // bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 40,
  },
  bottomBtn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnImg: {
    height: 26,
    width: 37,
  },
  middleBtn: {
    height: 66,
    width: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleIcon: {
    height: 46,
    width: 28,
    resizeMode: 'contain',
  },
});
