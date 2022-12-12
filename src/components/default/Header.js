import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";

import Colors from "../../config/Colors";
import Helpers from "../../utils/Helpers";

const windowWidth = Dimensions.get("window").width;

function Header(props) {
  const renderLeftIcon = () => {
    if (props.isBack) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (props.isGotoHome) {
              props.navigation.navigate("Home");
            } else {
              props.navigation.goBack();
            }
          }}
          style={{ zIndex: 99 }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image
            source={require("../../assets/images/backIcon.png")}
            style={{
              tintColor: Colors.whiteColor,
              height: Helpers.getDynamicSize(21),
              width: Helpers.getDynamicSize(21),
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      );
    } else if (props.isMenu) {
      return (
        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{ zIndex: 99 }}
        >
          <Image
            source={require("../../assets/images/leftArrowmenu.png")}
            style={{
              height: Helpers.getDynamicSize(18),
              width: Helpers.getDynamicSize(18),
              resizeMode: "contain",
              tintColor: Colors.whiteColor,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  const renderTitle = () => {
    return (
      <View
        style={{
          //maxWidth: windowWidth - Helpers.getDynamicSize(120),
          // flex: 1,
          // position: "absolute",
          display: 'flex',
          // justifyContent: "center",
          // alignItems: "center",
          // maxWidth: 50,
          // height: 100,
          // flexWrap: 'wrap',
        }}
      >
        <Text style={[styles.centerText, { fontWeight: '300' }]}>  {props.title}  <Text style={[styles.centerText, { fontWeight: '600' }]}>{props.title1}</Text></Text>
      </View >
    );
  };

  const renderRightIcon = () => {
    if (props.rightIcon) {
      return (
        <TouchableOpacity
          onPress={props.rightClicked}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{
            position: "absolute",
            right: Helpers.getDynamicSize(16),
            zIndex: 8,
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={props.rightIconImage}
            style={{
              height: Helpers.getDynamicSize(18),
              width: Helpers.getDynamicSize(23),
              resizeMode: "contain",
              tintColor: Colors.whiteColor,
            }}
          />
          {props.notificationCnt && (
            <>
              <View style={styles.notificationCntView}>
                <Text style={styles.notificationCntTxt}>
                  {props.notificationCnt || 1}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  return (
    <View style={styles.headerView}>
      <View style={styles.icon}>
        {renderLeftIcon()}
        {renderRightIcon()}
      </View>

      {renderTitle()}
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: Helpers.getDynamicSize(30),
    marginTop: 5
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // paddingEnd: 5,
    // paddingStart: 5
  },
  icon: {
    height: Helpers.getDynamicSize(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 16,
    paddingStart: 16
  },
  centerText: {
    fontSize: Helpers.getDynamicSize(25),
    color: Colors.whiteColor,
    // fontFamily: "Roboto-Bold",
    // fontFamily: 'Roboto-Light',
    //fontFamily: 'Roboto-Bold'
  },
  notificationCntView: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -8,
    right: -5,
  },
  notificationCntTxt: {
    color: "white",
    fontSize: 10,
    fontFamily: "Roboto-Bold",
  },
});

export default Header;
