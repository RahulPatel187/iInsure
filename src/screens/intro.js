import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../config/Colors';

const { width: screenWidth } = Dimensions.get('window');

const dataIntro = [
  {
    id: 1,
    image: require('./../assets/images/Frame(2).png'),
    title: 'Motor Insurance',
    desc: 'Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally.',
  },
  {
    id: 2,
    image: require('./../assets/images/Group23.png'),
    title: 'Motor Insurance',
    desc: 'Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally.',
  },
  {
    id: 3,
    image: require('./../assets/images/Group24.png'),
    title: 'Motor Insurance',
    desc: 'Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally.',
  },
  {
    id: 4,
    image: require('./../assets/images/Group25.png'),
    title: 'Motor Insurance',
    desc: 'Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally.',
  },
];

const Intro = ({ navigation }) => {
  let flatListRef = useRef();
  const [listIndex, setListIndex] = useState(1);
  function scrollTheList(index) {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: index });
    }
  }
  return (
    <>
      {/* <ImageBackground
        source={require('./../assets/images/headerBgImg.png')}
        style={styles.headerBgImg}></ImageBackground> */}
      <View style={styles.container}>
        {/* <LinearGradient
          colors={['#0096C7', '#0077B6']}
          style={styles.slide}
          > */}
        <View style={{ padding: 15 }}>
          <FlatList
            horizontal
            ref={flatListRef}
            scrollEnabled={false}
            data={dataIntro}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.imageView}>
                  <Image
                    source={item.image}
                    style={styles.img}
                  />
                  <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal
                    ref={flatListRef}
                    scrollEnabled={false}
                    data={dataIntro}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      <View
                        style={[styles.line, { maxWidth: 50, marginBottom: 10 }]}
                      />
                    }}
                    keyExtractor={(item, index) => index+2}
                    ListFooterComponent={() => { }}
                  />
                  {dataIntro.map((data) => (
                    <View
                      style={[styles.line, { maxWidth: 50, marginBottom: 10 }]}
                    />
                  ))}
                  </View>
                  <Text
                    style={styles.imgTitle}>
                    {item.title}
                  </Text>
                  {/* <View
                    style={[styles.line, { maxWidth: 300, marginBottom: 10 }]}
                  /> */}
                  <Text
                    style={styles.imgDesc}>
                    {item.desc}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
            ListFooterComponent={() => { }}
          />
          <View
            style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Drawer' }],
                });
              }}>
              <Text style={styles.skip}>
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                scrollTheList(listIndex);
                if(listIndex === 3){
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Drawer' }],
                  });
                }
                setListIndex(listIndex === 3 ? 0 : listIndex + 1);
              }}>
              {/* <Image
                  source={require('./../assets/images/next.png')}
                  style={styles.nextImg}
                /> */}
              <LinearGradient
                colors={['#0096C7', '#0077B6']}
                style={styles.slide}
              >
                <Text style={styles.next}>
                  Next
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* </LinearGradient> */}
      </View>
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  headerBgImg: {
    width: '100%',
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingBottom: 20,
  },
  container: {
    backgroundColor: Colors.containerColor,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    paddingTop: 20,
  },
  heartImg: {
    width: 95,
    height: 110,
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  },
  line: {
    // flex: 1,
    height: 4,
    backgroundColor: Colors.introLineColor,
  },
  listStyle: {
    marginTop: 5,
  },
  cardView: {
    width: '50%',
    // backgroundColor: "white",
    alignSelf: 'center',
    // borderRadius: 26,
    // borderWidth: 1,
    borderColor: Colors.cardBorder,
    // paddingVertical: 15,
    marginTop: 10,
  },
  slide: {
    borderRadius: 10,
    // margin: 10,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25
  },
  imageView: {
    width: screenWidth,
    padding: 20
  },
  img: {
    width: 340,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  imgTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.blackColor,
    marginBottom: 10,
    textAlign: 'left',
  },
  imgDesc: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.blackColor,
    flexWrap: 'wrap',
    maxWidth: 300,
    textAlign: 'left',
    lineHeight: 27,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
  },
  skip: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.blackColor
  },
  next: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.whiteColor
  },
  nextImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  }
});
