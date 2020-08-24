import React, {Component} from 'react';
import { Text, StyleSheet, View } from "react-native";

import auth from '@react-native-firebase/auth';

const disconnectUser = () => {
    auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}

export default () => {
    return (
        <View>
            <Text>Home</Text>
            <Text onPress={disconnectUser}>Disconnect</Text>
        </View>
    )
}
