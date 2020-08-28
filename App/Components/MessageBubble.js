import {Text, View, StyleSheet, Image, TouchableHighlight} from "react-native"
import React from "react"
import storage from "@react-native-firebase/storage"

const styles = StyleSheet.create({
    messageBubble: {
        borderRadius: 5,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        flex: 1,
    },
    messageBubbleLeft: {
        backgroundColor: '#af8a61',
        alignSelf: 'flex-start',
    },
    messageBubbleRight: {
        backgroundColor: '#835B37',
        alignSelf: 'flex-end'
    },
    text: {
        color: '#ffffff'
    },
    image: {
        width: 200,
        height: 200,
    }
})

export default (props) => {
    const {direction, content, imageName} = props;
    const bubbleSideStyles = direction === 'left' ? styles.messageBubbleLeft : styles.messageBubbleRight;
    const [picturePath, onChangePicturePath] = React.useState(null)

    if (imageName) {
        const reference = storage().ref(imageName);

        reference.getDownloadURL().then(url => {
            onChangePicturePath(url)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <View style={{...styles.messageBubble, ...bubbleSideStyles}}>
            {
                content
                && <Text style={styles.text}>
                    {content}
                </Text>
            }
            {
                imageName
                &&
                <Image
                    style={styles.image}
                    source={{
                        uri: picturePath || 'https://www.etsfalieres.com/wp-content/uploads/2018/07/placeholder-image.jpg'
                    }}
                />
            }
        </View>
    )
}
