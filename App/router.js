import auth from "@react-native-firebase/auth"
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import Home from "./Components/Home"
import Register from "./Components/Register"
import Login from "./Components/Login"
import {useEffect, useState} from "react"
import React from "react"

export default () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        return null;
    }

    const Stack = createStackNavigator();


    return (
        <NavigationContainer>
            {user
                ? (
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home}/>
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