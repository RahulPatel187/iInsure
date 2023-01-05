import React, {useState, forwardRef} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';

const TextInputCustom = forwardRef(({onChangeText, value, ...props}, ref) => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    props.showPasswordIcon ? props.showPasswordIcon : false,
  );
  const changePwdType = () => {
    setSecureTextEntry(prevState => !prevState);
  };
  const {containerStyle, showIcon} = props;

  return (
    <View>
      <View
        style={[
          styles.container,
          props.containerStyle ? containerStyle : null,
          !props.textStyle && {
            borderWidth: 1,
            borderColor: '#C7C7C7',
            borderRadius: RFValue(10),
            backgroundColor: Colors.whiteColor,
          },
        ]}>
        {showIcon && <Image source={props.icon} style={styles.iconStyle} />}
        <TextInput
          ref={ref}
          style={[
            props.textStyle ? props.textStyle : styles.textInput,
            props.showPasswordIcon ? {marginEnd: 35} : null,
            showIcon && {borderWidth: 0, borderColor: 'white'},
            props.placeholder === 'Enter Your Summary' && {
              textAlignVertical: 'top',
              borderRadius: 5,
            },
            {width: '90%'},
          ]}
          onChangeText={text => onChangeText(text)}
          value={value}
          keyboardType={props.type || 'default'}
          secureTextEntry={secureTextEntry}
          {...props}
          placeholderTextColor={'#C7C7C7'}
        />
        {props.showPasswordIcon ? (
          <TouchableOpacity
            onPress={() => {
              changePwdType();
            }}
            style={styles.showHidePassword}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Image
              source={
                secureTextEntry
                  ? require('../../assets/images/ic_hide_password.png')
                  : require('../../assets/images/ic_show_password.png')
              }
              style={styles.showHideIconStyle}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.errors ? (
        <Text style={styles.errorStyle}>{props.errors}</Text>
      ) : null}
    </View>
  );
});

export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    shadowColor: '#000',
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#ffffff',
    // marginTop: 5,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
  },
  errorStyle: {
    margin: RFValue(5),
    color: Colors.redColor,
    fontFamily: 'Poppins-Regular',
  },
  showHidePassword: {
    position: 'absolute',
    right: RFValue(10),
    justifyContent: 'center',
    height: RFValue(50),
  },
  showHideIconStyle: {
    marginStart: 16,
    height: RFValue(20),
    width: RFValue(20),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  iconStyle: {
    marginStart: 16,
    height: RFValue(20),
    width: RFValue(20),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
