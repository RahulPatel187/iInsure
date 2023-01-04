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
  BackHandler,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from '../../components/SafeAreaView';
import AuthBottomSection from '../../components/AuthBottomSection';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/default/Buttons';
import Constant from "../../utils/Constant";
import Logger from "../../utils/Logger";
import Helpers from "../../utils/Helpers";
import Indicator from "../../components/default/Indicator";
import { SIGN_IN, SET_USER_INFO } from "../../redux/types";
import axiosPostClient from "../../api/ApiClient";
import ApiRequest from "../../api/ApiRequest";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../../config/Colors';

function VerifyOTPScreen({ route, navigation }) {
  const CELL_COUNT2 = 6;
  const [isLoading, setLoading] = useState(false);
  const [counter, setCounter] = useState(30);
  const [startTimer, setStartTimer] = useState(true);
  const [otpInputValue, setOtpValue] = useState('');
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  var {
    email,
    phoneNumber,
    isEmailEnter,
    is_verified_phone,
    is_verified_email,
    otp
  } = route.params;

  const ref2 = useBlurOnFulfill({
    value: otpInputValue,
    cellCount: CELL_COUNT2,
  });
  const [props2, getCellOnLayoutHandler2] = useClearByFocusCell({
    value: otpInputValue,
    setValue: setOtpValue,
  });

  useEffect(() => {
    setTimeout(() => ref2.current?.focus(), 150);
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    if (startTimer) {
      const timer = setInterval(() => {
        //Logger.log("counter value" + counter)
        if (counter > 0) {
          setCounter(prevCount => prevCount - 1);
        } else {
          //Logger.log("clearing interval after time finished")
          clearInterval(timer);
          setStartTimer(false);
          //clearing interval after counter is 0.
        }
      }, 1000);
      return () => {
        // Logger.log("clearing interval")
        clearInterval(timer);
      };
    }
  }, [counter, startTimer]);

  useEffect(() => {
    /*
        This is for go back to previous screen(AddPhoneEmail Screen) when user backpress from this screen.
        */
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const callSendOtpApi = async () => {
    //calling sendotp api again on resend click

    if (await Helpers.checkInternet()) {
      if (isEmailEnter) {
        setLoading(true);
        Logger.log(
          "Calling SendOtpWithEmailApi:=>>" +
          Constant.API_BASE_URL +
          Constant.API_SEND_OTP_WITH_EMAIL
        );
        var params = await ApiRequest.getSendOtpWithEmailRequest(email);
        Logger.log("Params is" + JSON.stringify(params));
        axiosPostClient()
          .post(Constant.API_SEND_OTP_WITH_EMAIL, params)
          .then((response) => {
            setLoading(false);
            Logger.log("response" + JSON.stringify(response?.data));
            if (response?.data && response?.data?.status == 200) {
              //  var emailOtp = response?.data?.data?.otp
              setStartTimer(true);
              setMessage(response?.data?.message);
              setShowErrorDialog(true);
              // proceedLoginWithEmail(emailOtp)
            } else {
              setMessage(response?.data?.message);
              setShowErrorDialog(true);
            }
          })
          .catch((error) => {
            setLoading(false);
            setShowErrorDialog(true);
            setMessage(JSON.stringify(error));
            Logger.log("error" + JSON.stringify(error));
          });
      } else {
        setLoading(true);
        Logger.log(
          "Calling SendOtpWithPhoneApi:=>>" +
          Constant.API_BASE_URL +
          Constant.API_SEND_OTP_WITH_Phone
        );
        var params = await ApiRequest.getSendOtpWithPhoneRequest(phoneNumber);
        Logger.log("Params is" + JSON.stringify(params));
        axiosPostClient()
          .post(Constant.API_SEND_OTP_WITH_Phone, params)
          .then((response) => {
            setLoading(false);
            Logger.log("response" + JSON.stringify(response?.data));
            if (response?.data && response?.data?.status == 200) {
              // var emailOtp = response?.data?.data?.otp
              setStartTimer(true);
              setMessage(response?.data?.message);
              setShowErrorDialog(true);
              // proceedLoginWithEmail(emailOtp)
            } else {
              setMessage(response?.data?.message);
              setShowErrorDialog(true);
            }
          })
          .catch((error) => {
            setLoading(false);
            setShowErrorDialog(true);
            setMessage(JSON.stringify(error));
            Logger.log("error" + JSON.stringify(error));
          });
      }
    } else {
      setMessage(Constant.NO_INTERNET);
      setShowErrorDialog(true);
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
      await messaging().registerDeviceForRemoteMessages();
      await messaging()
        .getToken()
        .then((fcmToken) => {
          if (fcmToken) {
            console.log("fcmToken is--", fcmToken);
            setToken(fcmToken);
            AsyncStorage.setItem("fcmToken", fcmToken.toString());
          }
        });
    }
  }

  const callVerifyOtpApi = async () => {
    if (await Helpers.checkInternet()) {
      setLoading(true);
      Logger.log(
        "Calling callVerifyOtpApi:=>>" +
        Constant.API_BASE_URL +
        Constant.API_VERIFY_OTP
      );
      var params = await ApiRequest.getVerifyOtpRequest(
        otpInputValue,
        email,
        phoneNumber,
        is_verified_phone,
        is_verified_email,
        token
      );
      /*
            if email is verified and when you verfiy phone no. at that time pass is_verified_email="1".
            Backend team need this flag.
            */
      Logger.log("Params is" + JSON.stringify(params));
      axiosPostClient()
        .post(Constant.API_VERIFY_OTP, params)
        .then((response) => {
          setLoading(false);
          Logger.log("response" + JSON.stringify(response?.data));
          if (response?.data && response?.data?.status == 200) {
            if (
              parseInt(response?.data?.data?.verified_phone) == 1 &&
              parseInt(response?.data?.data?.verified_email) == 1
            ) {
              /*
                if is_verified_phone and is_verified_email both 1 then redirect to dashboard
                */
              var userData = response?.data?.data;
              proceedLogin(userData);
            } else {
              /*
               if is_verified_phone or is_verified_email any flag is 0 then redirect to AddPhoneEmailScreen
               */
              gotoEnterPhoneEmailScreen();
            }
          } else {
            setMessage(response?.data?.message);
            setShowErrorDialog(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setShowErrorDialog(true);
          setMessage(JSON.stringify(error));
          Logger.log("error" + JSON.stringify(error));
        });
    } else {
      setMessage(Constant.NO_INTERNET);
      setShowErrorDialog(true);
    }
  };

  const proceedLogin = async (userData) => {
    //  setLoading(false)
    await Helpers.saveInPref(Constant.PREF_TOKEN, "123");
    await Helpers.saveInPref(
      Constant.PREF_ACCESS_TOKEN,
      userData?.access_token
    );
    await Helpers.saveInPref(Constant.PREF_USER_NAME, userData?.name);
    await Helpers.saveInPref(Constant.PREF_USER_ID, userData?.id);
    await Helpers.saveInPref(Constant.PREF_USER_INFO, JSON.stringify(userData));
    dispatch({
      type: SET_USER_INFO,
      payload: userData,
    });
    dispatch({
      type: SIGN_IN,
      payload: "123",
    });
    navigation.navigate("Loader");
  };

  const validateScreen = () => {
    var isValid = true;

    if (!otpInputValue || otpInputValue.length < 6) {
      var isValid = false;
      setError("Please enter valid otp");
    }

    if (isValid) {
      setError("");
      //proceedLogin()
      callVerifyOtpApi();
    }
  };


  const onResendClick = () => {
    if (!startTimer) {
      setCounter(30);
      setStartTimer(true);
      callSendOtpApi();
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardViewStyle}
        showsVerticalScrollIndicator={false}
        style={styles.keyboardStyle}>
        <ImageBackground
          source={require('../../assets/images/headerBgImg.png')}
          style={styles.headerBgImg}>
          <TouchableOpacity
            style={styles.backIconBtn}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/images/backIcon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.timerView}>
            <Image
              source={require('../../assets/images/Groupotp.png')}
              style={styles.logoImg}
            />
            <Text style={styles.timerTxt}>
              {moment().minutes(0).seconds(counter).format('mm:ss')}
            </Text>
          </View>
          <Text style={styles.otpTitleTxt}>{'OTP  Verification'}</Text>
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.titleTxt}>
            {'Please type the OTP as shared on your\n email:'}
            <Text style={{ fontWeight: '700' }}>
              {email}{otp}
            </Text>
          </Text>
          <CodeField
            ref={ref2}
            {...props2}
            value={otpInputValue}
            onChangeText={text => {
              console.log('text', text);
              setOtpValue(text);
            }}
            onSubmitEditing={() => {
              validateScreen();
            }}
            cellCount={CELL_COUNT2}
            rootStyle={styles.codeFieldStyle}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.otpCellStyle,
                  isFocused && {
                    borderColor: Colors.loginBtnColor,
                  },
                ]}
                onLayout={getCellOnLayoutHandler2(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {error ? <Text style={styles.errorStyle}>{error}</Text> : null}
          <CustomButton
            text={"Submit"}
            onPress={() => {
              // Keyboard.dismiss();
              validateScreen();
              //proceedLogin()
            }}
          />
          {!startTimer && (
            <>
              <Text style={styles.resendCodeTip}>
                {'Did’t received any code?'}
              </Text>
              <Text
                style={[styles.resendCodeTip, { color: Colors.loginBtnColor }]}
                onPress={() => onResendClick()}>
                {'Resend OTP'}
              </Text>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      {/* <AuthBottomSection /> */}
      <Indicator showLoader={isLoading} />
      <CustomAlertDialog
        visible={showErrorDialog}
        onCloseDialog={() => {
          setShowErrorDialog(false);
        }}
        description={message}
      />
    </>
  );
}
export default VerifyOTPScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  errorStyle: {
    marginHorizontal: 16,
    color: Colors.redColor,
    marginTop: 8,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  logoImg: {
    width: 139,
    height: 136,
  },
  container: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
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
    alignSelf: 'center',
    color: Colors.labelTextColor,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 50,
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
  textBox: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.whiteColor,
    borderRadius: 50,
    marginTop: 10,
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 10,
  },
  orTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.labelTextColor,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  loginBtn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: Colors.loginBtnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: Colors.blackColor,
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
    color: Colors.whiteColor,
  },
  timerView: {
    height: 180,
    width: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
  },
  timerTxt: {
    fontSize: 45,
    fontWeight: '600',
    color: Colors.timerColor,
    marginBottom: 40,
  },
  otpTitleTxt: {
    fontSize: 25,
    fontWeight: '600',
    color: Colors.whiteColor,
    top: 25,
  },
  backIconBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
  },
  backIcon: {
    height: 18,
    width: 18,
  },
  resendCodeTip: {
    textAlign: 'center',
    // marginTop: 10,
    fontSize: 17,
    fontWeight: '400',
    color: Colors.labelTextColor,
  },
  codeFieldStyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  otpCellStyle: {
    width: 50,
    height: 50,
    lineHeight: Platform.OS == 'android' ? 50 : 45,
    fontSize: 24,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.whiteColor,
    color: Colors.blackColor,
    overflow: 'hidden',
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: Platform.OS === 'android' ? 0 : 1,
  },
});
