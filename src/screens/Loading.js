import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';
import SafeAreaView from '../components/default/SafeAreaView';
import Colors from '../config/Colors';

const Loading = ({navigation}) => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Intro'}],
      });
    }, 2000);
  }, []);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
  });

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./../assets/images/headerBgImg.png')}
        style={styles.headerBgImg}>
        <Image
          source={require('./../assets/images/Framelogo.png')}
          style={styles.logoImg}
        />
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                height: 10,
                width: '100%',
                borderRadius: 60,
                backgroundColor: Colors.introLineColor,
                borderWidth: 2,
                borderColor: Colors.whiteColor,
              },
            ]}
          />
        </View>
        <Text style={styles.loadingTxt}>{'L O A D I N G ...'}</Text>
        <View style={styles.container}>
          <Image
            source={require('./../assets/images/techForce.png')}
            style={styles.logoImg1}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  headerBgImg: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: 292,
    height: 200,
    resizeMode: 'contain',
  },
  logoImg1: {
    width: 154,
    height: 44,
    resizeMode: 'contain',
  },
  progressBar: {
    height: 15,
    flexDirection: 'row',
    width: '65%',
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.blackColor,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  container: {
    // backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '4%',
    bottom: 40,
    position: 'absolute',
  },
  loadingTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.whiteColor,
    fontFamily: 'Poppins-SemiBold'
  },
});
