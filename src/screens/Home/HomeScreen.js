import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSection from "../../components/BottomSection/BottomSection";
import SafeAreaView from "../../components/SafeAreaView";
import Header from "../../components/Header";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header navigation={navigation} />
        <Text style={styles.headerText}>{"Hello,"}</Text>
        <Text style={styles.headerText2}>{"User long name"}</Text>
      </ImageBackground>

      <View style={styles.container}>
        <ScrollView horizontal style={{ height: 240, marginTop: 10 }} showsHorizontalScrollIndicator={false}>
          <View style={{ padding: 10 }}>
            <Image source={require("../../assets/images/image11.png")} style={styles.bannerImg} />
          </View>
          <View style={{ padding: 10 }}>
            <Image source={require("../../assets/images/image13.png")} style={styles.bannerImg} />
          </View>
          <View style={{ padding: 10 }}>
            <Image source={require("../../assets/images/image10.png")} style={styles.bannerImg} />
          </View>
          <View style={{ padding: 10 }}>
            <Image source={require("../../assets/images/image9.png")} style={styles.bannerImg} />
          </View>
          <View style={{ padding: 10 }}>
            <Image source={require("../../assets/images/image12.png")} style={styles.bannerImg} />
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('HealthCard')}>
            <Image source={require("../../assets/images/Group17.png")} style={styles.columnImg} />
            <Text style={styles.columntext}>Health Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Image source={require("../../assets/images/Group18.png")} style={styles.columnImg} />
            <Text style={styles.columntext}>Inquiry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Image source={require("../../assets/images/Group16.png")} style={styles.columnImg} />
            <Text style={styles.columntext}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Image source={require("../../assets/images/Group15.png")} style={styles.columnImg} />
            <Text style={styles.columntext}>About Us</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '80%',
    position: 'absolute',
    bottom: 0
  },
  headerSec: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 25, 
    fontWeight: '300', 
    color: '#FFFFFF' 
  },
  headerText2: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 25, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
  bannerImg: { 
    height: 270, 
    resizeMode: 'stretch' 
  },
  bottomContainer: { 
    display: 'flex', 
    flexDirection: 'row', 
    // justifyContent: 'center', 
    // alignItems: 'center', 
    flexWrap: 'wrap',
    marginLeft: 25,
    marginBottom: 30,
    marginTop: -20
  },
  column: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 10, 
    paddingLeft: 25, 
  },
  columnImg: { 
    width: 132, 
    height: 90, 
    resizeMode: 'contain' 
  },
  columntext: { 
    fontSize: 14, 
    fontWeight: '400', 
    color: 'black' 
  },
});