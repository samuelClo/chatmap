// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  */
//
// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
//
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
//
// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
//
// export default App;
// import React, {useState, useEffect} from 'react';
// import {View} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {Container, Header, Content, Footer, Title} from 'native-base';
//
// function App() {
//     // Set an initializing state whilst Firebase connects
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState();
//
//     // Handle user state changes
//     function onAuthStateChanged(user) {
//         setUser(user);
//         if (initializing) {
//             setInitializing(false);
//         }
//     }
//
//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//     }, []);
//
//     if (initializing) {
//         return null;
//     }
//
//     function connect() {
//         auth().signInWithEmailAndPassword('s@s.fr', '123456789').catch(function (error) {
//             console.log(error);
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ...
//         });
//     }
//
//     // if (!user) {
//     //     return (
//     //         <View>
//     //             <Text>Login</Text>
//     //             <Text onPress={connect}>Login</Text>
//     //         </View>
//     //     );
//     // }
//     {/*<View>*/}
//     {/*    <Text>Welcome {user.email}</Text>*/}
//     {/*</View>*/}
//
//     return (
//
//         <Container>
//             <Header>
//                 <Title>Header</Title>
//             </Header>
//
//             <Content>
//                 // Your main content goes here
//             </Content>
//
//             <Footer>
//                 <Title>Footer</Title>
//             </Footer>
//         </Container>
//     );
//
// }
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';

import {SafeAreaView, StatusBar, View} from 'react-native';

import Login from './App/Components/Login';
import Home from './App/Components/Home';
import Register from './App/Components/Register';


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
