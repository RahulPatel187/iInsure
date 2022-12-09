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
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import Header from "../../components/Header";
import Helpers from "../../utils/Helpers";
import { useFormik } from "formik";

function Inquiry({ navigation }) {
    const emailRef = useRef(null);
    const policyNumberRef = useRef(null);
    const uhidRef = useRef(null);
    const summaryRef = useRef(null);

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

    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"My "}</Text>
                    <Text style={styles.titleText2}>{"Inquiry"}</Text>
                </View>
            </ImageBackground>
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
                        returnKeyType="next"
                        multiline={true} numberOfLines={4}
                        showPasswordIcon={false}
                        errors={errors.summary}
                    />
                </View>
                <CustomButton
                    text={"SUBMIT"}
                    isLarge={true}
                    onPress={() => {
                        Keyboard.dismiss();
                        handleSubmit();
                    }}
                />
            </View>
        </>
    );
}
export default Inquiry;

const styles = StyleSheet.create({
    headerBgImg: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingVertical: 20,
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
        height: '80%'
    },
    textStyle: {
        color: "#444444",
        fontSize: Helpers.getDynamicSize(14),
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
        fontWeight: "500",
        marginTop: 10,
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
        marginTop: 10
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
