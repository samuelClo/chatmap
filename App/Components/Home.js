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
const createNewMarker = (position) => {
    return firestore()
        .collection('Markers')
        .add(position)
        .then(() => {
            console.log('New marker is created');
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
            .collection('Markers')
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
    });

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

                    return createNewMarker(pos)
                })
        }
    });

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
                        onPress={navigation.navigate.bind(this, 'Messages', {idChat: marker.id})}
                    />
                ))}
            </MapView>
        </View>
    )
};
