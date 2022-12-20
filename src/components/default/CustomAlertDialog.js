import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal
} from 'react-native';
import CustomButton from './Buttons';
import Helpers from '../../utils/Helpers';

function CustomAlertDialog(props) {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                props.onCloseDialog()
            }}

        >
            <View style={styles.container}>

                <View style={{
                    width: "100%"
                }}>
                    <View style={styles.subContainerStyle}>
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            fontSize: Helpers.getDynamicSize(18),
                            marginTop: 16
                        }}>{props.description}</Text>

                        <View style={{
                            marginTop: 24
                        }}>
                            <CustomButton text={'OK'} onPress={() => {
                                props.onCloseDialog()
                                //  handleSubmit()
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

export default CustomAlertDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    subContainerStyle: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 16
    },

});