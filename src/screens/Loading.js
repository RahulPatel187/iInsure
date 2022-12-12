import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View, Animated } from 'react-native';
import SafeAreaView from '../components/default/SafeAreaView';

const Loading = ({ navigation }) => {
    const counter = useRef(new Animated.Value(0)).current;
    const countInterval = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
        return () => {
            clearInterval(countInterval);
        };
    }, []);

    useEffect(() => {
        load(count)
        if (count >= 100) {
            setCount(100);
            clearInterval(countInterval);
            navigation.navigate('Intro')
        }
    }, [count]);

    const load = (count) => {
        Animated.timing(counter, {
            toValue: count,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const width = counter.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100]
    })

    return (
        <SafeAreaView>
            <ImageBackground
                source={require("./../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Image source={require("./../assets/images/Framelogo.png")} style={styles.logoImg} />
                <View style={styles.progressBar}>
                    <Animated.View
                        style={
                            [{
                                ...StyleSheet.absoluteFillObject,
                                width: '100%',
                                height: 10,
                                borderRadius: 15,
                                backgroundColor: 'green'
                            },
                            {
                                transform: [{
                                    scaleX: width
                                }]
                            }]
                        } />
                </View>
                <View style={styles.container}>
                    <Image source={require("./../assets/images/techForce.png")} style={styles.logoImg1} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Loading;

const styles = StyleSheet.create({
    headerBgImg: {
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        height: 20,
        margin: 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 50,
    },
    container: {
        // backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '4%',
        bottom: 0
    },
});