import React, {useEffect} from "react"
import {StyleSheet, View} from "react-native";

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import firestore from '@react-native-firebase/firestore';

import axios from 'axios'

import ButtonMaps from "./ButtonMaps"


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

const getReverseGeocoding = async (lat, lng) => (
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCeYlJR5yOfwfNoIAEAxkGYqKoX_c4wLc8`)
)

export default (props) => {
    const {navigation, route} = props
    const {dataLocalization} = route.params
    const [allMarkers, onChangeAllMarkers] = React.useState([])
    const [hasModification, onChangeHasModification] = React.useState(false)
    const [landmark, onChangeLandmark] = React.useState({})
    const [region, onChangeRegion] = React.useState({
            latitude: 48.85661400000001,
            longitude: 2.3522219,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })

    const createNewMarker = () => {
        if (!landmark)
            return

        const {lat, lng} = landmark
        const isDuplicateMarker = allMarkers.some(marker => (
            marker.lat === lat && marker.lng === lng
        ))

        if (isDuplicateMarker)
            return

        return getReverseGeocoding(lat, lng)
            .then(data => {
                if (!data)
                    return

                const dataPos = {
                    lat,
                    lng,
                    formattedName: data.data.results[0].formatted_address,
                }

                return firestore()
                    .collection('Markers')
                    .add(dataPos)
                    .then(() => {
                        onChangeHasModification(!hasModification)
                        console.log('New marker is created');
                    });
            })
    }

  const goTo = (lat, lng) => {
      onChangeRegion({
              ...region,
              latitude: lat,
              longitude: lng
          }
      )
  }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Markers')
            .onSnapshot(snapshot => {
                if (!snapshot)
                    return

                onChangeAllMarkers(snapshot.docChanges().map(change => {
                    const id = change.doc.id

                    return {
                        ...change.doc.data(),
                        id
                    }
                }))
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [hasModification]); // I have not found a cleaner way:/

    useEffect(() => {
        if (!(Object.keys(dataLocalization).length > 0))
            return

        const locationOfSearchPlace = dataLocalization.geometry.location
        const {lat, lng} = locationOfSearchPlace

        getReverseGeocoding(lat, lng)
            .then(data => {
                if (!data)
                    return

                const duplicateMarker = allMarkers.find(marker => (
                    marker.formattedName === data.data.results[0].formatted_address
                ))

                if (duplicateMarker) {
                    navigation.navigate('Messages', {
                        idChat: duplicateMarker.id,
                        formattedName: duplicateMarker.formattedName
                    })

                    return
                }
                onChangeLandmark({lat, lng})
                goTo(lat, lng)
            })
    }, [dataLocalization.geometry]);

    const handleMapClick = (e) => {
        onChangeLandmark({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
        })
    }

    return (
        <View style={styles.container}>
            <ButtonMaps onAddClick={createNewMarker} onSearchClick={() => navigation.navigate('SearchPlace')}/>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onPress={handleMapClick}
                onRegionChangeComplete={local => {
                    console.log(local)
                    onChangeRegion(local)
                }}
                region={region}
            >
                {allMarkers.map(marker => (
                    <Marker
                        key={marker.lat + marker.lng}
                        coordinate={{latitude: marker.lat, longitude: marker.lng}}
                        pinColor={'#009bff'}
                        onPress={navigation.navigate.bind(this, 'Messages', {
                            idChat: marker.id,
                            formattedName: marker.formattedName
                        })}
                    />
                ))}
                {
                    Object.keys(landmark).length > 0 && <Marker
                        key={landmark.lat + landmark.lng}
                        coordinate={{latitude: landmark.lat, longitude: landmark.lng}}
                    />
                }
            </MapView>
        </View>
    )
};
