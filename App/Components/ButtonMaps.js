import React from "react"
import {StyleSheet, View, Text, Pressable, Image, TouchableHighlight} from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginRight: 10,
    },
    Button: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: '#3e3e3e',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 2,
        elevation: 2,
    },
    addButtonText: {
        fontSize: 40,
        color: '#ffffff',
        lineHeight: 50,
    },
    searchPicture: {
        width: 25,
        height: 25,
    },
    addButton: {
        marginBottom: 10,
    }
});

export default (props) => {
    const {style, onAddClick, onSearchClick} = props

    return (
        <View style={{ ...styles.wrapper, ...style}}>
            <Pressable style={{ ...styles.Button, ...styles.addButton }} onPress={onSearchClick}>
                <Image
                    style={styles.searchPicture}
                    source={require('./../assets/picture/search.png')}
                />
            </Pressable>
            <Pressable style={styles.Button} onPress={onAddClick}>
                <Text
                    style={styles.addButtonText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                >
                    +
                </Text>
            </Pressable>
        </View>
    )
};
