import React from "react"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"


export default (props) => {
    const {navigation} = props

    return (
        <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                navigation.navigate('Home', {dataLocalization: details})
            }}
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            query={{
                key: 'AIzaSyCeYlJR5yOfwfNoIAEAxkGYqKoX_c4wLc8',
                language: 'en',
            }}
            styles={{
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
            }}
        />
    )
}
