import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import Colors from '../../config/Colors';
const Indicator = (props) => {


    if (props.showLoader) {
        return (
            <View style={styles.loading}>
                <DotIndicator color={Colors.headerColor} size={10} />
                {/* <BallIndicator color='blue' />
                <BarIndicator color='blue' />
                <MaterialIndicator color='blue' />
                <PacmanIndicator color='blue' />
                <PulseIndicator color='blue' />
                <SkypeIndicator color='blue' />
                <UIActivityIndicator color='blue' />
                <WaveIndicator color='blue' /> */}
            </View>
        )
    }
    else {
        return null
    }



}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
})

export default Indicator