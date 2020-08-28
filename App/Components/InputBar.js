import React, {useEffect} from "react"
import {Image, StyleSheet, TextInput, TouchableHighlight, View} from "react-native"

const styles = StyleSheet.create({
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3e3e3e',
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
    },
    textBox: {
        borderRadius: 5,
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#ffffff',
    },
    sendButton: {
        alignItems: 'center'
    },
    logoInputBar: {
        width: 22,
        height: 22,
    },
    clipButton: {
        marginRight: 10,
    }
})

export default (props) => {
    const {content, onSendClick, onClipClick} = props;
    const [inputText, onChangeInputText] = React.useState('')

    useEffect(() => {
        onChangeInputText(content)
    }, []);

    return (
        <View style={styles.inputBar}>
            <TextInput
                style={styles.textBox}
                multiline={true}
                defaultHeight={30}
                onChangeText={(text) => onChangeInputText(text)}
                value={inputText}
                placeholder="Message"
                placeholderTextColor="#eeefef"
            />
            <TouchableHighlight style={styles.sendButton} onPress={onClipClick}>
                <Image
                    style={{ ...styles.logoInputBar, ...styles.clipButton }}
                    source={require('./../assets/picture/clip.png')}
                />
            </TouchableHighlight>
            <TouchableHighlight style={styles.sendButton} onPress={onSendClick.bind(this, inputText, null)}>
                <Image
                    style={styles.logoInputBar}
                    source={require('./../assets/picture/send.png')}
                />
            </TouchableHighlight>
        </View>
    );
}
