import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSection from "../../components/BottomSection/BottomSection";
import SafeAreaView from "../../components/SafeAreaView";
import Header from "../../components/Header";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header />
        <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontWeight: '300', color: '#FFFFFF' }}>{"Hello,"}</Text>
        <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontWeight: '600', color: '#FFFFFF' }}>{"User long name"}</Text>
      </ImageBackground>

      <View style={styles.container}>
        <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 15 }}>
              <Image source={require("../../assets/images/Group17.png")} style={{ width: 132, height: 90, resizeMode: 'stretch' }} />
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Health Card</Text>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 15 }}>
              <Image source={require("../../assets/images/Group18.png")} style={{ width: 132, height: 90, resizeMode: 'stretch' }} />
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Inquiry</Text>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 15 }}>
              <Image source={require("../../assets/images/Group16.png")} style={{ width: 132, height: 90, resizeMode: 'stretch' }} />
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Reminder</Text>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 15 }}>
              <Image source={require("../../assets/images/Group15.png")} style={{ width: 132, height: 90, resizeMode: 'stretch' }} />
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>About Us</Text>
            </View>
          </View>
          <View style={{ display: 'flex', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../../assets/images/image11.png")} style={{ width: 360, height: 220, resizeMode: 'stretch' }} />
          </View>
          <View style={{ display: 'flex', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../../assets/images/image13.png")} style={{ width: 360, height: 220, resizeMode: 'stretch' }} />
          </View>
          <View style={{ display: 'flex', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../../assets/images/image10.png")} style={{ width: 360, height: 220, resizeMode: 'stretch' }} />
          </View>
          <View style={{ display: 'flex', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../../assets/images/image9.png")} style={{ width: 360, height: 220, resizeMode: 'stretch' }} />
          </View>
          <View style={{ display: 'flex', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../../assets/images/image12.png")} style={{ width: 360, height: 220, resizeMode: 'stretch' }} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 20,
  },
  logoImg: {
    width: 139,
    height: 136,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '76%',
    position: 'absolute',
    bottom: 0
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
    height: 150,
    width: 150,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  timerTxt: {
    fontSize: 45,
    fontWeight: "600",
    color: "#444444",
  },
  otpTitleTxt: {
    fontSize: 25,
    width: '80%',
    fontWeight: "600",
    color: "#FFFFFF",
    top: 25,
  },
  backIconBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    height: 18,
    width: 23,
  },
  noteIconBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
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
  headerSec: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});