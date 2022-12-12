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
import CustomTextInput from "../../components/default/TextInput";
import CustomButton from "../../components/default/Buttons";
import Header from "../../components/default/Header";
import Helpers from "../../utils/Helpers";
import { useFormik } from "formik";
import LinearGradient from "react-native-linear-gradient";

function HealthCard({ navigation }) {
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
                <Header isMenu={true} rightIcon={true} rightIconImage={require("../../assets/images/Notification.png")} navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{"My "}</Text>
                    <Text style={styles.titleText2}>{"HealthCard"}</Text>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <FlatList
                    data={[1, 1]}
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
                                        <Text style={styles.infoText}>Techforce Infotech Pvt Ltd - Health Card</Text>
                                    </LinearGradient>
                                    <LinearGradient colors={['#04B2FF', '#D5E3F0']} style={styles.content} >
                                        <View style={{ width: '80%' }}>
                                            <View style={[styles.cardSubSec, { marginTop: 0 }]}>
                                                <Text style={styles.cardLabel}>{"Insured Name:"}</Text>
                                                <Text style={styles.cardValue}>{"User Name"}</Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Policy Number:"}</Text>
                                                <Text style={styles.cardValue}>
                                                    {"4016/X/202356510/02/002"}
                                                </Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"UHID Number:"}</Text>
                                                <Text style={styles.cardValue}>{"IL20414322100"}</Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Emp Id:"}</Text>
                                                <Text style={styles.cardValue}>
                                                    {"1012678"}
                                                </Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Gender:"}</Text>
                                                <Text style={styles.cardValue}>{"Male"}</Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Age:"}</Text>
                                                <Text style={[styles.cardValue]}>
                                                    {"24"}
                                                </Text>
                                            </View>
                                            <View style={styles.cardSubSec}>
                                                <Text style={styles.cardLabel}>{"Valid from:"}</Text>
                                                <Text style={styles.cardValue} numberOfLines={2}>
                                                    {"30-Nov-22 To 30-Nov-23"}
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
                                        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: '#315C84' }]}>
                                            <Text style={styles.infoText}>Download</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: '#F58315' }]}>
                                            <Text style={styles.infoText}>Claim</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </>
                        );
                    }}
                />
            </View>
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
        backgroundColor: "#F8F8F8",
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
        borderColor: "#AEB2B4",
        // paddingVertical: 15,
        marginTop: 10,
    },
    cardSubSec: {
        flexDirection: "row",
        marginTop: 5,
    },
    cardLabel: {
        fontSize: 12,
        color: "#444444",
        fontWeight: "600",
        marginLeft: 14,
        width: "30%",
    },
    cardValue: {
        fontSize: 12,
        color: "#444444",
        fontWeight: "400",
        marginLeft: 24,
        width: "50%",
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
        color: 'white',
        fontWeight: '600'
    },
    footerBtn : { 
        padding: 4, 
        width: 98, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white'
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
    }
});
