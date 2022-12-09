import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Colors from "../../config/Colors";
import Helpers from "../../utils/Helpers";

const ProfileData = (props) => {
  const { titleText, text } = props;

  return (
    <>
      <Text style={styles.titleText}>{titleText}</Text>
      <View style={styles.dataView}>
        <Text style={styles.subTitleText}>{text}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: 24,
    color: Colors.newTextColor,
    fontSize: Helpers.getDynamicSize(14),
    fontFamily: "Roboto-Bold",
  },
  subTitleText: {
    paddingLeft: 5,
    color: Colors.blackColor,
    fontSize: Helpers.getDynamicSize(15),
  },
  dataView: {
    marginTop: 8,
    backgroundColor: Colors.whiteColor,
    borderRadius: RFValue(5),
    justifyContent: "center",
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.newPlaceholder,
  },
});

export default ProfileData;
