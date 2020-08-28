import React, {Component, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

import MessageBubble from './MessageBubble'
import InputBar from './InputBar'
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import Geolocation from "@react-native-community/geolocation"


const styles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    messages: {
        flex: 1
    },
})
const options = {
    title: 'Select Image',
    customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


export default (props) => {
    const {route} = props
    const {idChat} = route.params
    const scrollView = useRef(null)
    const [inputBarText, onChangeInputBarText] = React.useState('')
    const [userId, onChangeUserId] = React.useState(null)
    const [messages, onChangeMessages] = React.useState([])

    useEffect(() => (
        auth().onAuthStateChanged(user => {
            onChangeUserId(user.uid)
        })
    ));

    useEffect(() => {
        const subscriber = firestore()
            .collection('Rooms')
            .doc(idChat)
            .collection('messages')
            .orderBy("date", "desc")
            .onSnapshot(snapshot => {
                const changes = snapshot.docChanges();

                const test = changes.map(change => {
                    const  { userId: uid, ...data} = change.doc.data()

                    console.log(uid, userId)
                    console.log(data)
                    const direction = uid === userId ? 'right' : 'left'

                    return {
                        ...data,
                        direction
                    }
                })

                onChangeMessages(test.reverse())
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    });

    const sendMessage = async (text, image = null) => {
        if (!userId)
            return

        return firestore()
            .collection('Rooms')
            .doc(idChat)
            .collection('messages')
            .add({
                text,
                userId,
                imageName: image,
                date: new Date(),
            })
            .then(() => {
                console.log('New message is created');
            });
    }

    // if (scrollView.current)
    //     scrollView.scrollToEnd()
    const sendPicture = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const {fileName, path: filePath} = response
                const reference = storage().ref(fileName);

                reference.putFile(filePath)
                    .then(sendMessage(null, fileName))
                    .catch(err => console.log(err))
            }
        });
    }

    return (
        <View style={styles.outer}>
            <ScrollView ref={scrollView} style={styles.messages}>
                {messages.map((message, i) => (
                    <MessageBubble
                        key={i}
                        direction={message.direction}
                        imageName={message.imageName}
                        content={message.text}
                    />
                ))}
            </ScrollView>
            <InputBar
                onClipClick={sendPicture}
                onSendClick={sendMessage}
                text={inputBarText}
            />
        </View>
    )
}
