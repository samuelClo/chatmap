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

const login = (email, password) => {
    auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                           placeholder="Email"
                           keyboardType="email-address"
                           underlineColorAndroid='transparent'
                           onChangeText={text => onChangeEmail(text)}
                           value={email}
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                           placeholder="Password"
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           onChangeText={(password) => this.setState({password})}/>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                <Text>Forgot your password?</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                <Text>Register</Text>
            </TouchableHighlight>
        </View>
        <>
            <Text>Login</Text>
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
                    title="Login"
                    color="#f194ff"
                    onPress={login.bind(this, email, password)}
                />
                <Text>
                    No registered ?
                    <Text onPress={() => navigation.navigate('Register')}>Register</Text>
                </Text>
            </View>
        </>
    );
};
