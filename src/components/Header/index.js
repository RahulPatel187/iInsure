import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default (props) => (
  <View style={styles.headerSec}>
    <TouchableOpacity
      style={styles.backIconBtn}
      onPress={() => {
        props.navigation.toggleDrawer();
      }}
    >
      <Image
        source={require("../../assets/images/leftArrowmenu.png")}
        style={styles.backIcon}
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.noteIconBtn}
    >
      <Image
        source={require("../../assets/images/Notification.png")}
        style={styles.noteIcon}
      />
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
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
  headerSec: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
