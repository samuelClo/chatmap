import {View, StyleSheet, TextInput, Text} from "react-native"
import React from "react"

import globalStyle from "../assets/style/globalStyle"

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 15,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 200,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    error: {
        marginLeft: 16,
    }
})

export default (props) => {
    const {
        placeholder,
        keyboardType,
        onChangeText,
        isAutoFocus,
        value,
        secureTextEntry,
        error,
    } = props;

    return (
        <View style={styles.wrapper}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    underlineColorAndroid='transparent'
                    onChangeText={onChangeText}
                    autoFocus={isAutoFocus}
                    value={value}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <Text style={{...globalStyle.error, ...styles.error}}>
                {error}
            </Text>
        </View>
    )
}
