import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Helpers from "../../utils/Helpers";
import AuthBottomSection from '../../components/AuthBottomSection';
import CustomAlertDialog from '../../components/default/CustomAlertDialog';
import Logger from "../../utils/Logger";
import Constant from "../../utils/Constant";
import axiosPostClient from "../../api/ApiClient";
import ApiRequest from "../../api/ApiRequest";
import Indicator from '../../components/default/Indicator';
import CustomTextInput from '../../components/default/TextInput';
import Colors from '../../config/Colors';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPhonenoDigit = /^[6-9]\d{9}$/;

function LoginScreen({ navigation }) {
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("sohan.patel@techforceglobal.com");
  const [error, setError] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // const dispatch = useDispatch()
  const validateLogin = () => {
    // Validate login field.
    //After successful validate call respective api.

    var isValid = true;

    if (phoneNumber.toString().trim() && email.toString().trim()) {
      isValid = false;
      setError("Enter either phone or email");
    } else if (!phoneNumber.toString().trim() && !email.toString().trim()) {
      isValid = false;
      // setError("Enter phone number or email")
      setError("Enter either phone or email");
    }
    // else if (phoneNumber && !phoneNumber.startsWith("+")) {
    //     isValid = false
    //     setError("Please enter valid phoneNumber with country code.Ex:+91")
    // }
    else if (
      phoneNumber &&
      !regexPhonenoDigit.test(phoneNumber.toString().trim())
    ) {
      isValid = false;
      setError("Please enter valid phone no. with 10 digit.");
    } else if (phoneNumber && phoneNumber.length < 10) {
      isValid = false;
      setError("Please enter valid phone no. with 10 digit.");
    } else if (email && !regexEmail.test(email.trim())) {
      isValid = false;
      setError("Please enter valid email");
    }

    if (isValid) {
      setError("");
      /*
            If email is exist then callSendOtpWIthEmail api
            Else call callPhoneVerify api
            */
      if (email) {
        callSendOtpApi(true);
      } else {
        // callVerifyPhoneNoApi()
        //signInWithPhoneNumber()
        callSendOtpApi(false);
      }
    } else {
      setShowErrorDialog(true);
    }
  };

  const callSendOtpApi = async (isEmailEnter) => {
    if (await Helpers.checkInternet()) {
      if (isEmailEnter) {
        Logger.log(
          "Calling SendOtpWithEmailApi:=>>" +
          Constant.API_BASE_URL +
          Constant.API_SEND_OTP_WITH_EMAIL
        );
        setLoading(true);
        var params = await ApiRequest.getSendOtpWithEmailRequest(email);
        Logger.log("Params is" + JSON.stringify(params));
        await axiosPostClient()
          .post(Constant.API_SEND_OTP_WITH_EMAIL, params)
          .then((response) => {
            setLoading(false);
            Logger.log("response" + JSON.stringify(response?.data));
            if (response?.data && response?.data?.status == 200) {
              var otp = response?.data?.data?.otp;
              proceedLogin(isEmailEnter, otp);
            } else {
              setError(response?.data?.message);
              setShowErrorDialog(true);
            }
          })
          .catch((error) => {
            setLoading(false);
            setError(JSON.stringify(error));
            setShowErrorDialog(true);
            Logger.log("error" + JSON.stringify(error));
          });
      } else {
        Logger.log(
          "Calling SendOtpWithPhoneApi:=>>" +
          Constant.API_BASE_URL +
          Constant.API_SEND_OTP_WITH_Phone
        );
        setLoading(true);
        var params = await ApiRequest.getSendOtpWithPhoneRequest(phoneNumber);
        Logger.log("Params is" + JSON.stringify(params));
        axiosPostClient()
          .post(Constant.API_SEND_OTP_WITH_Phone, params)
          .then((response) => {
            setLoading(false);
            Logger.log("response" + JSON.stringify(response?.data));
            if (response?.data && response?.data?.status == 200) {
              var otp = response?.data?.data?.otp;
              proceedLogin(isEmailEnter);
            } else {
              setError(response?.data?.message);
              setShowErrorDialog(true);
            }
          })
          .catch((error) => {
            setLoading(false);
            setError(JSON.stringify(error));
            setShowErrorDialog(true);
            Logger.log("error" + JSON.stringify(error));
          });
      }
    } else {
      setError(Constant.NO_INTERNET);
      setShowErrorDialog(true);
    }
  };

  const proceedLogin = async (isEmailEnter,otp) => {
    Logger.log("isEmailEnter===>" + isEmailEnter);
    navigation.navigate("Otp", {
      email: email,
      phoneNumber: phoneNumber,
      isEmailEnter: isEmailEnter,
      is_verified_phone: "0",
      is_verified_email: "0",
      otp: otp
    });
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
            <CustomTextInput
              showIcon={false}
              ref={phoneNumberRef}
              placeholder="Mobile"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              // keyboardType="phone-pad"
              textStyle={styles.textBox}
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={10}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                validateLogin();
              }}
              showPasswordIcon={false}
            // errors={errors.phoneNumber}
            />
          </View>
          <View style={styles.orView}>
            <View style={[styles.line, { marginLeft: 35 }]} />
            <View>
              <Text style={styles.orTxt}>{'OR'}</Text>
            </View>
            <View style={[styles.line, { marginRight: 35 }]} />
          </View>
          <View style={styles.mainBox}>
            <Text style={styles.labelTxt}>{'Email'}</Text>
            <CustomTextInput
              showIcon={false}
              ref={emailRef}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              textStyle={styles.textBox}
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                validateLogin();
                // handleSubmit()
              }}
              showPasswordIcon={false}
            // errors={errors.email}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              Keyboard.dismiss();
              validateLogin();
            }}>
            <Text style={styles.loginBtnTxt}>{'Log In'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.orView, { marginTop: 30 }]}>
          <View style={[styles.line, { marginLeft: 35 }]} />
          <View>
            <Text style={[styles.orTxt, { width: 100 }]}>{'Help Center'}</Text>
          </View>
          <View style={[styles.line, { marginRight: 35 }]} />
        </View>
        <AuthBottomSection containerStyle={{ marginTop: 50 }} navigation={navigation} />
      </KeyboardAwareScrollView>
      <Indicator showLoader={isLoading} />
      <CustomAlertDialog
        visible={showErrorDialog}
        onCloseDialog={() => {
          setShowErrorDialog(false);
        }}
        description={error}
      />
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
    backgroundColor: Colors.whiteColor,
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
    backgroundColor: Colors.lineColor,
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
    backgroundColor: Colors.containerColor,
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
    backgroundColor: Colors.containerColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleTxt: {
    fontSize: 26,
    alignSelf: 'center',
    marginVertical: Platform.OS === 'ios' ? 30 : 10,
    color: Colors.titleTextColor,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold'
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
    color: Colors.labelTextColor,
    paddingLeft: 5,
    fontFamily: 'Poppins-Bold'
  },
  textBox: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.whiteColor,
    borderRadius: 50,
    marginTop: 10,
    color: Colors.labelTextColor,
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular'
  },
  orTxt: {
    width: 50,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.labelTextColor,
    fontFamily: 'Poppins-Bold'
  },
  loginBtn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: Colors.loginBtnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 25,
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
    fontFamily: 'Poppins-Bold'
  },
});
