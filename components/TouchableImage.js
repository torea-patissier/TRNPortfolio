 import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import Colors from '../styles/Colors';
/**
 * Pour les images dans le #Portfolio
 * onSelectPhoto,imgUrl,imgTitle sont des un props récupérés de Portfolio 
 */
const TouchableImage = ({onSelectPhoto, imgUrl, imgTitle}) => {
    return (
        <View style={styles.photoContainer}>
            <Text>TouchableImage.js</Text>
            <TouchableOpacity // Permet de rendre l'image clickable
                onPress={onSelectPhoto}  // Invoque le props onSelectPhoto  qui déclenche selecPhoto #Portfolio
            >
                <ImageBackground // Composen React native
                    source={{uri: imgUrl}} // je spécifie en uri le props imgUrl de Portfolio
                    style={styles.bgPhoto}
                >

                <View style={styles.photoTitle}>
                   <Text style={styles.photoTitleText}>{imgTitle}</Text>
                </View>
                
                
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    photoContainer: {
        width: '100%', // La photo occupe tout l'écran
        height: 350,
        marginBottom: 19
    },
    bgPhoto: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    photoTitle: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 15
    },
    photoTitleText: {
        fontFamily: 'InriaSans_400Regular',
        fontSize: 19,
        color: Colors.white
    }
})
export default TouchableImage
