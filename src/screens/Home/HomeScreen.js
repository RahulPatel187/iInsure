import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity, View } from "react-native";
import BottomSection from "../../components/BottomSection/BottomSection";
import SafeAreaView from "../../components/SafeAreaView";
import Header from "../../components/default/Header";
import Carousel from "react-native-snap-carousel";
const { width: screenWidth } = Dimensions.get('window');

const imageData = [
  {
    image: require("../../assets/images/image11.png"),
  },
  {
    image: require("../../assets/images/image13.png"),
  },
  {
    image: require("../../assets/images/image10.png"),
  },
  {
    image: require("../../assets/images/image9.png"),
  },
  {
    image: require("../../assets/images/image12.png"),
  }
]

const HomeScreen = ({ navigation }) => {

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 10 }}>
        <Image source={item.image} style={styles.bannerImg} />
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/headerBgImg.png")}
        style={styles.headerBgImg}
      >
        <Header isMenu={true} rightIcon={true} rightIconImage={require("../../assets/images/Notificationbell.png")} navigation={navigation} />
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.headerText}>{"Hello,"}</Text>
          <Text style={styles.headerText2}>{"User long name"}</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <ScrollView>
          <Carousel layout={'default'}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth}
            data={imageData}
            renderItem={renderItem} />

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('HealthCard')}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/HealthCard.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Health Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Group.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Inquiry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Group28.png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <View style={styles.columnImgView}>
                <Image source={require("../../assets/images/Frame(1).png")} style={styles.columnImg} />
              </View>
              <Text style={styles.columntext}>About Us</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerBgImg: {
    // alignItems: "center",
    // display: 'flex'
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '84%',
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
    justifyContent: 'space-evenly', 
    // alignItems: 'center', 
    flexWrap: 'wrap',
    // marginLeft: 25,
    // marginBottom: 30,
    // marginTop: -20
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  columnImg: {
    width: 75,
    height: 60,
    resizeMode: 'contain'
  },
  columntext: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    paddingTop: 4
  },
  columnImgView: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#0384BC',
    width: 132,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 3,
  }
});