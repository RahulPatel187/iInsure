import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    Keyboard,
    Image,
    StyleSheet,
    FlatList,
    Alert,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import moment from 'moment';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useFormik } from 'formik';
// import CustomAlertDialog from "../../components/CustomAlertDialog";
// import * as Yup from "yup";
import axiosPostClient from '../../api/ApiClient';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
// import messaging from "@react-native-firebase/messaging";
import SafeAreaView from '../../components/default/SafeAreaView';
import Header from '../../components/default/Header';
import Helpers from '../../utils/Helpers';
import Colors from '../../config/Colors';
import CustomTextInput from '../../components/default/TextInput';
import CustomButton from '../../components/default/Buttons';
import Constant from '../../utils/Constant';
// import DropDownComponent from "../../components/default/DropDownComponent";
import Indicator from '../../components/default/Indicator';
import CustomAlertDialog from '../../components/default/CustomAlertDialog';
import CustomConfirmDialog from '../../components/default/CustomConfirmationDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../api/ApiRequest';
import Logger from '../../utils/Logger';
import { SIGN_IN, SET_HEALTH_CARD_API } from "../../redux/types";

var reminderArray = [
    {
        title: 'Remind before 1 week',
        id: 1,
    },
    {
        title: 'Remind before 2 week',
        id: 2,
    },
    {
        title: 'Remind before 1 month',
        id: 3,
    },
];

function Claim({ route, navigation }) {
    const doctorNameRef = useRef(null);
    const hospitalNameRef = useRef(null);
    const diagnosisNameRef = useRef(null);
    const admitDateRef = useRef(null);
    const mobileNoRef = useRef(null);
    const [isDatePickerVisible, setDatePickerVisibile] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [claimInfo, setClaimInfo] = useState();
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [serverDate, setServerDate] = useState('');
    const [name, setName] = useState('')
    const [policyNumber, setPolicyNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const notificationCount = useSelector(state => state.login.notificationCount);
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
    useEffect(() => {
        if (route?.params) {
            setClaimInfo(route?.params?.data);
        }
    }, []);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetForm();
            getDatafromPref();
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        getDatafromPref();
    }, []);

    const getDatafromPref = async () => {
        var userInfo = await Helpers.getFromPref(Constant.PREF_USER_INFO);
        if (userInfo) {
            var userJsonObject = JSON.parse(userInfo);
            console.log("userInfo" , userInfo);
            // setEmail(userJsonObject.email)
            setName(userJsonObject?.name);
            setPolicyNumber(userJsonObject?.policy_no);
            setCardNumber(userJsonObject?.card_no);
        }
        //setEmail(userInfo.email)
        //setPolicyNumber(userInfo.policyNumber)
    };

    // var { data } = route?.params;

    //   const dispatch = useDispatch();

    useEffect(() => {
        var liveDate = new Date();
        var currentDate = moment(liveDate);
        var futureMonth = moment(currentDate).add(1, 'M');
        var perviousMonth = moment(currentDate).subtract(1, 'M');
        // if (data && moment(data?.to_dt).isBefore(moment(futureMonth))) {
        //     setMaxDate(moment(data.to_dt));
        // } else {
        setMaxDate(futureMonth);
        // }
        setMinDate(perviousMonth);
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
        validate: values => {
            const errors = {};
            if (!values.doctorName) {
                errors.doctorName = 'Doctor Name is required';
            }
            if (!values.hospitalName) {
                errors.hospitalName = 'Hospital Name is required';
            }
            if (!values.diagnosisName) {
                errors.diagnosisName = 'Diagnosis Name is required';
            }

            if (!values.admitDate) {
                errors.admitDate = 'Your admitDate is required';
            }
            if (!values.mobileNo) {
                errors.mobileNo = ' Hospital Contact No. is required';
            }
            return errors;
        },
        validateOnChange: false,
        initialValues: {
            doctorName: '',
            hospitalName: '',
            diagnosisName: '',
            admitDate: '',
            mobileNo: '',
        },
        onSubmit: values => {
            // onLoginClick(values)
            callConfirmDialog();
            // callClaimApi()
        },
    });

    const callConfirmDialog = () => {
        setShowConfirmDialog(true);
    };

    const showDatePicker = () => {
        setDatePickerVisibile(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibile(false);
    };

    const handleConfirm = date => {
        var formattedDate = format(date, 'dd-MM-yyyy');
        setFieldValue('admitDate', date);
        var serverDate = moment(date).format('dd-MM-yyyy');
        setServerDate(serverDate);
        setIsDateSelected(true);
        hideDatePicker();
    };

    //Call claim card api.
    const callClaimApi = async () => {
        if (await Helpers.checkInternet()) {
            const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, '');
            const access_token = await Helpers.getFromPref(
                Constant.PREF_ACCESS_TOKEN,
                '',
            );
            setLoading(true);
            Logger.log(
                'Calling Claim Api:=>>' + Constant.API_BASE_URL + Constant.API_CLAIM,
            );
            var params = await ApiRequest.getClaimRequest(
                userId,
                access_token,
                claimInfo.card_no,
                values.doctorName,
                values.hospitalName,
                values.diagnosisName,
                serverDate,
                values.mobileNo,
            );
            Logger.log('Params is' + JSON.stringify(params));
            axiosPostClient()
                .post(Constant.API_CLAIM, params)
                .then(response => {
                    setLoading(false);
                    Logger.log('response' + JSON.stringify(response?.data));
                    if (response?.data && response?.data?.status == 200) {
                        setMessage(response?.data?.message);
                        setClaimSuccess(true);
                        resetForm();
                    } else if (response?.data && response?.data?.status == 401) {
                        //Logout user if received 401 status code.
                        setMessage(response?.data?.message);
                        setSessionExpired(true);
                    } else {
                        setMessage(response?.data?.message);
                        setShowErrorDialog(true);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    setShowErrorDialog(true);
                    setMessage(JSON.stringify(error));
                    Logger.log('error' + JSON.stringify(error));
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
        await AsyncStorage.clear();
        await Helpers.performLogout();
        dispatch({
            type: SIGN_IN,
            payload: '',
        });
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    flex: 1,
                }}>
                <ImageBackground
                    source={require('../../assets/images/headerBgImg.png')}
                    style={[
                        styles.headerBgImg,
                        { ...(keyboardStatus && { paddingBottom: 55 }) },
                    ]}>
                    <Header
                        isMenu={true}
                        rightIcon={true}
                        notificationCnt={notificationCount ? notificationCount : null}
                        rightIconImage={require('../../assets/images/Notificationbell.png')}
                        navigation={navigation}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{'My '}</Text>
                        <Text style={styles.titleText2}>{'Claim'}</Text>
                    </View>
                </ImageBackground>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.keyboardViewStyle}
                    showsVerticalScrollIndicator={false}
                    style={[
                        styles.keyboardStyle,
                        { ...(keyboardStatus && { marginTop: -18 }) },
                    ]}>
                    <View style={styles.container}>
                        <View style={styles.claimReview}>
                            <View style={{ width: '60%' }}>
                                <View style={styles.cardSubSec}>
                                    <Text style={styles.cardLabel}>{"Insured Name:"}</Text>
                                    <Text style={styles.cardValue}>{claimInfo ? claimInfo.name : name}</Text>
                                </View>
                                <View style={styles.cardSubSec}>
                                    <Text style={styles.cardLabel}>{"Policy Number:"}</Text>
                                    <Text style={styles.cardValue}>{claimInfo ? claimInfo.policy_no : policyNumber}</Text>
                                </View>
                                <View style={styles.cardSubSec}>
                                    <Text style={styles.cardLabel}>{"UHID Number:"}</Text>
                                    <Text style={styles.cardValue}>{claimInfo ? claimInfo.card_no : cardNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.claimReviewImg}>
                                <Image
                                    source={require('../../assets/images/heart.png')}
                                    style={styles.heartImg}
                                />
                            </View>
                        </View>
                        <View style={styles.formControl}>
                            <CustomTextInput
                                ref={doctorNameRef}
                                placeholder="Doctor Name"
                                onChangeText={handleChange('doctorName')}
                                value={values.doctorName}
                                returnKeyType="next"
                                onSubmitEditing={() => hospitalNameRef.current?.focus()}
                                showPasswordIcon={false}
                                errors={errors.doctorName}
                            />
                        </View>
                        <View style={styles.formControl}>
                            <CustomTextInput
                                ref={hospitalNameRef}
                                placeholder="Hospital Name"
                                onChangeText={handleChange('hospitalName')}
                                value={values.hospitalName}
                                returnKeyType="next"
                                onSubmitEditing={() => showDatePicker()}
                                showPasswordIcon={false}
                                errors={errors.hospitalName}
                            />
                        </View>
                        <View style={styles.formControl}>
                            <CustomTextInput
                                ref={diagnosisNameRef}
                                placeholder="Diagnosis"
                                onChangeText={handleChange('diagnosisName')}
                                value={values.diagnosisName}
                                returnKeyType="next"
                                onSubmitEditing={() => showDatePicker()}
                                showPasswordIcon={false}
                                errors={errors.diagnosisName}
                            />
                        </View>
                        {console.log('values', values)}
                        <Pressable
                            onPress={() => showDatePicker()}
                            style={styles.buttonExpiryDate}>
                            <Text
                                style={
                                    isDateSelected
                                        ? styles.textSelectedExpiryDate
                                        : styles.textUnSelectedExpiryDate
                                }>
                                {`Admit Date: ${values.admitDate &&
                                    moment(values.admitDate).format('DD-MM-yyyy')
                                    }`}
                            </Text>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                headerTextIOS="Admit Date"
                                maximumDate={new Date(maxDate)}
                                minimumDate={new Date(minDate)}
                            />
                            <Image
                                style={styles.calanderImage}
                                source={require('../../assets/images/cal.png')}
                            />
                        </Pressable>
                        {errors.admitDate ? (
                            <Text style={styles.dueDateError}>{errors.admitDate}</Text>
                        ) : null}
                        <View style={styles.formControl}>
                            <CustomTextInput
                                ref={mobileNoRef}
                                placeholder="Hospital Contact Number"
                                onChangeText={handleChange('mobileNo')}
                                value={values.mobileNo}
                                returnKeyType="done"
                                onSubmitEditing={() => { }}
                                showPasswordIcon={false}
                                errors={errors.mobileNo}
                                // keyboardType="phone-pad"
                                keyboardType="number-pad"
                                maxLength={10}
                            />
                        </View>
                        <CustomButton
                            text={'Claim'}
                            isLarge={true}
                            onPress={() => {
                                Keyboard.dismiss();
                                handleSubmit();
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <CustomAlertDialog
                    visible={showErrorDialog || isSessionExpired || claimSuccess}
                    onCloseDialog={() => {
                        if (isSessionExpired) {
                            setSessionExpired(false);
                            proceedLogout();
                        } else if (claimSuccess) {
                            dispatch({
                                type: SET_HEALTH_CARD_API,
                                payload: true,
                            });
                            setClaimSuccess(false);
                            resetForm();
                            navigation.goBack();
                        } else {
                            setShowErrorDialog(false);
                        }
                    }}
                    description={message}
                />
                <CustomConfirmDialog
                    visible={showConfirmDialog}
                    onNoClick={() => {
                        setShowConfirmDialog(false);
                    }}
                    onYesClick={() => {
                        setShowConfirmDialog(false);
                        callClaimApi();
                        // handleSubmit()
                    }}
                    message={'Are you sure want to claim?'}
                />

                <Indicator showLoader={isLoading} />
            </View>
        </SafeAreaView>
    );
}
export default Claim;

const styles = StyleSheet.create({
    headerBgImg: {
        width: '100%',
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingBottom: 40,
    },
    heartImg: {
        width: 65,
        height: 57,
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
    },
    container: {
        height: '87%',
        width: '100%',
        backgroundColor: Colors.containerColor,
        // position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '300',
        color: Colors.whiteColor,
        fontFamily: 'Poppins-Regular',
    },
    titleText2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '600',
        color: Colors.whiteColor,
        fontFamily: 'Poppins-SemiBold',
    },
    selectedTypeTextColor: {
        color: Colors.blackColor,
    },
    unSelectedTypeTextColor: {
        color: Colors.unSelectTextColor,
    },
    buttonExpiryDate: {
        // margin: 16,
        // height: Helpers.getDynamicSize(60),
        // borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        height: Helpers.getDynamicSize(50),
        // position: 'absolute',
        paddingStart: RFValue(16),
        paddingEnd: RFValue(16),
        color: Colors.blackColor,
        // flex: 1,
        borderRadius: 10,
        fontFamily: 'Poppins-Regular',
        borderColor: Colors.grayColor,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.unSelectTextColor,
    },
    textUnSelectedExpiryDate: {
        // marginLeft: 16,
        color: Colors.grayColor,
        fontFamily: 'Poppins-Regular',
    },
    textSelectedExpiryDate: {
        // marginLeft: 16,
        color: Colors.blackColor,
        fontFamily: 'Poppins-Regular',
    },
    calanderImage: {
        // marginRight: 16,
        height: 23,
        width: 20,
        tintColor: Colors.labelTextColor,
    },
    checkBtn: {
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxImg: {
        height: 20,
        width: 20,
        tintColor: Colors.checkBoxImgColor,
    },
    textStyle: {
        color: Colors.labelTextColor,
        fontSize: Helpers.getDynamicSize(14),
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '500',
    },
    cardSubSec: {
        flexDirection: 'row',
        marginTop: 5,
    },
    cardLabel: {
        fontSize: 13,
        color: Colors.labelTextColor,
        fontWeight: '400',
        marginLeft: 24,
        width: '50%',
        fontFamily: 'Poppins-Regular',
    },
    cardValue: {
        fontSize: 13,
        color: Colors.labelTextColor,
        fontWeight: '700',
        marginLeft: 24,
        width: '50%',
        fontFamily: 'Poppins-SemiBold',
    },
    headerSec: {
        padding: 16,
        borderRadius: 5,
        color: Colors.blackColor,
        backgroundColor: Colors.whiteColor,
        marginTop: 10,
        fontSize: 15,
        fontWeight: '500',
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
        height: '70%',
    },
    claimReview: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: Colors.whiteColor,
        display: 'flex',
        flexDirection: 'row',
    },
    claimReviewImg: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: {
        marginHorizontal: 16,
        marginBottom: 10,
    },
    dueDateError: {
        marginLeft: 23,
        marginBottom: 10,
        marginTop: -5,
        color: Colors.redColor,
        fontFamily: 'Poppins-Regular',
    },
});
