import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, Image, Dimensions, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { useSelector, useDispatch } from 'react-redux';
import SafeAreaView from '../../components/default/SafeAreaView';
import Header from '../../components/default/Header';
import Helpers from '../../utils/Helpers';
import Colors from '../../config/Colors';
import CustomTextInput from '../../components/default/TextInput';
import CustomButton from '../../components/default/Buttons';
import Constant from '../../utils/Constant';
import Indicator from '../../components/default/Indicator';
import CustomAlertDialog from '../../components/default/CustomAlertDialog'
import Logger from '../../utils/Logger';
import axiosPostClient from '../../api/ApiClient';
import ApiRequest from '../../api/ApiRequest'

const windowWidth = Dimensions.get("window").width;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const regexPhonenoDigit = /^[6-9]\d{9}$/
/*
AddPhoneEmail Screen:-
This screen is for enter email or phone no.
*/
function AddPhoneEmailScreen({ route, navigation }) {
    // Declaring the variables.
    var { email, phoneNumber, isEmailEnter
        //  , is_verified_phone, is_verified_email
    } = route.params;
    Logger.log("isEmailEnter value in AddPhoneEmailScreen: " + isEmailEnter)
    const phoneNumberRef = useRef(null);
    const emailRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [phoneNumberInput, setPhoneNumberInput] = useState(phoneNumber)
    const [emailInput, setEmailInput] = useState(email)
    const [error, setError] = useState('')
    const [valErrorMessage, setValErrorMessage] = useState('')
    const [showErrorDialog, setShowErrorDialog] = useState(false)


    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () => backHandler.remove()
    // }, [])

    const validateLogin = () => {
        // Validate login field.
        //After successful validate call respective api.

        var isValid = true;

        if (isEmailEnter) {
            /*
            isEmailEnter flag is for previous screen entered value.Email or Phone
            */
            if (!phoneNumberInput) {
                isValid = false
                setValErrorMessage("Please enter Phone no.")
            }
            else if (phoneNumberInput && !regexPhonenoDigit.test(phoneNumberInput.toString().trim())) {
                isValid = false
                setValErrorMessage("Please enter valid phone no. with 10 digit.")
            }
            else if (phoneNumberInput && phoneNumberInput.length < 10) {
                isValid = false
                setValErrorMessage("Please enter valid phone no. with 10 digit.")
            }
        }
        else {
            if (!emailInput) {
                isValid = false
                setValErrorMessage("Please enter email.")
            }
            else if (emailInput && !regexEmail.test(emailInput.trim())) {
                isValid = false
                setValErrorMessage("Please enter valid email")
            }
        }

        if (isValid) {
            setValErrorMessage('')

            if (isEmailEnter) {
                /*
                reverse parameter pass compare to login screen.
                */
                callSendOtpApi(false)
            }
            else {
                callSendOtpApi(true)
            }
        }

    }

    const callSendOtpApi = async (isEmailEntersLocal) => {
        if (await Helpers.checkInternet()) {
            if (isEmailEntersLocal) {
                setLoading(true)
                Logger.log("Calling SendOtpWithEmailApi:=>>" + Constant.API_BASE_URL + Constant.API_SEND_OTP_WITH_EMAIL)
                var params = await ApiRequest.getSendOtpWithEmailRequest(emailInput);
                Logger.log("Params is" + JSON.stringify(params))
                axiosPostClient().post(Constant.API_SEND_OTP_WITH_EMAIL, params).then((response) => {
                    setLoading(false)
                    Logger.log("response" + JSON.stringify(response?.data))
                    if (response?.data && response?.data?.status == 200) {
                        var otp = response?.data?.data?.otp
                        verifyOtp(isEmailEntersLocal)
                    }
                    else {
                        setError(response?.data?.message)
                        setShowErrorDialog(true)
                    }

                }).catch((error) => {
                    setLoading(false)
                    setError(JSON.stringify(error))
                    setShowErrorDialog(true)
                    Logger.log("error" + JSON.stringify(error))

                })
            }
            else {
                setLoading(true)
                Logger.log("Calling SendOtpWithPhoneApi:=>>" + Constant.API_BASE_URL + Constant.API_SEND_OTP_WITH_Phone)
                var params = await ApiRequest.getSendOtpWithPhoneRequest(phoneNumberInput);
                Logger.log("Params is" + JSON.stringify(params))
                axiosPostClient().post(Constant.API_SEND_OTP_WITH_Phone, params).then((response) => {
                    setLoading(false)
                    Logger.log("response" + JSON.stringify(response?.data))
                    if (response?.data && response?.data?.status == 200) {
                        var otp = response?.data?.data?.otp
                        verifyOtp(isEmailEntersLocal)
                    }
                    else {
                        setError(response?.data?.message)
                        setShowErrorDialog(true)
                    }

                }).catch((error) => {
                    setLoading(false)
                    setError(JSON.stringify(error))
                    setShowErrorDialog(true)
                    Logger.log("error" + JSON.stringify(error))

                })
            }
        }
        else {
            setError(Constant.NO_INTERNET)
            setShowErrorDialog(true)
        }
    }


    const verifyOtp = async (isEmailEntersLocal) => {
        Logger.log("isEmailEnter===>" + isEmailEntersLocal)
        navigation.push('VerifyEmailOtp', {
            email: emailInput,
            phoneNumber: phoneNumberInput,
            isEmailEnter: isEmailEntersLocal,
            is_verified_phone: isEmailEnter == true ? "0" : "1",
            is_verified_email: isEmailEnter == true ? "1" : "0"
        })

    }

    //render phone input textinput with description if in previous screen email enter.
    const renderPhoneInput = () => {
        return (
            <View>
                <Text style={styles.titleText}>Add your phone number:-</Text>
                <Text style={styles.subTitleText}>Looks like you haven't added your phone no. Please add your phone no:</Text>

                <View style={{
                    marginTop: 16
                }}>
                    <CustomTextInput
                        showIcon={true}
                        icon={require('../../assets/images/ic_phone.png')}
                        ref={phoneNumberRef}
                        placeholder="Phone Number"
                        onChangeText={(text) => setPhoneNumberInput(text)}
                        value={phoneNumberInput}
                        keyboardType="phone-pad"
                        textStyle={styles.textBox}
                        returnKeyType="done"
                        maxLength={10}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                            validateLogin()

                        }}
                        showPasswordIcon={false}
                        errors={valErrorMessage}
                    />
                </View>
            </View>
        )
    }

    //render phone input textinput with description if in previous screen phone no enter.
    const renderEmailInput = () => {
        return (
            <View>
                <Text style={styles.titleText}>Add your email:-</Text>
                <Text style={styles.subTitleText}>Looks like you haven't added your email. Please add your email:</Text>
                <View style={{
                    marginTop: 16
                }}>
                    <CustomTextInput
                        showIcon={true}
                        icon={require('../../assets/images/ic_email.png')}
                        ref={emailRef}
                        placeholder="Email"
                        onChangeText={(text) => setEmailInput(text)}
                        value={emailInput}
                        textStyle={styles.textBox}
                        keyboardType="email-address"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                            validateLogin()
                            // handleSubmit()
                        }}
                        showPasswordIcon={false}
                        errors={valErrorMessage}
                    />
                </View>
            </View>
        )
    }


    // Loading the UI.
    return (
        <SafeAreaView>
            <View style={{
                flex: 1
            }}>
                <Header title={isEmailEnter ? "Enter Phone" : "Enter Email"} isBack={true} isMenu={false} navigation={navigation} />
                <KeyboardAwareScrollView contentContainerStyle={{
                    flexGrow: 1
                }}>
                    <View style={styles.container}>
                        <Image source={require("../../assets/images/ic_email_phone.png")} style={styles.imageStyle} />

                        <View style={styles.textInputView}>
                            <View style={{ margin: 16, marginBottom: 8, }}>
                                {
                                    isEmailEnter ?
                                        renderPhoneInput() :
                                        renderEmailInput()
                                }
                            </View>
                            {/* {
                                error ? <Text style={styles.errorStyle}>{error}</Text> : null
                            } */}
                            <CustomButton text={'Submit'} onPress={() => {
                                Keyboard.dismiss()
                                validateLogin()
                                //  handleSubmit()
                            }} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Indicator showLoader={isLoading} />
                <CustomAlertDialog
                    visible={showErrorDialog}
                    onCloseDialog={() => {
                        setShowErrorDialog(false)
                    }}
                    description={error} />
            </View>
        </SafeAreaView >
    );
}
export default AddPhoneEmailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: 16,
    },
    titleText: {
        marginTop: 4,
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(18),
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'

    },
    subTitleText: {
        marginTop: 8,
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(15),
        fontFamily: 'Roboto-Regular',

    },
    textBox: {
        width: '100%',
        height: 56,
        backgroundColor: Colors.whiteColor,
        borderRadius: 50,
        marginTop: 10,
        color: Colors.labelTextColor,
        shadowColor: Colors.blackColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingLeft: 40,
        fontFamily: 'Poppins-Regular'
      },
    textInputView: {
        marginTop: 16,
        // marginBottom: 16,
        backgroundColor: Colors.inputBackgroundColor,
        borderRadius: 12,
    },
    imageStyle: {
        marginTop: 16,
        height: Helpers.getDynamicSize(250),
        width: "90%",
        resizeMode: 'contain',
        marginHorizontal: Helpers.getDynamicSize(20)
    },
});