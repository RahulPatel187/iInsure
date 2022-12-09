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
import BottomSection from "../../components/BottomSection/BottomSection";
import Header from "../../components/Header";

function Profile({ navigation }) {
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header navigation={navigation} />
        {/* <View style={styles.timerView}> */}
        <Image source={require("../../assets/images/userScreen.png")} style={{ width: 100, height: 110, resizeMode: 'stretch' }} />
        {/* </View> */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontWeight: '300', color: '#FFFFFF' }}>{"My "}</Text>
          <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontWeight: '600', color: '#FFFFFF' }}>{"Profile"}</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground source={require("../../assets/images/userBack.png")} style={{ width: 63, height: 63, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require("../../assets/images/userr.png")} style={{ width: 22, height: 22 }} />
          </ImageBackground>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: '300', color: '#000000' }}>{"Hello, "}</Text>
          <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: '600', color: '#000000' }}>{"User"}</Text>
        </View>
        <Text style={styles.titleTxt}>
          {
            "Registered details"
          }
        </Text>
        <Text style={{ padding: 16, borderRadius: 5, color: 'black', backgroundColor: '#ffffff', marginTop: 10, fontSize: 15, fontWeight: '500' }}>UserName</Text>
        <Text style={{ padding: 16, borderRadius: 5, color: 'black', backgroundColor: '#ffffff', marginTop: 10, fontSize: 15, fontWeight: '500' }}>9876543210</Text>
        <Text style={{ padding: 16, borderRadius: 5, color: 'black', backgroundColor: '#ffffff', marginTop: 10, fontSize: 15, fontWeight: '500' }}>user@techforceglobal.com</Text>
      </View>
    </>
  );
}
export default Profile;

const styles = StyleSheet.create({
  headerBgImg: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 20,
  },
  logoImg: {
    width: 139,
    height: 136,
  },
  container: {
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    bottom: 0,
    padding: 20,
    width: '100%',
    height: '63%'
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
    // alignSelf: "center",
    color: "#444444",
    fontWeight: "500",
    // textAlign: "center",
    marginTop: 10,
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
    height: 150,
    width: 150,
    borderRadius: 90,
    // display: 'flex',
    // alignItems: "center",
    // justifyContent: "center",
  },
  timerTxt: {
    fontSize: 45,
    fontWeight: "600",
    color: "#444444",
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
    left: 5,
    top: 0
  },
  backIcon: {
    height: 26,
    width: 25,
  },
  noteIconBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 5,
  },
  noteIcon: {
    height: 26,
    width: 25,
  },
  resendCodeTip: {
    textAlign: "center",
    marginTop: 10,
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
