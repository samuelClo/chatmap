import React, {useEffect} from "react"
import {StyleSheet, View} from "react-native";

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

import firestore from '@react-native-firebase/firestore';

import Geolocation from '@react-native-community/geolocation';

import axios from 'axios'

import AddButton from './AddButton'


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        zIndex: 1,
        elevation: 1,
    }
});

const getGpsFromMaps = async (reference) => {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?reference=${reference}&sensor=true&key=AIzaSyCeYlJR5yOfwfNoIAEAxkGYqKoX_c4wLc8`)
}
const createNewChat = (position) => {
    return firestore()
        .collection('Chats')
        .add(position)
        .then(() => {
            console.log('New chat is created');
        });
}

export default (props) => {
    const {navigation, route} = props
    const {dataLocalization} = route.params
    const [modalDisplayed, onChangeModalDisplayed] = React.useState(false);
    const [currentPosition, onChangeCurrentPosition] = React.useState({});
    const [allMarkers, onChangeAllMarkers] = React.useState([])
    const [lastPos, onChangeLastPos] = React.useState({})

    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .onSnapshot(snapshot => {
                const changes = snapshot.docChanges();

                onChangeAllMarkers(changes.map(change => {
                    const id = change.doc.id

                    return {
                        ...change.doc.data(),
                        id
                    }
                }))
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    },);

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            onChangeCurrentPosition(info)
        }, error => console.log(error));
    }, []);

    useEffect(() => {
        if (Object.keys(dataLocalization).length > 0) {
            onChangeLastPos(dataLocalization.reference)

            if (lastPos === dataLocalization.reference)
                return

            getGpsFromMaps(dataLocalization.reference)
                .then(data => {
                    const pos = data.data.result.geometry.location

                    return createNewChat(pos)
                })
        }
    },);

    const truc = (data) => {
        console.log(data)
    }


    return (
        <View style={styles.container}>
            <AddButton onClick={() => navigation.navigate('SearchPlace')}/>
            <MapView
                initialRegion={{
                    latitude: currentPosition?.latitude || 48.85661400000001,
                    longitude: currentPosition?.longitude || 2.3522219,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
            >
                {allMarkers.map(marker => (
                    <Marker
                        key={marker.lat + marker.lng}
                        coordinate={{latitude: marker.lat, longitude: marker.lng}}
                        title={'test titre'}
                        description={'test description'}
                        onPress={truc.bind(this, marker.id)}
                    >
                        {/*<Callout>*/}
                        {/*    {test(marker.lat)}*/}
                        {/*</Callout>*/}
                    </Marker>
                ))}
            </MapView>
        </View>
    )
};

// const sqd = {
//     "_firestore": {
//         "_app": {
//             "_automaticDataCollectionEnabled": true,
//             "_deleteApp": [Function bound deleteApp],
//             "_deleted": false,
//             "_initialized": true,
//             "_name": "[DEFAULT]",
//             "_nativeInitialized": true,
//             "_options": [Object]
//         },
//         "_config": {
//             "ModuleClass": [Function FirebaseFirestoreModule],
//             "hasCustomUrlOrRegionSupport": false,
//             "hasMultiAppSupport": true,
//             "namespace": "firestore",
//             "nativeEvents": [Array],
//             "nativeModuleName": [Array],
//             "statics": [Object],
//             "version": "7.6.1"
//         },
//         "_customUrlOrRegion": undefined,
//         "_nativeModule": {
//             "RNFBFirestoreCollectionModule": true,
//             "RNFBFirestoreDocumentModule": true,
//             "RNFBFirestoreModule": true,
//             "RNFBFirestoreTransactionModule": true,
//             "clearPersistence": [Function anonymous],
//             "collectionGet": [Function anonymous],
//             "collectionOffSnapshot": [Function anonymous],
//             "collectionOnSnapshot": [Function anonymous],
//             "disableNetwork": [Function anonymous],
//             "documentBatch": [Function anonymous],
//             "documentDelete": [Function anonymous],
//             "documentGet": [Function anonymous],
//             "documentOffSnapshot": [Function anonymous],
//             "documentOnSnapshot": [Function anonymous],
//             "documentSet": [Function anonymous],
//             "documentUpdate": [Function anonymous],
//             "enableNetwork": [Function anonymous],
//             "getConstants": [Function anonymous],
//             "setLogLevel": [Function anonymous],
//             "settings": [Function anonymous],
//             "terminate": [Function anonymous],
//             "transactionApplyBuffer": [Function anonymous],
//             "transactionBegin": [Function anonymous],
//             "transactionDispose": [Function anonymous],
//             "transactionGetDocument": [Function anonymous]
//         },
//         "_referencePath": {"_parts": [Array]},
//         "_transactionHandler": {"_firestore": [Circular], "_pending": [Object]}
//     },
//     "_isMetadataChange": false,
//     "_nativeData": {
//         "doc": {
//             "data": [Object],
//             "exists": true,
//             "metadata": [Array],
//             "path": "Chats/FnwVcYtPQn6mrlZvmH8l"
//         }, "isMetadataChange": false, "ni": 0, "oi": -1, "type": "a"
//     }
// }


