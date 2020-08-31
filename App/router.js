import {useEffect, useState} from "react"
import React from "react"

import {Image, StyleSheet, TouchableHighlight} from 'react-native'

import auth from "@react-native-firebase/auth"
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"

import Logout from "./Components/Logout"

import Home from "./Components/Home"
import Register from "./Components/Register"
import Login from "./Components/Login"
import SearchPlace from "./Components/SearchPlace"
import Messages from './Components/Messages'


const styles = StyleSheet.create({
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3e3e3e',
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
    },
    textBox: {
        borderRadius: 5,
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#ffffff',
    },
    sendButton: {
        alignItems: 'center'
    },
    logoInputBar: {
        width: 22,
        height: 22,
    },
    clipButton: {
        marginRight: 10,
    }
})

export default () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const Stack = createStackNavigator();

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing)
            setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing)
        return null;

    return (
        <NavigationContainer>
            {user
                ? (
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            initialParams={{ dataLocalization: {} }}
                            options={{
                                headerRight: () => <Logout/>
                            }}
                        />
                        <Stack.Screen name="SearchPlace" component={SearchPlace}/>
                        <Stack.Screen
                            name="Messages"
                            component={Messages}
                            options={({route}) => (
                                {title: route.params.formattedName}
                            )}
                        />
                    </Stack.Navigator>)
                : (
                    <Stack.Navigator initialRouteName="Register">
                        <Stack.Screen name="Register" component={Register}/>
                        <Stack.Screen name="Login" component={Login}/>
                    </Stack.Navigator>
                )}
        </NavigationContainer>
    );
}
