import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default (props) => {
  console.log('props', props);
  const navigation = props.navigation;
  const [selected, setSelected] = useState(1)
  return (
    <>
      <LinearGradient colors={["#0077B6", "#0096C7", "#0077B6"]} style={[styles.bottomSec, props.containerStyle]}>
        {/* <View style={[styles.bottomSec, props.containerStyle]}> */}
          <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Home'), setSelected(1) }}>
            <Image source={require("../../assets/images/home3.png")} style={[styles.tabImg, selected === 1 && { tintColor: '#FFFFFF' }]} />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Reminder'), setSelected(2) }}>
            <Image source={require("../../assets/images/ic_reminder_icon.png")} style={[styles.tabImg, selected === 2 && { tintColor: '#FFFFFF' }]} />
            <Text style={styles.tabText}>Reminders</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={["#0096C7", "#0077B6", "#0077B6"]}
            style={[
              styles.middleBtn,
              {
                marginTop: -60,
              },
            ]}
          >
            <TouchableOpacity style={styles.middleBtn}>
              <Image
                style={styles.middleIcon}
                source={require("../../assets/images/markQue.png")}
              />
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Claim'), setSelected(3) }}>
            <Image source={require("../../assets/images/Vectorclaims.png")} style={[styles.tabImg, selected === 3 && { tintColor: '#ffffff' }]} />
            <Text style={styles.tabText}>Claims</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => { navigation.navigate('Inquiry'), setSelected(4) }}>
            <Image source={require("../../assets/images/Vectorinquiry.png")} style={[styles.tabImg, selected === 4 && { tintColor: '#ffffff' }]} />
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
    width: '20%',
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtnImg: {
    height: 26,
    width: 37,
  },
  middleBtn: {
    height: 66,
    width: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  middleIcon: {
    height: 46,
    width: 28,
    resizeMode: 'stretch',
    tintColor: "white",
  },
  tabText: { 
    fontSize: 12, 
    fontWeight: '400', 
    color: 'white', 
    paddingTop: 5 
  },
  tabImg: { 
    width: 22, 
    height: 22, 
    tintColor: '#FFFFFF',
    resizeMode: 'contain', 
  },
});
