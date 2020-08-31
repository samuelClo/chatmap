import React from "react"
import {Image, StyleSheet, TouchableHighlight} from "react-native"

import auth from '@react-native-firebase/auth';


const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: 'rgba(252,0,0,0.7)'
    },
    logo: {
        width: 22,
        height: 22,
    },
})
const logout = () => {
    auth().signOut()
        .then(() => console.log('User signed out!'));
}

export default (props) => (
    <TouchableHighlight style={styles.wrapper} onPress={logout}>
        <Image
            style={styles.logo}
            source={require('../assets/picture/logout.jpg')}
        />
    </TouchableHighlight>
)
