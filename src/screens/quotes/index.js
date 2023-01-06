import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    Keyboard,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
} from "react-native";
import Header from "../../components/default/Header";
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Constant from "../../utils/Constant";
import Indicator from "../../components/default/Indicator";
import { SIGN_IN } from "../../redux/types";
import PushNotification from "react-native-push-notification";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";
import Logger from "../../utils/Logger";
import ApiRequest from "../../api/ApiRequest";
import axiosPostClient from "../../api/ApiClient";
import Helpers from "../../utils/Helpers";
import Colors from "../../config/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function GetAQuote({ navigation }) {
    const emailRef = useRef(null);
    const mobileNumberRef = useRef(null);
    const typeofInsuranceRef = useRef(null);
    const nameRef = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    const notificationCount = useSelector((state) => state.login.notificationCount);
    // const [email, setEmail] = useState('')

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
            if (!values.name) {
                errors.name = "Your name is required";
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.mobileNo) {
                errors.mobileNo = "Mobile number is required";
            }
            if (!values.summary) {
                errors.summary = "Summary is required";
            }
            return errors;
        },
        validateOnChange: false,
        //initialValues: { firstName: '', lastName: '', phoneNumber: '', email: '' },
        initialValues: { email: "", mobileNo: "", name: "", summary: "" },
        onSubmit: (values) => {
              callAddQuoteApi(values);
        },
    });

    const sendLocalNotification = () => {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: "iEnsure",
          showWhen: true,
          autoCancel: true,
          largeIcon: "ic_launcher",
          bigLargeIcon: "ic_launcher",
          vibrate: true,
          vibration: 300,
          priority: "high",
          visibility: "private",
          onlyAlertOnce: false,
          /* iOS and Android properties */
          id: 0,
          title: "iEnsure",
          message:
            "Thank you for reaching out. iEnsure team will get back to you in next 2 business days.",
          playSound: false,
          soundName: "default",
        });
      };

    const callAddQuoteApi = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true);
            Logger.log(
                "Calling Add Quote Api:=>>" +
                Constant.API_BASE_URL +
                Constant.API_ADD_QUOTE
            );
            var params = await ApiRequest.getAddQuoteRequest(
                values.name,
                values.email,
                values.summary,
                values.mobileNo
            );
            Logger.log("Params is" + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_ADD_QUOTE, params)
                .then((response) => {
                    setLoading(false);
                    Logger.log("response" + JSON.stringify(response?.data));
                    if (response?.data && response?.data?.status == 200) {
                        sendLocalNotification();
                        setMessage(response?.data?.message);
                        setQuoteSuccess(true);
                        setShowErrorDialog(false);
                    } else if (response?.data && response?.data?.status == 401) {
                        //Logout user if received 401 status code.
                        setMessage(response?.data?.message);
                        setSessionExpired(true);
                        setQuoteSuccess(false);
                    } else {
                        setMessage(response?.data?.message);
                        setShowErrorDialog(true);
                        setQuoteSuccess(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setShowErrorDialog(true);
                    setQuoteSuccess(false);
                    setMessage(JSON.stringify(error));
                    Logger.log("error" + JSON.stringify(error));
                });
        } else {
            setMessage(Constant.NO_INTERNET);
            setShowErrorDialog(true);
            setQuoteSuccess(false);
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
                <Header isMenu={false} isBack={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"Get A "}</Text>
                    <Text style={styles.titleText2}>{"Quote"}</Text>
                </View>
            </ImageBackground>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardViewStyle}
                showsVerticalScrollIndicator={false}
                style={[styles.keyboardStyle, { ...(keyboardStatus && { marginTop: -18 }) }]}>
                <View style={styles.container}>
                    <Text style={styles.titleTxt}>
                        {
                            "Your Full Name"
                        }
                    </Text>
                    <CustomTextInput
                        ref={nameRef}
                        placeholder="Enter Your Full Name"
                        onChangeText={handleChange("name")}
                        value={values.name}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                        showPasswordIcon={false}
                        errors={errors.name}
                    />
                    <Text style={styles.titleTxt}>
                        {
                            "Your Email"
                        }
                    </Text>
                    <CustomTextInput
                        ref={emailRef}
                        placeholder="Enter Your E-mail"
                        onChangeText={handleChange("email")}
                        value={values.email}
                        returnKeyType="next"
                        showPasswordIcon={false}
                        errors={errors.email}
                    />
                    <Text style={styles.titleTxt}>
                        {
                            "Your Summary"
                        }
                    </Text>
                    <CustomTextInput
                        ref={typeofInsuranceRef}
                        placeholder="Enter Your Summary"
                        onChangeText={handleChange("summary")}
                        value={values.summary}
                        returnKeyType="next"
                        onSubmitEditing={() => mobileNumberRef.current?.focus()}
                        showPasswordIcon={false}
                        errors={errors.summary}
                        // containerStyle={{
                        //   backgroundColor: Colors.inputColorNewBackground,
                        // }}
                        numberOfLines={6}
                        multiline={true}
                        minHeight={100}
                        maxHeight={150}
                    />
                    <Text style={styles.titleTxt}>
                        {
                            "Your Mobile Number"
                        }
                    </Text>
                    <CustomTextInput
                        ref={mobileNumberRef}
                        placeholder="Mobile No."
                        onChangeText={handleChange("mobileNo")}
                        value={values.mobileNo}
                        // returnKeyType="done"
                        onSubmitEditing={() => { }}
                        showPasswordIcon={false}
                        errors={errors.mobileNo}
                        // keyboardType="phone-pad"
                        keyboardType="number-pad"
                        maxLength={10}
                    // containerStyle={{
                    //   backgroundColor: Colors.inputColorNewBackground,
                    // }}
                    />
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
                    visible={showErrorDialog || isSessionExpired || quoteSuccess}
                    onCloseDialog={() => {
                        if (isSessionExpired) {
                            setSessionExpired(false);
                            proceedLogout();
                        } else if (quoteSuccess) {
                            setQuoteSuccess(false);
                            resetForm();
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
export default GetAQuote;

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
    titleTxt: {
        fontSize: 15,
        // alignSelf: "center",
        color: Colors.labelTextColor,
        fontWeight: "500",
        // textAlign: "center",
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold'
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
