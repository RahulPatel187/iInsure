import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';

import Colors from '../../config/Colors';

export default props => (
    <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.headerColor }} />
        <SafeAreaView style={styles.safeAreaStyle} {...props} >
            <StatusBar barStyle="dark-content" backgroundColor={Colors.headerColor} />
            {props.children}
        </SafeAreaView>
    </>
);
const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    }
});