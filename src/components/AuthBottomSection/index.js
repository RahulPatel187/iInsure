import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default (props) => (
  <>
    <View style={styles.bottomSec}>
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
            source={require("../../assets/images/email.png")}
          />
        </TouchableOpacity>
      </LinearGradient>
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
            source={require("../../assets/images/call2.png")}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </>
);
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
    paddingHorizontal: 40,
  },
  bottomBtn: {
    height: 40,
    width: 40,
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
    resizeMode: 'contain',
    tintColor: "white",
  },
});
