import React, { useState, useEffect, useRef } from "react";
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
import Header from "../../components/default/Header";
import Helpers from "../../utils/Helpers";
import LinearGradient from "react-native-linear-gradient";
import { SIGN_IN, SET_HEALTH_CARD_API } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import axiosPostClient from "../../api/ApiClient";
import ApiRequest from "../../api/ApiRequest";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";
import Logger from "../../utils/Logger";
import Indicator from "../../components/default/Indicator";
import Constant from "../../utils/Constant";
import moment from "moment";
import GlobalStyle from "../../config/GlobalStyles";
import Colors from "../../config/Colors";

function HealthCard({ navigation }) {
    const viewRef = useRef([]);
    const [isLoading, setLoading] = useState(false);
    const [healthCardList, setHealthCardList] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dummyList, setDummyList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [pdf, setPdf] = useState(false);
    const [pdfMessage, setPdfMessage] = useState("");
    const [message, setMessage] = useState("");
    const [pathX, setPathX] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const [showClaimInProcess, setClaimInProcess] = useState(false);
    const [removeRadius, setRemoveRadius] = useState(false);
    const isCallHealthCardApi = useSelector(
        (state) => state.login.isCallHealthCardApi
    );
    const [isRefreshing, setIsRefreshing] = useState(false);
    const notificationCount = useSelector((state) => state.login.notificationCount);

    const dispatch = useDispatch();

    //Calling get health card api when screen open.
    useEffect(() => {
        callGetHealthCardDetail();
    }, []);

    useDidMountEffect(() => {
        Logger.log("Call get health card api" + isCallHealthCardApi);
        if (isCallHealthCardApi) {
            Logger.log("Call get health card api");
            dispatch({
                type: SET_HEALTH_CARD_API,
                payload: false,
            });
            callGetHealthCardDetail();
        }
    }, [isCallHealthCardApi]);

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

    const callGetHealthCardDetail = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true);
            Logger.log(
                "Calling GetHealthCardList Api:=>>" +
                Constant.API_BASE_URL +
                Constant.API_GET_USER_DETAIL
            );
            const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
            const access_token = await Helpers.getFromPref(
                Constant.PREF_ACCESS_TOKEN,
                ""
            );

            var params = await ApiRequest.getUserDetailRequest(userId, access_token);
            Logger.log("Params is" + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_GET_USER_DETAIL, params)
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
                        setMessage(response?.data?.message);
                        setShowErrorDialog(true);
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

    const callSendPdfRequest = async (card_no) => {
        if (await Helpers.checkInternet()) {
            setLoading(true);
            Logger.log(
                "Calling callSendPdfRequest Api:=>>" +
                Constant.API_BASE_URL +
                Constant.API_ADD_REQUEST_CARD_PDF
            );
            const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
            const access_token = await Helpers.getFromPref(
                Constant.PREF_ACCESS_TOKEN,
                ""
            );

            var params = await ApiRequest.getUserDetailPdfRequest(userId, access_token, card_no);
            Logger.log("Params is" + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_ADD_REQUEST_CARD_PDF, params)
                .then((response) => {
                    setLoading(false);
                    setIsRefreshing(false);
                    Logger.log("response" + JSON.stringify(response?.data));
                    if (response?.data && response?.data?.status == 200) {
                        setPdfMessage(response?.data?.message)
                        setPdf(true);
                        setRemoveRadius(false);
                        setHideBtn(false);
                        setSelectedIndex(null);
                        setRefresh(!refresh);
                    } else if (response?.data && response?.data?.status == 401) {
                        //Logout user if received 401 status code.
                        setMessage(response?.data?.message);
                        setSessionExpired(true);
                        setRemoveRadius(false);
                        setHideBtn(false);
                        setSelectedIndex(null);
                        setRefresh(!refresh);
                    } else {
                        setMessage(response?.data?.message);
                        setShowErrorDialog(true);
                        setRemoveRadius(false);
                        setHideBtn(false);
                        setSelectedIndex(null);
                        setRefresh(!refresh);
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

    const formatDate = (date) => {
        if (date) {
            return moment(date).format("DD-MMM-YY");
        } else {
            return "-";
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
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"My "}</Text>
                    <Text style={styles.titleText2}>{"HealthCard"}</Text>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <FlatList
                    data={healthCardList}
                    style={styles.listStyle}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View
                                    style={[
                                        styles.cardView,
                                    ]}
                                >
                                    <LinearGradient colors={['#005C84', '#04B2FF']} style={styles.cardHeader}>
                                        <Text style={styles.infoText}>{item?.company_title} - Health Card</Text>
                                    </LinearGradient>
                                    <LinearGradient colors={['#04B2FF', '#D5E3F0']} style={styles.content} >
                                        <View style={{ width: '80%' }}>
                                            <View style={[styles.cardSubSec, { marginTop: 0 }]}>
                                                <Text style={styles.cardLabel}>{"Insured Name:"}</Text>
                                                <Text style={styles.cardValue}>{item?.name}</Text>
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
                                                <Text style={styles.cardLabel}>{"Emp Id:"}</Text>
                                                <Text style={styles.cardValue}>
                                                    {item?.emp_id}
                                                </Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Gender:"}</Text>
                                                <Text style={styles.cardValue}>{item?.gender}</Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Age:"}</Text>
                                                <Text style={[styles.cardValue]}>
                                                    {item?.age}
                                                </Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Valid from:"}</Text>
                                                <Text style={styles.cardValue} numberOfLines={2}>
                                                    {`${formatDate(item?.from_dt)} To ${formatDate(item?.to_dt)}`}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardImg}>
                                            <Image
                                                source={require("../../assets/images/Groupcard.png")}
                                                style={styles.heartImg}
                                            />
                                        </View>
                                    </LinearGradient>
                                    <LinearGradient colors={['#005C84', '#03AAF4']} style={styles.footer}>
                                        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: Colors.downloadColor }]} onPress={() => {
                                            setLoading(true);
                                            setSelectedIndex(index);
                                            setTimeout(() => {
                                                setRemoveRadius(true);
                                                setHideBtn(true);
                                                callSendPdfRequest(item?.card_no);
                                                setRefresh(!refresh);
                                                setLoading(false);
                                            }, 2000);
                                        }}>
                                            <Text style={styles.infoText}>Download</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: Colors.cliamBtnColor }]} onPress={() => {
                                            //is_claim:1 disable
                                            //is_claim:0 enble
                                            if (parseInt(item.is_claim) == 0) {
                                                navigation.navigate("Claim", {
                                                    data: item,
                                                });
                                            } else {
                                                setClaimInProcess(true);
                                                setMessage("Your claim is in process.");
                                            }
                                        }}>
                                            <Text style={styles.infoText}>Claim</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={renderEmptyContainer}
                    onRefresh={onPullToRefresh}
                    refreshing={isRefreshing}
                />
            </View>
            <CustomAlertDialog
                visible={showErrorDialog || isSessionExpired || showClaimInProcess}
                onCloseDialog={() => {
                    if (isSessionExpired) {
                        setSessionExpired(false);
                        proceedLogout();
                    } else if (showClaimInProcess) {
                        setClaimInProcess(false);
                    } else {
                        setShowErrorDialog(false);
                    }
                }}
                description={message}
            />
            <Indicator showLoader={isLoading} />
            <CustomAlertDialog
                visible={pdf}
                onCloseDialog={() => {
                    setPdf(false);
                }}
                description={pdfMessage}
            />
        </>
    );
}
export default HealthCard;

const styles = StyleSheet.create({
    headerBgImg: {
        width: "100%",
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingBottom: 20,
    },
    container: {
        backgroundColor: Colors.containerColor,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        // justifyContent: 'center',
        // alignItems: 'center',
        bottom: 0,
        padding: 10,
        width: '100%',
        height: '87%'
    },
    heartImg: {
        width: 95,
        height: 110,
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
    },
    cardView: {
        width: "100%",
        // backgroundColor: "white",
        alignSelf: "center",
        // borderRadius: 26,
        // borderWidth: 1,
        borderColor: Colors.cardBorder,
        // paddingVertical: 15,
        marginTop: 10,
    },
    cardSubSec: {
        flexDirection: "row",
        marginTop: 2,
    },
    cardLabel: {
        fontSize: 12,
        color: Colors.labelTextColor,
        fontWeight: "600",
        marginLeft: 14,
        width: "30%",
        fontFamily: 'Poppins-SemiBold'
    },
    cardValue: {
        fontSize: 12,
        color: Colors.labelTextColor,
        fontWeight: "400",
        marginLeft: 24,
        width: "50%",
        fontFamily: 'Poppins-Regular'
    },
    listStyle: {
        marginTop: 5,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10
    },
    titleText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '300',
        color: Colors.whiteColor,
        fontFamily: 'Poppins-Regular'
    },
    titleText2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '600',
        color: Colors.whiteColor,
        fontFamily: 'Poppins-SemiBold'
    },
    cardHeader: {
        paddingVertical: 11,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 14,
        color: Colors.whiteColor,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold'
    },
    footerBtn: {
        padding: 4,
        width: 98,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.whiteColor
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 5,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },
    cardImg: {
        width: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    content: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1
    },
    emptyFlex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
