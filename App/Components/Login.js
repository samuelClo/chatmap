import React, {Component} from 'react';
import {formStyleheet, TextInput, View, Text, Button, Image, TouchableHighlight} from 'react-native';

import auth from '@react-native-firebase/auth';
import formStyle from './formStyle'

const login = (email, password) => {
    auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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
        <View style={formStyle.container}>
            <View style={formStyle.inputContainer}>
                <TextInput style={formStyle.inputs}
                           placeholder="Email"
                           keyboardType="email-address"
                           underlineColorAndroid='transparent'
                           onChangeText={text => onChangeEmail(text)}
                           autoFocus
                           value={email}
                />
            </View>
            <View style={formStyle.inputContainer}>
                <TextInput style={formStyle.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           onChangeText={text => onChangePassword(text)}
                           value={password}
                />
            </View>
            <TouchableHighlight style={[formStyle.buttonContainer, formStyle.loginButton]} onPress={login.bind(this, email, password)}>
                <Text style={formStyle.loginText}>Sign in</Text>
            </TouchableHighlight>
            <Text>
                No registered ?
                <Text onPress={() => navigation.navigate('Register')}>Register</Text>
            </Text>
        </View>
    );
};
