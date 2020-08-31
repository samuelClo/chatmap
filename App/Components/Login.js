import React, {Component} from 'react';
import {formStyleheet, TextInput, View, Text, Button, Image, TouchableHighlight} from 'react-native';

import auth from '@react-native-firebase/auth';

import formStyle from '../assets/style/formStyle'

import RegistrationInput from "./RegistrationInput"
import globalStyle from "../assets/style/globalStyle"

export default (props) => {
    const {navigation} = props;
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, onChangeError] = React.useState({
        global: '',
        email: '',
        password: '',
    })

    const login = (email, password) => {
        const errorEmail = email ? '' : 'Email is required'
        const errorPassword = password ? '' : 'Password is required'

        if (!email || !password) {
            onChangeError({
                global: '',
                email: errorEmail,
                password: errorPassword
            })

            return
        }

        auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            const {message} = error

            onChangeError({
                ...error,
                global: message
            })
        });
    }

    return (
        <View style={formStyle.container}>
            <RegistrationInput
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={text => onChangeEmail(text)}
                autoFocus
                value={email}
                error={error.email}
            />
            <RegistrationInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => onChangePassword(text)}
                value={password}
                error={error.password}
            />
            <TouchableHighlight style={[formStyle.buttonContainer, formStyle.loginButton]} onPress={login.bind(this, email, password)}>
                <Text style={formStyle.loginText}>Sign in</Text>
            </TouchableHighlight>
            <Text style={{ ...globalStyle.error, ...formStyle.error }}>
                {error.global}
            </Text>
            <Text>
                No registered ?
                <Text
                    onPress={() => navigation.navigate('Register')}
                    style={globalStyle.link}
                >
                    {' Register'}
                </Text>
            </Text>
        </View>
    );
};
