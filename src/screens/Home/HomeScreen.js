import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, Linking, Dimensions, TouchableOpacity, View } from "react-native";
import BottomSection from "../../components/BottomSection/BottomSection";
import SafeAreaView from "../../components/SafeAreaView";
import Header from "../../components/default/Header";
import Carousel from "react-native-snap-carousel";
import Helpers from "../../utils/Helpers";
import Constant from "../../utils/Constant";
import axiosPostClient from "../../api/ApiClient";
import ApiRequest from "../../api/ApiRequest";
import { useDispatch } from "react-redux";
import { SET_NOTIFICATION_COUNT } from "../../redux/types";
import Colors from "../../config/Colors";

const { width: screenWidth } = Dimensions.get('window');

const contactUsUrl = "https://www.uptrust.co.in/contact.php";

const imageData = [
  {
    image: require("../../assets/images/image11.png"),
  },
  {
    image: require("../../assets/images/image13.png"),
  },
  {
    image: require("../../assets/images/image10.png"),
  },
  {
    image: require("../../assets/images/image9.png"),
  },
  {
    image: require("../../assets/images/image12.png"),
  }
]

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const dispatch = useDispatch();

  const getUsetNameFromPref = async () => {
    const name = await Helpers.getFromPref(Constant.PREF_USER_NAME, "");
    setUserName(name);
  };

  useEffect(() => {
    getUsetNameFromPref();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callGetNotificationListApi();
    });
    return unsubscribe;
  }, [navigation]);

  const openContactUsPage = () => {
    //Opening default browser and loading uptrust url
    Linking.canOpenURL(contactUsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(contactUsUrl);
      } else {
        Logger.log("Don't know how to open URI: " + contactUsUrl);
      }
    });
  };

  const callGetNotificationListApi = async () => {
    if (await Helpers.checkInternet()) {
      const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
      const access_token = await Helpers.getFromPref(
        Constant.PREF_ACCESS_TOKEN,
        ""
      );
      var params = await ApiRequest.getInquiryListRequest(userId, access_token);
      axiosPostClient()
        .post(Constant.API_GET_NOTIFICATIONS, params)
        .then((response) => {
          if (response?.data && response?.data?.status == 200) {
            setNotificationCount(response?.data?.data.length);
            dispatch({
              type: SET_NOTIFICATION_COUNT,
              payload: response?.data?.data.length,
            });
          } else if (response?.data && response?.data?.status == 401) {
          } else {
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 10 }}>
        <Image source={item.image} style={styles.bannerImg} />
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
        <View style={styles.headerName}>
          <Text style={styles.headerText}>{"Hello,"}</Text>
          <Text style={styles.headerText2}>{userName ? userName : "User long name"}</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <ScrollView>
          <Carousel layout={'default'}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth}
            data={imageData}
            renderItem={renderItem} />

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('HealthCard')}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/HealthCard.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Health Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('Inquiry')}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Group.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Inquiry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('Reminder')}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Group28.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column} onPress={() => openContactUsPage()}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Frame(1).png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>About Us</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    // alignItems: "center",
    // display: 'flex'
    flex: 1,
  },
  container: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '84%',
    position: 'absolute',
    bottom: 0
  },
  headerSec: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '300',
    color: Colors.whiteColor
  },
  headerText2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: Colors.whiteColor
  },
  bannerImg: {
    height: 270,
    resizeMode: 'stretch'
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center', 
    flexWrap: 'wrap',
    // marginLeft: 25,
    // marginBottom: 30,
    // marginTop: -20
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  columnImg: {
    width: 75,
    height: 60,
    resizeMode: 'contain'
  },
  columntext: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.blackColor,
    paddingTop: 4
  },
  columnImgView: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.columnImgBorderColor,
    width: 132,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 3,
  },
  headerName: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  }
});