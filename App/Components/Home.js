import React, {Component} from 'react';
import { Text, StyleSheet, View } from "react-native";

import auth from '@react-native-firebase/auth';
// import {GoogleApiWrapper, Map} from "google-maps-react"

const disconnectUser = () => {
    auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}

const mapStyles = {
    width: '100%',
    height: '100%',
};

const Home = () => {
    return (
        <View>
            <Text>Home</Text>
            <Text onPress={disconnectUser}>Disconnect</Text>
            {/*<Map*/}
            {/*    google={this.props.google}*/}
            {/*    zoom={8}*/}
            {/*    style={mapStyles}*/}
            {/*    initialCenter={{ lat: 47.444, lng: -122.176}}*/}
            {/*/>*/}

        </View>
    )
}

export default Home


// export class Home extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
//                 {latitude: 47.359423, longitude: -122.021071},
//                 {latitude: 47.2052192687988, longitude: -121.988426208496},
//                 {latitude: 47.6307081, longitude: -122.1434325},
//                 {latitude: 47.3084488, longitude: -122.2140121},
//                 {latitude: 47.5524695, longitude: -122.0425407}]
//         }
//     }
//
//     // displayMarkers = () => {
//     //     return this.state.stores.map((store, index) => {
//     //         return <Marker key={index} id={index} position={{
//     //             lat: store.latitude,
//     //             lng: store.longitude
//     //         }}
//     //                        onClick={() => console.log("You clicked me!")} />
//     //     })
//     // }
//
//     render() {
//         return (
//             <Map
//                 google={this.props.google}
//                 zoom={8}
//                 style={mapStyles}
//                 initialCenter={{ lat: 47.444, lng: -122.176}}
//             >
//
//              </Map>
//          );
//      }
//  }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyCeYlJR5yOfwfNoIAEAxkGYqKoX_c4wLc8'
// })(Home);
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//
// export class MapContainer extends Component {
//     render() {
//         return (
//             <Map google={this.props.google} zoom={14}>
//
//                 <Marker onClick={this.onMarkerClick}
//                         name={'Current location'} />
//
//                 <InfoWindow onClose={this.onInfoWindowClose}>
//                     <div>
//                         <h1>{this.state.selectedPlace.name}</h1>
//                     </div>
//                 </InfoWindow>
//             </Map>
//         );
//     }
// }
//
// export default GoogleApiWrapper({
//     apiKey: ('AIzaSyCeYlJR5yOfwfNoIAEAxkGYqKoX_c4wLc8')
// })(MapContainer)
