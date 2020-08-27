import React from "react"
import {StyleSheet, View, Text, Pressable} from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginRight: 10,
    },
    addButton: {
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
});

export default (props) => {
    const {style, onClick} = props

    return (
        <View style={{ ...styles.wrapper, ...style}}>
            <Pressable style={styles.addButton} onPress={onClick}>
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
