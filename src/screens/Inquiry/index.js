import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Platform,
} from "react-native";
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import Header from "../../components/default/Header";
import Helpers from "../../utils/Helpers";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Logger from "../../utils/Logger";
import Colors from "../../config/Colors";
import ApiRequest from "../../api/ApiRequest";
import axiosPostClient from "../../api/ApiClient";
import Constant from "../../utils/Constant";
import Indicator from "../../components/default/Indicator";
import { SIGN_IN } from "../../redux/types";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";

function Inquiry({ navigation }) {
    const emailRef = useRef(null);
    const policyNumberRef = useRef(null);
    const uhidRef = useRef(null);
    const summaryRef = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);
    // const [email, setEmail] = useState('')
    const [policyNumber, setPolicyNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const notificationCount = useSelector((state) => state.login.notificationCount);

    const dispatch = useDispatch();
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
        resetForm,
        setFieldValue,
    } = useFormik({
        //  validationSchema: InquirySchema,
        validate: (values) => {
            const errors = {};
            // if (!values.email) {
            //     errors.email = "Your email is required";
            // }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.policyNo) {
                errors.policyNo = "Policy number is required";
            }

            if (!values.uhid) {
                errors.uhid = "Your UHID is required";
            }
            if (!values.summary) {
                errors.summary = "Summary is required";
            }
            return errors;
        },
        validateOnChange: false,
        //initialValues: { firstName: '', lastName: '', phoneNumber: '', email: '' },
        initialValues: { email: "", policyNo: "", uhid: "", summary: "" },
        onSubmit: (values) => {
            if (checkedBox.includes(true) === false) {
                console.log("1");
                return;
                // errors.dueDate = "Due date is required";
            }
            //   callApi(values);
        },
    });

    useEffect(() => {
        getDatafromPref();
    }, []);

    const getDatafromPref = async () => {
        var userInfo = await Helpers.getFromPref(Constant.PREF_USER_INFO);
        Logger.log("userInfo" + JSON.stringify(userInfo));
        if (userInfo) {
            var userJsonObject = JSON.parse(userInfo);
            // setEmail(userJsonObject.email)
            setFieldValue("email", userJsonObject?.email);
            setPolicyNumber("Policy No: " + userJsonObject?.policy_no);
            setCardNumber("UHID No: " + userJsonObject?.card_no);
        }
        //setEmail(userInfo.email)
        //setPolicyNumber(userInfo.policyNumber)
    };

    //Calling add inquiry api.
    const callAddInquiryApi = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true);
            Logger.log(
                "Calling Add Inquiry Api:=>>" +
                Constant.API_BASE_URL +
                Constant.API_ADD_INQUIRY
            );
            const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
            const access_token = await Helpers.getFromPref(
                Constant.PREF_ACCESS_TOKEN,
                ""
            );

            var params = await ApiRequest.getAddInquiryRequest(
                userId,
                access_token,
                values.email,
                values.summary
            );
            Logger.log("Params is" + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_ADD_INQUIRY, params)
                .then((response) => {
                    setLoading(false);
                    Logger.log("response" + JSON.stringify(response?.data));
                    if (response?.data && response?.data?.status == 200) {
                        setMessage(response?.data?.message);
                        setInquirySuccess(true);
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

    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={[styles.headerBgImg, { ...(keyboardStatus && { paddingBottom: 55 }) }]}
            >
                <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"My "}</Text>
                    <Text style={styles.titleText2}>{"Inquiry"}</Text>
                </View>
            </ImageBackground>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardViewStyle}
                showsVerticalScrollIndicator={false}
                style={[styles.keyboardStyle, { ...(keyboardStatus && { marginTop: -18 }) }]}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textStyle}>Your E-mail</Text>
                        <CustomTextInput
                            ref={emailRef}
                            placeholder="Enter Your E-mail"
                            onChangeText={handleChange("email")}
                            value={values.email}
                            returnKeyType="next"
                            showPasswordIcon={false}
                            errors={errors.email}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Your Policy Number</Text>
                        <CustomTextInput
                            ref={policyNumberRef}
                            placeholder="Enter Your Policy Number"
                            onChangeText={handleChange("policyNo")}
                            value={values.policyNo}
                            returnKeyType="next"
                            showPasswordIcon={false}
                            errors={errors.policyNo}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Your UHID Number</Text>
                        <CustomTextInput
                            ref={uhidRef}
                            placeholder="Enter Your UHID Number"
                            onChangeText={handleChange("uhid")}
                            value={values.uhid}
                            returnKeyType="next"
                            showPasswordIcon={false}
                            errors={errors.uhid}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Your Summary</Text>
                        <CustomTextInput
                            ref={summaryRef}
                            placeholder="Enter Your Summary"
                            onChangeText={handleChange("summary")}
                            value={values.summary}
                            // returnKeyType="next"
                            multiline={true}
                            numberOfLines={4}
                            showPasswordIcon={false}
                            errors={errors.summary}
                        />
                    </View>
                    <CustomButton
                        text={"Submit"}
                        isLarge={true}
                        onPress={() => {
                            // Keyboard.dismiss();
                            handleSubmit();
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
            <Indicator showLoader={isLoading} />
            <CustomAlertDialog
                visible={showErrorDialog || isSessionExpired || inquirySuccess}
                onCloseDialog={() => {
                    if (isSessionExpired) {
                        setSessionExpired(false);
                        proceedLogout();
                    } else if (inquirySuccess) {
                        setInquirySuccess(false);
                        navigation.goBack();
                    } else {
                        setShowErrorDialog(false);
                    }
                }}
                description={message}
            />
        </>
    );
}
export default Inquiry;

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
        // position: 'absolute',
        // justifyContent: 'center',
        // alignItems: 'center',
        bottom: 0,
        padding: 20,
        width: '100%',
        height: '87%'
    },
    textStyle: {
        color: Colors.labelTextColor,
        fontSize: Helpers.getDynamicSize(14),
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
        fontWeight: "700",
        marginTop: 10
    },
    titleTxt: {
        fontSize: 15,
        // alignSelf: "center",
        color: Colors.labelTextColor,
        fontWeight: "500",
        // textAlign: "center",
        marginTop: 10
    },
    loginBtn: {
        width: "90%",
        height: 50,
        alignSelf: "center",
        backgroundColor: Colors.loginBtnColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 25,
        marginBottom: 15,
        shadowColor: Colors.blackColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginBtnTxt: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.whiteColor,
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
        color: Colors.whiteColor
    },
    titleText2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '600',
        color: Colors.whiteColor
    },
    textInput: {
        padding: 10,
        borderRadius: 5,
        color: Colors.blackColor,
        backgroundColor: Colors.whiteColor,
        marginTop: 5,
        fontSize: 15,
        fontWeight: '500'
    },
    keyboardViewStyle: {
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    keyboardStyle: {
        marginTop: -35,
        backgroundColor: Colors.containerColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: "70%",
    },
});
