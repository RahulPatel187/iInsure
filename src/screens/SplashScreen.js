import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function SplashScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
