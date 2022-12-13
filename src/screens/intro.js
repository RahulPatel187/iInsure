import React from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/default/Header';

const dataIntro = [
    {
        id: 1,
        image: require("./../assets/images/Frame(2).png"),
        title: "Motor Insurance",
        desc: "Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally."
    }, {
        id: 2,
        image: require("./../assets/images/Group23.png"),
        title: "Motor Insurance",
        desc: "Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally."
    }, {
        id: 3,
        image: require("./../assets/images/Group24.png"),
        title: "Motor Insurance",
        desc: "Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally."
    }, {
        id: 4,
        image: require("./../assets/images/Group25.png"),
        title: "Motor Insurance",
        desc: "Car insurance policy is mandatory under the Motor Vehicles Act, 1988. You must have a Third-Party liability policy to drive on the road legally."
    }
]

const Intro = ({ navigation }) => {
    return (
        <>
            <ImageBackground
                source={require("./../assets/images/headerBgImg.png")}
                style={styles.headerBgImg}
            >
            </ImageBackground>
            <View style={styles.container}>
                <LinearGradient colors={['#0096C7', '#0077B6']} style={{ borderRadius: 50, margin: 10 }}>
                    <View style={{padding:10}}>
                        <FlatList
                            horizontal
                            data={dataIntro}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ width: 350, height: 450, padding: 20 }}>
                                        <Image source={item.image} style={{ width: 282, height: 184, resizeMode: 'contain', marginBottom: 20 }} />
                                        <Text style={{ fontSize: 32, fontWeight: '700', color: 'white', marginBottom: 10, textAlign: 'center' }}>{item.title}</Text>
                                        <View style={[styles.line, { maxWidth: 300, marginBottom: 10 }]} />
                                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'white', flexWrap: 'wrap', maxWidth: 300, textAlign: 'center', lineHeight: 27 }}>{item.desc}</Text>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index}
                        />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 30, paddingRight: 30, paddingBottom: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                                <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("./../assets/images/next.png")} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
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
    },
    line: {
        // flex: 1,
        height: 2,
        backgroundColor: '#FF791F'
    },
    listStyle: {
        marginTop: 5,
    },
    cardView: {
        width: "50%",
        // backgroundColor: "white",
        alignSelf: "center",
        // borderRadius: 26,
        // borderWidth: 1,
        borderColor: "#AEB2B4",
        // paddingVertical: 15,
        marginTop: 10,
    },

});