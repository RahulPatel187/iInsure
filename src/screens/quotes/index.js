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
} from "react-native";
import Header from "../../components/default/Header";
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import { useFormik } from "formik";

function GetAQuote({ navigation }) {
    const emailRef = useRef(null);
    const mobileNumberRef = useRef(null);
    const typeofInsuranceRef = useRef(null);
    const nameRef = useRef(null);

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
            if (!values.policyNo) {
                errors.policyNo = "Mobile number is required";
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
            if (checkedBox.includes(true) === false) {
                console.log("1");
                return;
                // errors.dueDate = "Due date is required";
            }
            //   callApi(values);
        },
    });
    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header isMenu={true} rightIcon={true} rightIconImage={require("../../assets/images/Notification.png")} navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"Get A "}</Text>
                    <Text style={styles.titleText2}>{"Quote"}</Text>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <Text style={styles.titleTxt}>
                    {
                        "Your Full Name"
                    }
                </Text>
                <CustomTextInput
                    ref={nameRef}
                    placeholder="Enter Your Full Name"
                    onChangeText={handleChange("fullName")}
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
                    onChangeText={handleChange("insuranceType")}
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
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
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
        color: "#444444",
        fontWeight: "500",
        // textAlign: "center",
        marginTop: 10,
    },
    loginBtn: {
        width: "90%",
        height: 50,
        alignSelf: "center",
        backgroundColor: "#F6861A",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 25,
        marginBottom: 15,
        shadowColor: "#000",
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
        color: "#FFF",
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
        color: '#FFFFFF'
    },
    titleText2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    textInput: {
        padding: 10,
        borderRadius: 5,
        color: 'black',
        backgroundColor: '#ffffff',
        marginTop: 5,
        fontSize: 15,
        fontWeight: '500'
    },
});
