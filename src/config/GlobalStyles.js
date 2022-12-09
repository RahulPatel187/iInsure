import { StyleSheet } from "react-native";
import Helpers from "../utils/Helpers";

import Colors from "./Colors";

export default StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    noDataFoundStyle: {
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(18)
    }
});