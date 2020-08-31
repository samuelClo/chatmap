import React from "react"
import {StyleSheet, View, Text, Pressable, Image, TextInput} from "react-native";
import formStyle from '../assets/style/formStyle'
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"

navigator.geolocation = require('@react-native-community/geolocation');

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    label: {
        fontSize: 25,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#959595',
    }
});

export default (props) => {
    const {style, onClick} = props
    const [address, onChangeAddress] = React.useState('eheheh');

    console.log(address)

    return (
        <View style={{ ...styles.wrapper, ...style}}>
            <View style={styles.modalContent}>
                <Text style={styles.label}>
                    Create your room
                </Text>
                <View style={formStyle.inputContainer}>
                    <GooglePlacesAutocomplete
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
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    onChangeText={text => onChangeAddress(text)}*/}
                    {/*    value={address}*/}
                    {/*/>*/}
                    {/*<TextInput style={{ ...formStyle.inputs, ...styles.input }}*/}
                    {/*           placeholder="Address"*/}
                    {/*           underlineColorAndroid='transparent'*/}
                    {/*           onChangeText={text => onChangeAddress(text)}*/}
                    {/*           value={address}*/}
                    {/*/>*/}
                </View>
            </View>
        </View>
    )
};
