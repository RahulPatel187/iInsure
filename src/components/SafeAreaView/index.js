import React from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default (props) => (
  <>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#0096C7" }} />
    <SafeAreaView style={styles.safeAreaStyle} {...props}>
    <LinearGradient colors={["#0077B6", "#0096C7", "#0077B6"]}  style={{flex: 1}}>
      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={"transparent"} />
      </LinearGradient >
      {props.children}
    </SafeAreaView>
  </>
);
const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
