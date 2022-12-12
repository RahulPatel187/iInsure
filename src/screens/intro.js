import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/default/Header';

const Intro = ({ navigation }) => {
    return (
        <>
            <ImageBackground
                source={require("./../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
                <Header isMenu={true} rightIcon={true} rightIconImage={require("./../assets/images/Notification.png")} navigation={navigation} />
            </ImageBackground>
            <View style={styles.container}>
                <LinearGradient colors={['#0096C7', '#0077B6']} style={{ borderRadius: 50 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                            <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("./../assets/images/next.png")} style={{width: 18, height: 18, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </>
    )
}

export default Intro;

const styles = StyleSheet.create({
    headerBgImg: {
        width: "100%",
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingBottom: 20,
    },
    container: {
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        // justifyContent: 'center',
        // alignItems: 'center',
        bottom: 0,
        padding: 10,
        width: '100%',
        height: '90%'
    },
    heartImg: {
        width: 95,
        height: 110,
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
    }

});