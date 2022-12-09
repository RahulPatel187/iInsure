import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
    View, Text, TouchableOpacity, Image, Platform,
    PermissionsAndroid,
    TouchableHighlight, StyleSheet
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import Helpers from '../../utils/Helpers';
import ModalDropdown from './ModalDropDown';
import Colors from '../../config/Colors';

/**
 *
 * check github example of react-native-modal-dropdown
 * https://github.com/siemiatj/react-native-modal-dropdown/tree/32fac1524a2f0565a42656407d2dd4dcbffec11d
 */

const DropDownComponent = forwardRef((props, ref) => {
    const { textTitleStyle } = props;

    return (
        <View style={{margin: 8}}>
            <ModalDropdown
                ref={ref}
                options={props.filterOption}
                adjustsFontSizeToFit={true}
                style={{
                    borderRadius: 30,
                    backgroundColor: Colors.secondaryInputBackgroundColor,
                    height: Helpers.getDynamicSize(50),
                }}
                textStyle={[styles.textTitleStyle, props.textTitleStyle ? textTitleStyle : null]}
                renderRow={(option, index, isSelected) => {
                    return (
                        <TouchableHighlight onPress={() => {
                            props.onSelected(index)
                        }}>
                            <View style={{
                                height: 50,
                                backgroundColor: Colors.whiteColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 2,
                            }}>
                                <Text style={{
                                    color: Colors.blackColor
                                }}>{option}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                }}
                dropdownStyle={{
                    // marginTop: 20,
                    height: 200,
                    // marginTop: 20
                }}
                isFullWidth={true}
                defaultIndex={-1}
                defaultValue={props.filterOption[0]}
                renderSeparator={() => {
                    return (
                        <View style={{
                            height: 0.5,
                            backgroundColor: Colors.blackColor
                        }}>
                        </View>
                    )
                }}
                renderRightComponent={() => {
                    return (
                        <Image source={require('../../assets/asset/ic_down.png')}
                            style={{
                                width: 20,
                                height: 20,
                                // margin: 5
                            }} />
                    )
                }}
            />
        </View>
    );
})

export default DropDownComponent;

const styles = StyleSheet.create({
    textTitleStyle: {
        height: Helpers.getDynamicSize(50),
        width: '90%',
        paddingStart: 16,
        fontSize: RFValue(13),
        textAlignVertical: 'center',
        color: Colors.grayColor,
        ...Platform.select({
            ios: {
                lineHeight: 50 // as same as height
            },
            android: {}
        })
    }
});