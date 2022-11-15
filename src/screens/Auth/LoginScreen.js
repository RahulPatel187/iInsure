import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import SafeAreaView from "../../components/SafeAreaView";
import AuthBottomSection from "../../components/AuthBottomSection";

function LoginScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <SafeAreaView>
      <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardViewStyle}
          showsVerticalScrollIndicator={false}
          style={styles.keyboardStyle}
        >
        <ImageBackground
          source={require("../../assets/images/headerBgImg.png")}
          style={styles.headerBgImg}
        >
          <Image
            style={styles.logoImg}
            source={require("../../assets/images/appLogo.png")}
          />
        </ImageBackground>
          <View style={styles.container}>
            <Text style={styles.titleTxt}>{"Welcome to techforce"}</Text>
            <View style={[styles.mainBox, styles.marginTop]}>
              <Text style={styles.labelTxt}>{"Mobile"}</Text>
              <TextInput style={styles.textBox} placeholder="Mobile" />
            </View>
            <Text style={styles.orTxt}>{"OR"}</Text>
            <View style={styles.mainBox}>
              <Text style={styles.labelTxt}>{"Email"}</Text>
              <TextInput style={styles.textBox} placeholder="Email" />
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                navigation.navigate("Otp");
              }}
            >
              <Text style={styles.loginBtnTxt}>{"Log in"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {/* <AuthBottomSection /> */}
    </>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "white",
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
    fontSize: 26,
    alignSelf: "center",
    marginVertical: Platform.OS === "ios" ? 30 : 10,
    color: "#0077B6",
    fontWeight: "600",
  },
  mainBox: {
    width: "90%",
    alignSelf: "center",
  },
  marginTop: {
    marginTop: 20,
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
    paddingLeft: 20,
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
    marginVertical: 25,
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
});
