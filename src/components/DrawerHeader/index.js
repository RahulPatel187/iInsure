import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const DrawerHeader = (props) => {
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigation.toggleDrawer();
    };

    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingTop: 20 }}>
            <TouchableOpacity
                style={styles.backIconBtn}
                onPress={() => toggleDrawer()}
            >
                <Image
                    source={require("../../assets/images/leftArrowmenu.png")}
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.noteIconBtn}
            >
                <Image
                    source={require("../../assets/images/Notification.png")}
                    style={styles.noteIcon}
                />
            </TouchableOpacity>
        </View>
    );
}

export default DrawerHeader;

const styles = StyleSheet.create({
    backIconBtn: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        left: 5,
      },
      backIcon: {
        height: 24,
        width: 24,
      },
      noteIconBtn: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        right: 5,
      },
      noteIcon: {
        height: 24,
        width: 24,
      },
})