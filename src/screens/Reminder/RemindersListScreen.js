import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../../components/default/Header";
import SafeAreaView from "../../components/SafeAreaView";
import Colors from "../../config/Colors";
import Helpers from "../../utils/Helpers";
import Constant from "../../utils/Constant";
import axiosPostClient from "../../api/ApiClient";
import ApiRequest from "../../api/ApiRequest";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";
import Logger from "../../utils/Logger";
import Indicator from "../../components/default/Indicator";
import GlobalStyle from "../../config/GlobalStyles";
import moment from "moment";
import { SIGN_IN } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";

function RemindersListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [reminderList, setReminderList] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isSessionExpired, setSessionExpired] = useState(false);
  const notificationCount = useSelector((state) => state.login.notificationCount);

  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callGetReminderListApi();
    });
    return unsubscribe;
  }, [navigation]);

  const callGetReminderListApi = async () => {
    if (await Helpers.checkInternet()) {
      setLoading(true);
      Logger.log(
        "Calling Get reminder list api:=>>" +
        Constant.API_BASE_URL +
        Constant.API_GET_REMINDER
      );
      const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
      const access_token = await Helpers.getFromPref(
        Constant.PREF_ACCESS_TOKEN,
        ""
      );

      var params = await ApiRequest.getInquiryListRequest(userId, access_token);
      Logger.log("Params is" + JSON.stringify(params));
      axiosPostClient()
        .post(Constant.API_GET_REMINDER, params)
        .then((response) => {
          setLoading(false);
          setIsRefreshing(false);
          Logger.log("response" + JSON.stringify(response?.data));
          if (response?.data && response?.data?.status == 200) {
            setReminderList(response?.data?.data);
          } else if (response?.data && response?.data?.status == 401) {
            //Logout user if received 401 status code.
            setMessage(response?.data?.message);
            setSessionExpired(true);
          } else {
            // setMessage(response?.data?.message);
            // setShowErrorDialog(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setIsRefreshing(false);
          setShowErrorDialog(true);
          setMessage(JSON.stringify(error));
          Logger.log("error" + JSON.stringify(error));
        });
    } else {
      setMessage(Constant.NO_INTERNET);
      setShowErrorDialog(true);
    }
  };

  const proceedLogout = async () => {
    /*await Helpers.saveInPref(Constant.PREF_TOKEN, "")
         await Helpers.removeFromPref(Constant.PREF_USER_INFO)
         await Helpers.removeFromPref(Constant.PREF_ACCESS_TOKEN)
         await Helpers.removeFromPref(Constant.PREF_USER_NAME)
          dispatch({
             type: SIGN_IN,
             payload: ''
         })*/
    await Helpers.performLogout();
    dispatch({
      type: SIGN_IN,
      payload: "",
    });
  };

  const renderEmptyContainer = () => {
    if (!isLoading) {
      return (
        <View
          style={styles.emptyFlex}
        >
          <Text style={GlobalStyle.noDataFoundStyle}>
            {Constant.NO_DATA_FOUND}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const onPullToRefresh = () => {
    setIsRefreshing(true);
    callGetReminderListApi();
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
        <Text style={styles.titleTxt}>{"My Reminders"}</Text>
        <View style={styles.mainSection}>
          <FlatList
            data={reminderList}
            style={styles.listStyle}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View
                    style={[
                      styles.cardView,
                      index === 4 && { marginBottom: 40 },
                    ]}
                  >
                    <View style={[styles.cardSubSec, { marginTop: 0 }]}>
                      <Text style={styles.cardLabel}>{"Due Date:"}</Text>
                      <Text style={styles.cardValue}>{item?.due_date ? moment(item?.due_date).format("DD-MMM-YY") : "-"}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Caption:"}</Text>
                      <Text style={styles.cardValue}>{item?.caption_name}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Policy Number:"}</Text>
                      <Text style={styles.cardValue}>{item?.policy_number}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>
                        {"Premium Amount:"}
                      </Text>
                      <Text style={styles.cardValue}>{item?.amount}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Remind In:"}</Text>
                      <Text style={[styles.cardValue, { color: "#0DA600" }]}>
                        {item?.duration}
                      </Text>
                    </View>
                  </View>
                </>
              );
            }}
            ListEmptyComponent={renderEmptyContainer}
            onRefresh={onPullToRefresh}
            refreshing={isRefreshing}
          />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Reminder')} >
            <LinearGradient colors={['#F6861A', '#FF9E40']} style={styles.btnlinear}>
              <Image source={require("../../assets/images/plus.png")} style={styles.btnImg} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <CustomAlertDialog
        visible={showErrorDialog || isSessionExpired}
        onCloseDialog={() => {
          if (isSessionExpired) {
            setSessionExpired(false);
            proceedLogout();
          } else {
            setShowErrorDialog(false);
          }
        }}
        description={message}
      />
      <Indicator showLoader={isLoading} />
    </>
  );
}
export default RemindersListScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    // alignItems: "center",
    flex: 1,
    // paddingVertical: 20,
  },
  mainSection: {
    height: "88%",
    width: "100%",
    backgroundColor: Colors.containerColor,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerSec: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  backBtn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    height: 23,
    width: 18,
  },
  notificationImg: {
    height: 28,
    width: 21,
  },
  titleTxt: {
    textAlign: "center",
    fontSize: 25,
    color: Colors.whiteColor,
    fontWeight: "600",
    marginTop: -10,
  },
  cardView: {
    width: "90%",
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 15,
    marginTop: 10,
  },
  cardSubSec: {
    flexDirection: "row",
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.labelTextColor,
    fontWeight: "600",
    marginLeft: 24,
    width: "35%",
  },
  cardValue: {
    fontSize: 13,
    color: Colors.labelTextColor,
    fontWeight: "400",
    marginLeft: 24,
    width: "50%",
  },
  listStyle: {
    marginTop: 5,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    width: 44,
    height: 44,
    position: 'absolute',
    bottom: 20
  },
  btnlinear: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 44,
    height: 44
  },
  btnImg: {
    width: 21,
    height: 41,
    resizeMode: 'contain'
  },
  emptyFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
