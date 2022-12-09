import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function SplashScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Splash.png")}
        style={styles.headerBgImg}
      />
    </View>
  );
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: -20,
  },
  headerBgImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    resizeMode: 'stretch'
  },
});
