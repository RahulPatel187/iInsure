import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeAreaView from "../../components/SafeAreaView";
import AuthBottomSection from "../../components/AuthBottomSection";

function VerifyOTPScreen({ navigation }) {
  const CELL_COUNT2 = 6;
  const [isLoading, setLoading] = useState(false);
  const [counter, setCounter] = useState(30);
  const [startTimer, setStartTimer] = useState(true);
  const [otpInputValue, setOtpValue] = useState("");
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
    if (startTimer) {
      const timer = setInterval(() => {
        //Logger.log("counter value" + counter)
        if (counter > 0) {
          setCounter((prevCount) => prevCount - 1);
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
    setTimeout(() => ref2.current?.focus(), 150);
  }, []);

  const onResendClick = () => {
    if (!startTimer) {
      setCounter(30);
      setStartTimer(true);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardViewStyle}
        showsVerticalScrollIndicator={false}
        style={styles.keyboardStyle}
      >
        <ImageBackground
          source={require("../../assets/images/headerBgImg.png")}
          style={styles.headerBgImg}
        >
          <TouchableOpacity
            style={styles.backIconBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/images/backIcon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.timerView}>
            <Image
              source={require("../../assets/images/Groupotp.png")}
              style={styles.logoImg}
            />
            <Text style={styles.timerTxt}>
              {moment().minutes(0).seconds(counter).format("mm:ss")}
            </Text>
          </View>
          <Text style={styles.otpTitleTxt}>{"OTP  Verification"}</Text>
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.titleTxt}>
            {
              "Please type the OTP as shared on your\n email:"}<Text style={{fontWeight: '700'}}>{" username@techforceglobal.com"
              }
            </Text>
          </Text>
          <CodeField
            ref={ref2}
            {...props2}
            value={otpInputValue}
            onChangeText={(text) => {
              console.log("text", text);
              setOtpValue(text);
            }}
            onSubmitEditing={() => {
              console.log("on");
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
                    borderColor: "#F6861A",
                  },
                ]}
                onLayout={getCellOnLayoutHandler2(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate("Loader");
            }}
          >
            <Text style={styles.loginBtnTxt}>{"Submit"}</Text>
          </TouchableOpacity>
          {!startTimer && (
            <>
              <Text style={styles.resendCodeTip}>
                {"Did’t received any code?"}
              </Text>
              <Text
                style={[styles.resendCodeTip, { color: "#F6861A" }]}
                onPress={() => onResendClick()}
              >
                {"Resend OTP"}
              </Text>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      {/* <AuthBottomSection /> */}
    </>
  );
}
export default VerifyOTPScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  logoImg: {
    width: 139,
    height: 136,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30
  },
  keyboardViewStyle: {
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  keyboardStyle: {
    marginTop: -25,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleTxt: {
    fontSize: 17,
    alignSelf: "center",
    color: "#444444",
    fontWeight: "400",
    textAlign: "center",
    marginTop: 50,
  },
  mainBox: {
    width: "90%",
    alignSelf: "center",
  },
  marginTop: {
    marginTop: 10,
  },
  labelTxt: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444444",
    paddingLeft: 5,
  },
  textBox: {
    width: "100%",
    height: 56,
    backgroundColor: "white",
    borderRadius: 50,
    marginTop: 10,
    shadowColor: "#000",
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
    fontWeight: "600",
    color: "#444444",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
  loginBtn: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#F6861A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
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
    fontWeight: "600",
    color: "#FFF",
  },
  timerView: {
    height: 180,
    width: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  timerTxt: {
    fontSize: 45,
    fontWeight: "600",
    color: "#005C8C",
    marginBottom: 40
  },
  otpTitleTxt: {
    fontSize: 25,
    fontWeight: "600",
    color: "#FFFFFF",
    top: 25,
  },
  backIconBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 0,
  },
  backIcon: {
    height: 18,
    width: 18,
  },
  resendCodeTip: {
    textAlign: "center",
    // marginTop: 10,
    fontSize: 17,
    fontWeight: "400",
    color: "#444444",
  },
  codeFieldStyle: {
    width: "90%",
    alignSelf: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  otpCellStyle: {
    width: 50,
    height: 50,
    lineHeight: Platform.OS == "android" ? 50 : 45,
    fontSize: 24,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: "#FFF",
    color: "#000",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: Platform.OS === "android" ? 0 : 1,
  },
});
