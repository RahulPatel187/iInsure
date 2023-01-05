import React, { useState, useEffect } from "react";
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

function ClaimListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [healthCardList, setHealthCardList] = useState("");

  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isSessionExpired, setSessionExpired] = useState(false);

  const notificationCount = useSelector((state) => state.login.notificationCount);

  const dispatch = useDispatch();

  useEffect(() => {
    callGetHealthCardDetail();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callGetHealthCardDetail();
    });

    return unsubscribe;
  }, [navigation]);

  const callGetHealthCardDetail = async () => {
    if (await Helpers.checkInternet()) {
      setLoading(true);
      Logger.log(
        "Calling GetAll Claimed list api:=>>" +
        Constant.API_BASE_URL +
        Constant.API_GET_CLAIMLIST
      );
      const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
      const access_token = await Helpers.getFromPref(
        Constant.PREF_ACCESS_TOKEN,
        ""
      );

      var params = await ApiRequest.getClaimHistoryRequest(
        userId,
        access_token
      );
      Logger.log("Params is" + JSON.stringify(params));
      axiosPostClient()
        .post(Constant.API_GET_CLAIMLIST, params)
        .then((response) => {
          setLoading(false);
          setIsRefreshing(false);
          Logger.log("response" + JSON.stringify(response?.data));
          if (response?.data && response?.data?.status == 200) {
            setHealthCardList(response?.data?.data);
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

  //Logout user if status code 401
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

  //return color code based on staus
  const getColorCode = (claim_status) => {
    /*Status       id

         Pending       1
         Underprocess  2
         Approved      3
         Paid          4
         Decline       5*/
    if (parseInt(claim_status) == 1) {
      return Colors.status_pending;
    } else if (parseInt(claim_status) == 2) {
      return Colors.staus_under_process;
    } else if (parseInt(claim_status) == 3 || parseInt(claim_status) == 4) {
      return Colors.status_accepted;
    } else if (parseInt(claim_status) == 5) {
      return Colors.redColor;
    }
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
    callGetHealthCardDetail();
  };


  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
        <Text style={styles.titleTxt}>{"My Claims"}</Text>
        <View style={styles.mainSection}>
          <FlatList
            data={healthCardList}
            style={styles.listStyle}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={renderEmptyContainer}
            onRefresh={onPullToRefresh}
            refreshing={isRefreshing}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity
                    style={[
                      styles.cardView,
                      index === 2 && { marginBottom: 40 },
                    ]}
                    onPress={() => {
                      navigation.navigate("RemindersList");
                    }}
                  >
                    <View style={[styles.cardSubSec, { marginTop: 0 }]}>
                      <Text style={styles.cardLabel}>{"Applied Date:"}</Text>
                      <Text style={styles.cardValue}>{item?.created_at
                        ? moment(item?.created_at).format("DD-MMM-YY")
                        : "-"}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Name:"}</Text>
                      <Text style={styles.cardValue}>
                        {item?.name}
                      </Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Policy Number:"}</Text>
                      <Text style={styles.cardValue}>
                        {item?.policy_no}
                      </Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"UHID Number:"}</Text>
                      <Text style={styles.cardValue}>{item?.card_no}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Status:"}</Text>
                      <Text style={[styles.cardValue, {
                        color: getColorCode(item?.claim_status),
                      }]}>
                        {item?.claim_status_text}
                      </Text>
                    </View>
                    {item.claim_status == "3" || item.claim_status == "4" ? (
                      <>
                        <View style={styles.cardSubSec}>
                          <Text style={styles.cardLabel}>{"Total amount:"}</Text>
                          <Text style={styles.cardValue}>{item?.total_amount ? item?.total_amount : "-"}</Text>
                        </View>
                        <View style={styles.cardSubSec}>
                          <Text style={styles.cardLabel}>{"Approved amount:"}</Text>
                          <Text style={styles.cardValue}>{item?.approved_amount ? item?.approved_amount : "-"}</Text>
                        </View>
                        <View style={styles.cardSubSec}>
                          <Text style={styles.cardLabel}>{"Deducted amount:"}</Text>
                          <Text style={styles.cardValue}>{item?.deducted_amount ? item?.deducted_amount : "-"}</Text>
                        </View>
                      </>
                    ) : null}
                  </TouchableOpacity>
                </>
              );
            }}
          />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Claim')} >
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
export default ClaimListScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    // alignItems: "center",
    flex: 1,
    // paddingBottom: 20,
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
    fontFamily: 'Poppins-SemiBold'
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
    marginTop: 2,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.labelTextColor,
    fontWeight: "600",
    marginLeft: 24,
    width: "30%",
    fontFamily: 'Poppins-SemiBold'
  },
  cardValue: {
    fontSize: 13,
    color: Colors.labelTextColor,
    fontWeight: "400",
    marginLeft: 24,
    width: "50%",
    fontFamily: 'Poppins-Regular'
  },
  listStyle: {
    marginTop: 5,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    width: 44,
    height: 44,
    position: 'absolute',
    bottom: 25
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
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  }
});
