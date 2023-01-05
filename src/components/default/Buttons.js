import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../config/Colors";
import Helpers from "../../utils/Helpers";

const Buttons = (props) => {
  const { text, onPress, btnContainerStyle, isLarge } = props;

  return (
    <View
      style={[styles.btnContainerStyle, { margin: isLarge ? 10 : 16 }]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btnContainerStyle,
          props.btnContainerStyle ? btnContainerStyle : null,
          { width: "100%" },
        ]}
      >
        <Text style={styles.btnTxt}>{text}</Text>
      </TouchableOpacity>
    </View>

    // <Button
    //   title={text}
    //   containerStyle={{
    //     margin: isLarge ? 10 : 16,
    //   }}
    //   buttonStyle={[
    //     styles.btnContainerStyle,
    //     props.btnContainerStyle ? btnContainerStyle : null,
    //   ]}
    //   onPress={onPress}
    //   titleStyle={{
    //     fontFamily: "Roboto-Regular",
    //   }}
    // />
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    height: Helpers.getDynamicSize(50),
    borderRadius: 50,
    backgroundColor: '#F6861A',
    alignItems: "center",
    justifyContent: "center"
  },
  btnTxt: {
    color: Colors.whiteColor,
    fontSize: 18,
    fontFamily: 'Poppins-Regular'
    // textTransform: "uppercase",
  },
});

export default Buttons;
