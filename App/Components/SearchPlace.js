import React from "react"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"

const truc = {
    "description": "12 Rue de Caumartin, Paris, France",
    "matched_substrings": [{"length": 2, "offset": 0}, {"length": 6, "offset": 3}],
    "place_id": "ChIJMRE_-zNu5kcRkWCZX6NTWx4",
    "reference": "ChIJMRE_-zNu5kcRkWCZX6NTWx4",
    "structured_formatting": {
        "main_text": "12 Rue de Caumartin",
        "main_text_matched_substrings": [[Object], [Object]],
        "secondary_text": "Paris, France"
    },
    "terms": [{"offset": 0, "value": "12"}, {"offset": 3, "value": "Rue de Caumartin"}, {
        "offset": 21,
        "value": "Paris"
    }, {"offset": 28, "value": "France"}],
    "types": ["street_address", "geocode"]
}
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
