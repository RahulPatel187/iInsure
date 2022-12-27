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
import { useDispatch, useSelector } from "react-redux";
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

function NotificationListScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [notificationList, setNotificationList] = useState("");
    const [message, setMessage] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const notificationCount = useSelector((state) => state.login.notificationCount);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            callGetNotificationListApi();
        });
        return unsubscribe;
    }, [navigation]);

    const callGetNotificationListApi = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true);
            Logger.log(
                "Calling Get reminder list api:=>>" +
                Constant.API_BASE_URL +
                Constant.API_INQUIRY_LIST
            );
            const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
            const access_token = await Helpers.getFromPref(
                Constant.PREF_ACCESS_TOKEN,
                ""
            );

            var params = await ApiRequest.getInquiryListRequest(userId, access_token);
            Logger.log("Params is" + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_GET_NOTIFICATIONS, params)
                .then((response) => {
                    console.log("response", response);
                    setLoading(false);
                    setIsRefreshing(false);
                    Logger.log("response" + JSON.stringify(response?.data));
                    if (response?.data && response?.data?.status == 200) {
                        setNotificationList(response?.data?.data);
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
        callGetNotificationListApi();
    };

    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
                <Text style={styles.titleTxt}>{"My Notifications"}</Text>
                <View style={styles.mainSection}>
                    <FlatList
                        data={notificationList}
                        style={styles.listStyle}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
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
                                            <Text style={styles.cardLabel}>{item?.title}</Text>
                                            <Text style={styles.cardValue}>{item?.date_time ? moment(item?.date_time).format("DD-MMM-YY") : "-"}</Text>
                                        </View>
                                        <Text style={[styles.cardValue, styles.cardValue2]}>{item?.description}</Text>
                                    </TouchableOpacity>
                                </>
                            );
                        }}
                        ListEmptyComponent={renderEmptyContainer}
                        onRefresh={onPullToRefresh}
                        refreshing={isRefreshing}
                    />
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
export default NotificationListScreen;

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
    },
    cardView: {
        width: "90%",
        backgroundColor: Colors.whiteColor,
        alignSelf: "center",
        borderRadius: 26,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
        paddingVertical: 10,
        marginTop: 10,
    },
    cardSubSec: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10
        // width: '100%'
    },
    cardLabel: {
        fontSize: 14,
        color: Colors.labelTextColor,
        fontWeight: "600",
        // marginLeft: 24,
        // width: "30%",
        paddingLeft: 10,
        paddingRight: 10
    },
    cardValue: {
        fontSize: 13,
        color: Colors.labelTextColor,
        fontWeight: "400",
        // marginLeft: 24,
        // width: "50%",
        paddingLeft: 10,
        paddingRight: 15
    },
    listStyle: {
        marginTop: 5,
    },
    emptyFlex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardValue2: { 
        width: '100%', 
        marginLeft: 10, 
        marginTop: 5, 
        lineHeight: 20 
    }
});
