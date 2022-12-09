import React, { useState } from "react";
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
import SafeAreaView from "../../components/SafeAreaView";

function NotificationListScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            <ImageBackground
                source={require("../../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header isMenu={true} rightIcon={true} rightIconImage={require("../../assets/images/Notification.png")} navigation={navigation} />
                <Text style={styles.titleTxt}>{"My Notifications"}</Text>
                <View style={styles.mainSection}>
                    <FlatList
                        data={[1, 1]}
                        style={styles.listStyle}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        style={[
                                            styles.cardView,
                                            index === 2 && { marginBottom: 40 },
                                        ]}
                                        onPress={() => {
                                            navigation.navigate("RemindersList");
                                        }}
                                    >
                                        <View style={[styles.cardSubSec, { marginTop: 0 }]}>
                                            <Text style={styles.cardLabel}>{"Inquiry Status"}</Text>
                                            <Text style={styles.cardValue}>{"08-Nov-22"}</Text>
                                        </View>
                                        <Text style={[styles.cardValue, { width: '100%', marginLeft: 10, marginTop: 5, lineHeight: 20 }]}>{"User name, Your inquiry is now in Under Proccess and will be resolved in 2 working days!"}</Text>
                                    </TouchableOpacity>
                                </>
                            );
                        }}
                    />
                </View>
            </ImageBackground>
        </>
    );
}
export default NotificationListScreen;

const styles = StyleSheet.create({
    headerBgImg: {
        // alignItems: "center",
        flex: 1,
        paddingBottom: 20,
    },
    mainSection: {
        height: "88%",
        width: "100%",
        backgroundColor: "#F8F8F8",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    headerSec: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    backBtn: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    backImg: {
        height: 23,
        width: 18,
    },
    notificationImg: {
        height: 28,
        width: 21,
    },
    titleTxt: {
        textAlign: "center",
        fontSize: 25,
        color: "white",
        fontWeight: "600",
        marginTop: -10,
    },
    cardView: {
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "#AEB2B4",
        paddingVertical: 10,
        marginTop: 10,
    },
    cardSubSec: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10
        // width: '100%'
    },
    cardLabel: {
        fontSize: 14,
        color: "#444444",
        fontWeight: "600",
        // marginLeft: 24,
        // width: "30%",
        paddingLeft: 10,
        paddingRight: 10
    },
    cardValue: {
        fontSize: 13,
        color: "#444444",
        fontWeight: "400",
        // marginLeft: 24,
        // width: "50%",
        paddingLeft: 10,
        paddingRight: 10
    },
    listStyle: {
        marginTop: 5,
    },
});
