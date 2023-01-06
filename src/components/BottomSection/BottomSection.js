import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Keyboard, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default (props) => {
  console.log('props', props);
  const navigation = props.navigation;
  const [selected, setSelected] = useState(1);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <LinearGradient colors={["#0077B6", "#0096C7", "#0077B6"]} style={[styles.bottomSec, props.containerStyle, { ...(keyboardStatus && { display: 'none' }) }]}>
        {/* <View style={[styles.bottomSec, props.containerStyle]}> */}
        <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Home'), setSelected(1) }}>
          <Image source={require("../../assets/images/home3.png")} style={[styles.tabImg, selected === 1 && { tintColor: '#FFFFFF' }]} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Reminder'), setSelected(2) }}>
          <Image source={require("../../assets/images/Vectorrem.png")} style={[styles.tabImg, selected === 2 && { tintColor: '#FFFFFF' }]} />
          <Text style={styles.tabText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleBtn} onPress={() => navigation.navigate('GetAQotes', {
          isBack: false,
        })}>
          <Image
            style={[styles.middleIcon, { marginTop: -60 }]}
            source={require("../../assets/images/i-ensure.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Claim'), setSelected(3) }}>
          <Image source={require("../../assets/images/Vectorcla.png")} style={[styles.tabImg, selected === 3 && { tintColor: '#ffffff' }]} />
          <Text style={styles.tabText}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Inquiry'), setSelected(4) }}>
          <Image source={require("../../assets/images/Vectorinq.png")} style={[styles.tabImg, selected === 4 && { tintColor: '#ffffff' }]} />
          <Text style={styles.tabText}>Inquiry</Text>
        </TouchableOpacity>
        {/* </View> */}
      </LinearGradient>
    </>
  )
};
const styles = StyleSheet.create({
  bottomSec: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // position: "absolute",
    // bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
  },
  bottomBtn: {
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtnImg: {
    height: 26,
    width: 37,
  },
  middleBtn: {
    height: 76,
    width: 76,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  middleIcon: {
    height: 76,
    width: 76,
    resizeMode: 'contain'
  },
  tabText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    paddingTop: 5,
    fontFamily: 'Poppins-Regular'
  },
  tabImg: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },
});
