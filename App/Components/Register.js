import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, Button, Image, TouchableHighlight} from 'react-native';

import auth from '@react-native-firebase/auth';

import formStyle from './formStyle'

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
        <View style={formStyle.container}>
            <View style={formStyle.inputContainer}>
                <Image style={formStyle.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={formStyle.inputs}
                           placeholder="Email"
                           keyboardType="email-address"
                           underlineColorAndroid='transparent'
                           onChangeText={text => onChangeEmail(text)}
                           value={email}
                />
            </View>
            <View style={formStyle.inputContainer}>
                <Image style={formStyle.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={formStyle.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           onChangeText={text => onChangePassword(text)}
                           value={password}
                />
            </View>
            <TouchableHighlight style={[formStyle.buttonContainer, formStyle.loginButton]} onPress={register.bind(this, email, password)}>
                <Text style={formStyle.loginText}>Sign up</Text>
            </TouchableHighlight>
            <Text>
                Already a account ?
                <Text onPress={() => navigation.navigate('Login')}>Sign in</Text>
            </Text>
        </View>
    );
};
