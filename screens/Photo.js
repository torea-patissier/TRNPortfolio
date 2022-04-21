import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { globalStyles } from '../styles/AppStyles';

const Photo = ({ navigation }) => {
        const url = navigation.getParam('url');
        const title = navigation.getParam('title');
        const photoDesc = navigation.getParam('photoDesc');
        /**
         * Props récupérés  de navigation via selectPhoto dans Portfolio
         */

    return ( //Vue 
        <ScrollView style={globalStyles.container}>
            <Text>Photo.js</Text>
            <Image 
                style={styles.selectedImage}
                source={{uri: url}} // J'appelle l'url de l'image stocké dans usersData
            />
            <View style={styles.photoDescription}>
                <Text style={globalStyles.titleText}>{title}</Text>
                {/* J'affiche le titre de l'image */}

                <Text style={styles.textDescription}>{photoDesc}</Text>
                <Text style={styles.textDescription}>{photoDesc}</Text>
            </View>
        </ScrollView>
    )
}

Photo.navigationOptions = ({navigation}) => {
    const photoTitle = navigation.getParam('title');
    return {
        headerTitle: photoTitle.toUpperCase() // Permet d'afficher le titre de l'image dans le header
    }
}

const styles = StyleSheet.create({
    selectedImage: {
        width: '100%',
        height: 300
    },
    photoDescription: {
        padding: 15,
        fontSize: 25,
        fontFamily: 'InriaSans_400Regular'
    },
    textDescription: {
        fontFamily: 'InriaSans_400Regular',
        fontSize: 20,
        padding: 9
    }
})

export default Photo
