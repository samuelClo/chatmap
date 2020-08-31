import React, {useEffect} from "react"
import {StyleSheet, View} from "react-native";

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

import firestore from '@react-native-firebase/firestore';

// import Geolocation from '@react-native-community/geolocation';

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

export default (props) => {
    const {navigation, route} = props
    const {dataLocalization} = route.params
    // const [currentPosition, onChangeCurrentPosition] = React.useState({});
    const [allMarkers, onChangeAllMarkers] = React.useState([])

    const createNewMarker = (position) => {
        const {lat, lng} = position

        const duplicateMarker = allMarkers.find(marker => (
            marker.lat === lat && marker.lng === lng
        ))

        // if (duplicateMarker) {
        //     if (navigation.state.routeName === 'Messages')
        //         return
        //
        //     navigation.navigate('Messages', {
        //         idChat: duplicateMarker.id,
        //         formattedName: duplicateMarker.formattedName
        //     })
        //
        //     return
        // }

        return firestore()
            .collection('Markers')
            .add(position)
            .then(() => {
                console.log('New marker is created');
            });
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Markers')
            .onSnapshot(snapshot => {
                if (!snapshot)
                    return

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
    });

    // useEffect(() => {
    //     Geolocation.getCurrentPosition(info => {
    //         onChangeCurrentPosition(info)
    //     }, error => console.log(error));
    // }, []);

    useEffect(() => {
        if (Object.keys(dataLocalization).length > 0) {
            getGpsFromMaps(dataLocalization.reference)
                .then(data => {
                    if (!data)
                        return

                    const dataPos = {
                        ...data.data.result.geometry.location,
                        formattedName: data.data.result.formatted_address
                    }

                    createNewMarker(dataPos)
                })
        }
    }, [dataLocalization.reference]);

    return (
        <View style={styles.container}>
            <AddButton onClick={() => navigation.navigate('SearchPlace')}/>
            <MapView
                initialRegion={{
                    latitude: 48.85661400000001,
                    longitude: 2.3522219,
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
                        onPress={navigation.navigate.bind(this, 'Messages', {
                            idChat: marker.id,
                            formattedName: marker.formattedName
                        })}
                    />
                ))}
            </MapView>
        </View>
    )
};
