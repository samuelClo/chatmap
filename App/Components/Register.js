import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';

import auth from '@react-native-firebase/auth';

const InitWindowStyles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'black',
    },
});

const register = (email, password) => {
    console.log(email,password)
    auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error
        )
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

export default (props) => {
    const {navigation} = props;
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <>
            <Text>Register</Text>
            <View style={InitWindowStyles.root}>
                <View style={InitWindowStyles.rowContainer}>
                    <Text style={InitWindowStyles.text}>Email</Text>
                    <TextInput
                        autoCorrect={false}
                        onChangeText={text => onChangeEmail(text)}
                        value={email}
                        style={InitWindowStyles.textInput}
                    />
                </View>
                <View style={InitWindowStyles.rowContainer}>
                    <Text style={InitWindowStyles.text}>Password</Text>
                    <TextInput
                        autoCorrect={false}
                        onChangeText={text => onChangePassword(text)}
                        value={password}
                        style={InitWindowStyles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                    title="Register"
                    color="#f194ff"
                    onPress={register.bind(this, email, password)}
                />
                <Text>
                    Already registered ?
                    <Text onPress={() => navigation.navigate('Login')}>Login</Text>
                </Text>
            </View>
        </>
    );
};
