import React, { useState, useEffect } from "react";
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
import Header from "../../components/Header";

function GetAQuote({ navigation }) {
    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header navigation={navigation} />
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
                <TextInput style={styles.textInput} placeholder={'Enter Your Full Name'} />
                <Text style={styles.titleTxt}>
                    {
                        "Your Email"
                    }
                </Text>
                <TextInput style={styles.textInput} placeholder={'Enter Your Email'} />
                <Text style={styles.titleTxt}>
                    {
                        "Your Summary"
                    }
                </Text>
                <TextInput style={styles.textInput} multiline={true} numberOfLines={4} placeholder={'Enter Your Full Name'} />
                <Text style={styles.titleTxt}>
                    {
                        "Your Mobile Number"
                    }
                </Text>
                <TextInput style={styles.textInput} placeholder={'Enter Your Mobile Number'} />
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => {
                        navigation.navigate("Drawer");
                    }}
                >
                    <Text style={styles.loginBtnTxt}>{"Submit"}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
export default GetAQuote;

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
