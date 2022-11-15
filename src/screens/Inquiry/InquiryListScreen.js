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
import Header from "../../components/Header";
import SafeAreaView from "../../components/SafeAreaView";

function InquiryListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header />
        <Text style={styles.titleTxt}>{"My Inquiries"}</Text>
        <View style={styles.mainSection}>
          <FlatList
            data={[1, 1, 1]}
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
                      <Text style={styles.cardLabel}>{"Inquiry Date:"}</Text>
                      <Text style={styles.cardValue}>{"08-Nov-22"}</Text>
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
                      <Text style={styles.cardLabel}>{"Email:"}</Text>
                      <Text style={styles.cardValue}>
                        {"user@techforceglobal.com"}
                      </Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Resolved in:"}</Text>
                      <Text style={styles.cardValue}>{"-"}</Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Status:"}</Text>
                      <Text style={[styles.cardValue, { color: "#0DA600" }]}>
                        {"Completed"}
                      </Text>
                    </View>
                    <View style={styles.cardSubSec}>
                      <Text style={styles.cardLabel}>{"Summary:"}</Text>
                      <Text style={styles.cardValue} numberOfLines={2}>
                        {"szgewet ctvesrtesysxdgdrhdh hsdhjds dshgdhsg"}
                      </Text>
                    </View>
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
export default InquiryListScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 20,
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
    paddingVertical: 15,
    marginTop: 10,
  },
  cardSubSec: {
    flexDirection: "row",
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: "#444444",
    fontWeight: "600",
    marginLeft: 24,
    width: "30%",
  },
  cardValue: {
    fontSize: 13,
    color: "#444444",
    fontWeight: "400",
    marginLeft: 24,
    width: "50%",
  },
  listStyle: {
    marginTop: 5,
  },
});
