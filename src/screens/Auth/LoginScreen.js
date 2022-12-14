import React, {useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from '../../components/SafeAreaView';
import AuthBottomSection from '../../components/AuthBottomSection';

function LoginScreen({navigation}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardViewStyle}
        showsVerticalScrollIndicator={false}
        style={styles.keyboardStyle}>
        <ImageBackground
          source={require('../../assets/images/headerBgImg.png')}
          style={styles.headerBgImg}>
          <View style={styles.timerView}>
            <Image
              style={styles.logoImg}
              source={require('../../assets/images/loginBack.png')}
            />
            <Image
              style={styles.logoImg1}
              source={require('../../assets/images/Framelogin.png')}
            />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={[styles.mainBox, styles.marginTop]}>
            <Text style={styles.labelTxt}>{'Mobile'}</Text>
            <TextInput style={styles.textBox} placeholder="Mobile" placeholderTextColor={'#C7C7C7'} />
          </View>
          <View style={styles.orView}>
            <View style={[styles.line, {marginLeft: 35}]} />
            <View>
              <Text style={styles.orTxt}>{'OR'}</Text>
            </View>
            <View style={[styles.line, {marginRight: 35}]} />
          </View>
          <View style={styles.mainBox}>
            <Text style={styles.labelTxt}>{'Email'}</Text>
            <TextInput style={styles.textBox} placeholder="Email" placeholderTextColor={'#C7C7C7'} />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('Otp');
            }}>
            <Text style={styles.loginBtnTxt}>{'Log In'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.orView, {marginTop: 30}]}>
          <View style={[styles.line, {marginLeft: 35}]} />
          <View>
            <Text style={[styles.orTxt, {width: 100}]}>{'Sign up Via'}</Text>
          </View>
          <View style={[styles.line, {marginRight: 35}]} />
        </View>
        <AuthBottomSection containerStyle={{marginTop: 50}} />
      </KeyboardAwareScrollView>
    </>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: 'white',
  },
  timerView: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  orView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#737373',
  },
  logoImg: {
    width: 170,
    height: 143,
    marginTop: 90,
  },
  logoImg1: {
    width: 200,
    height: 200,
    marginBottom: 20,
    position: 'absolute',
    zIndex: 999,
  },
  container: {
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
  },
  keyboardViewStyle: {
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  keyboardStyle: {
    marginTop: -35,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleTxt: {
    fontSize: 26,
    alignSelf: 'center',
    marginVertical: Platform.OS === 'ios' ? 30 : 10,
    color: '#0077B6',
    fontWeight: '600',
  },
  mainBox: {
    width: '90%',
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: 30,
  },
  labelTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444444',
    paddingLeft: 5,
  },
  textBox: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 10,
    color: '#444444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 20,
  },
  orTxt: {
    width: 50,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444444',
  },
  loginBtn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#F6861A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginBtnTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
});
