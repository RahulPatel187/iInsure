import React, { useState, useRef } from "react";
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
} from "react-native";
import moment from "moment";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { useFormik } from "formik";
import CustomAlertDialog from "../../components/default/CustomAlertDialog";
// import * as Yup from "yup";
import axiosPostClient from "../../api/ApiClient";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { format } from "date-fns";
// import messaging from "@react-native-firebase/messaging";
import SafeAreaView from "../../components/default/SafeAreaView";
import Header from "../../components/default/Header";
import Helpers from "../../utils/Helpers";
import Colors from "../../config/Colors";
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import Constant from "../../utils/Constant";
// import DropDownComponent from "../../components/default/DropDownComponent";
import Indicator from "../../components/default/Indicator";

var reminderArray = [
    {
        title: "Remind before 1 week",
        id: 1,
    },
    {
        title: "Remind before 2 week",
        id: 2,
    },
    {
        title: "Remind before 1 month",
        id: 3,
    },
];

function Reminder({ navigation }) {
    const nameRef = useRef(null);
    const policyNumberRef = useRef(null);
    const amt = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [expiryDateError, setExpiryDateError] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibile] = useState(false);
    const [checkedBox, setCheckedBox] = useState([true]);
    const [refresh, setRefresh] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isSessionExpired, setSessionExpired] = useState(false);
    const [reminderList, setReminderList] = useState(reminderArray);
    const notificationCount = useSelector((state) => state.login.notificationCount);

    const dispatch = useDispatch();

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
                errors.name = "Caption name is required";
            }
            //else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address';
            // }
            if (!values.policyNo) {
                errors.policyNo = "Policy number is required";
            }

            if (!values.amt) {
                errors.amt = "Premium Amount is required";
            }
            if (!values.dueDate) {
                errors.dueDate = "Due date is required";
            }
            return errors;
        },
        validateOnChange: false,
        //initialValues: { firstName: '', lastName: '', phoneNumber: '', email: '' },
        initialValues: { name: "", policyNo: "", dueDate: "" },
        onSubmit: (values) => {
            if (checkedBox.includes(true) === false) {
                console.log("1");
                return;
                // errors.dueDate = "Due date is required";
            }
            //   callApi(values);
        },
    });

    const callApi = async () => {
        setLoading(true);
        const userId = await Helpers.getFromPref(Constant.PREF_USER_ID, "");
        const access_token = await Helpers.getFromPref(
            Constant.PREF_ACCESS_TOKEN,
            ""
        );
        let finalTimeArray = [];
        for (let i in checkedBox) {
            if (checkedBox[i] === true) {
                if (i == 0) {
                    finalTimeArray.splice(i, 0, "1week");
                } else if (i == 1) {
                    finalTimeArray.splice(i, 0, "2week");
                } else if (i == 2) {
                    finalTimeArray.splice(i, 0, "1month");
                }
            }
        }
        let params = {
            user_id: userId || "225",
            access_token: access_token || "w9D2jwu0XT",
            caption_name: values.name || "test",
            policy_number: values.policyNo || "4016/X/202356510/02/000",
            amount: values.amt || "22",
            due_date:
                (values.dueDate && moment(values.dueDate).format("DD-MM-yy")) ||
                "21-02-22",
            duration:
                (finalTimeArray.length > 0 && finalTimeArray.join(" , ")) ||
                "1week , 2week",
        };
        console.log("params", params);
        axiosPostClient()
            .post(Constant.API_SEND_REMINDERS, params)
            .then((response) => {
                console.log("response", response?.data);
                setLoading(false);
                if (response?.data && response?.data?.status == 200) {
                    setShowErrorDialog(true);
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
                console.log("error", error);
                setLoading(false);
                setShowErrorDialog(true);
            });
    };

    const showDatePicker = () => {
        setDatePickerVisibile(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibile(false);
    };

    const handleConfirm = async (date) => {
        let finalDaysCnt = await getDateDiff(values.dueDate);
        if (finalDaysCnt < 14) {
            checkedBox[1] = false;
        }
        if (finalDaysCnt < 30) {
            checkedBox[2] = false;
        }
        setFieldValue("dueDate", date);
        setIsDateSelected(true);
        hideDatePicker();
    };

    const getDateDiff = (date) => {
        let finalDaysCntX = null;
        if (date) {
            let selectedDate = moment(date).format("MM/DD/yyyy");
            console.log('selectedDate', selectedDate);
            var liveDate = new Date().getTime();
            var futureMonth = new Date(date).getTime();
            console.log('futureMonth', futureMonth);
            var Difference_In_Time = futureMonth - liveDate;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            finalDaysCntX = Difference_In_Days.toString().split(".")[0];
        }
        console.log("finalDaysCnt", finalDaysCntX);
        return finalDaysCntX;
    };

    const renderItem = (item, index) => {
        console.log('values.dueDate', values.dueDate);
        let finalDaysCnt = getDateDiff(values.dueDate);
        console.log("finalDaysCnt", finalDaysCnt);
        return (
            <View
                style={[styles.checkedBoxView,
                    index === 0 && { marginTop: 20 },
                ]}
                key={index}
            >
                <View
                    style={styles.checkedBoxViewRow}
                >
                    <Text
                        style={{
                            color: Colors.blackColor,
                        }}
                    >
                        {item.title}
                    </Text>
                    <TouchableOpacity
                        style={styles.checkBtn}
                        disabled={
                            (index === 1 && finalDaysCnt < 14) ||
                            (index === 2 && finalDaysCnt < 30)
                        }
                        onPress={() => {
                            checkedBox[index] = !checkedBox[index];
                            console.log("checkedBox", checkedBox);
                            setCheckedBox(checkedBox);
                            setRefresh(!refresh);
                        }}
                    >
                        <Image
                            style={styles.checkBoxImg}
                            source={
                                checkedBox[index]
                                    ? require("../../assets/images/checkbox.png")
                                    : require("../../assets/images/checkbox-empty.png")
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <>
            {/* // <SafeAreaView> */}
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header isMenu={true} rightIcon={true} notificationCnt={notificationCount ? notificationCount : null} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"My "}</Text>
                    <Text style={styles.titleText2}>{"Reminder"}</Text>
                </View>
            </ImageBackground>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardViewStyle}
                showsVerticalScrollIndicator={false}
                style={styles.keyboardStyle}>
                {/* <View
                    style={{
                        // flex: 1,
                    }}
                > */}
                {/* <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                > */}
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 16, marginTop: 12 }}>
                        <Text style={styles.textStyle}>Caption Name</Text>
                        <CustomTextInput
                            ref={nameRef}
                            placeholder="Enter Your Caption Name"
                            onChangeText={handleChange("name")}
                            value={values.name}
                            returnKeyType="next"
                            onSubmitEditing={() => policyNumberRef.current?.focus()}
                            showPasswordIcon={false}
                            errors={errors.name}
                        />
                    </View>
                    <View style={{ marginHorizontal: 16 }}>
                        <Text style={styles.textStyle}>Policy Number</Text>
                        <CustomTextInput
                            ref={policyNumberRef}
                            placeholder="Enter Your Policy Number"
                            onChangeText={handleChange("policyNo")}
                            value={values.policyNo}
                            returnKeyType="next"
                            onSubmitEditing={() => showDatePicker()}
                            showPasswordIcon={false}
                            errors={errors.policyNo}
                        />
                    </View>
                    <View style={{ marginHorizontal: 16 }}>
                        <Text style={styles.textStyle}>Premium Amount</Text>
                        <CustomTextInput
                            ref={amt}
                            placeholder="Enter Your Premium Amount"
                            onChangeText={handleChange("amt")}
                            value={values.amt}
                            type={"decimal-pad"}
                            returnKeyType="next"
                            onSubmitEditing={() => showDatePicker()}
                            showPasswordIcon={false}
                            errors={errors.amt}
                        />
                    </View>
                    <Text style={[styles.textStyle, { marginHorizontal: 16 }]}>
                        Due Date
                    </Text>
                    <Pressable onPress={() => showDatePicker()} style={styles.buttonExpiryDate}>
                        <Text
                            style={
                                isDateSelected
                                    ? styles.textSelectedExpiryDate
                                    : styles.textUnSelectedExpiryDate
                            }
                        >
                            {`Due Date: ${values.dueDate && moment(values.dueDate).format("DD-MM-yyyy")
                                }`}
                        </Text>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            headerTextIOS="Due Date"
                            minimumDate={new Date()}
                        />
                        <Image
                            style={styles.calanderImage}
                            source={require("../../assets/images/cal.png")}
                        />
                    </Pressable>
                    {errors.dueDate ? (
                        <Text
                            style={{ marginLeft: 23, marginTop: 5, color: Colors.redColor }}
                        >
                            {errors.dueDate}
                        </Text>
                    ) : null}

                    {reminderList && reminderList.length > 0
                        ? reminderList.map((item, index) => {
                            return renderItem(item, index);
                        })
                        : null}
                    {!checkedBox.includes(true) ? (
                        <Text
                            style={{ margin: 16, marginTop: 0, color: Colors.redColor }}
                        >
                            {"At least select 1 reminder"}
                        </Text>
                    ) : null}
                    <CustomButton
                        text={"Submit"}
                        isLarge={true}
                        onPress={() => {
                            Keyboard.dismiss();
                            handleSubmit();
                        }}
                    />
                </View>
                {/* </KeyboardAwareScrollView> */}
                <Indicator showLoader={isLoading} />
                <CustomAlertDialog
                    visible={showErrorDialog || isSessionExpired}
                    onCloseDialog={() => {
                        if (isSessionExpired) {
                            setSessionExpired(false);
                            proceedLogout();
                        } else {
                            setShowErrorDialog(false);
                            navigation.goBack();
                        }
                    }}
                    description={"Reminder set successfully."}
                />
                {/* </View> */}
            </KeyboardAwareScrollView>
            {/* </SafeAreaView> */}
        </>
    );
}
export default Reminder;

const styles = StyleSheet.create({
    headerBgImg: {
        width: "100%",
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingBottom: 40,
    },
    container: {
        height: "87%",
        width: "100%",
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
    selectedTypeTextColor: {
        color: Colors.blackColor,
    },
    unSelectedTypeTextColor: {
        color: Colors.grayColor,
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
        fontFamily: "Roboto-Regular",
        borderColor: Colors.grayColor,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Colors.unSelectTextColor
    },
    textUnSelectedExpiryDate: {
        // marginLeft: 16,
        color: Colors.grayColor,
    },
    textSelectedExpiryDate: {
        // marginLeft: 16,
        color: Colors.blackColor,
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
        alignItems: "center",
        justifyContent: "center",
    },
    checkBoxImg: {
        height: 20,
        width: 20,
        tintColor: Colors.titleTextColor,
    },
    textStyle: {
        color: Colors.labelTextColor,
        fontSize: Helpers.getDynamicSize(14),
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "700",
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
    checkedBoxView: {
        width: "100%",
        height: 38,
        justifyContent: "center",
    },
    checkedBoxViewRow: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 20,
    }
});
