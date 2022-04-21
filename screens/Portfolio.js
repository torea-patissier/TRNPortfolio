import React, { useCallback, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { globalStyles } from '../styles/AppStyles';
import Colors from '../styles/Colors';
import MaterialIconsHeader from '../components/MaterialIconsHeader';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TouchableImage from '../components/TouchableImage';
import { setSelection } from '../redux/actions/actionSelection';
import { useDispatch, useSelector } from 'react-redux';

const Portfolio = ({ navigation }) => {

    const dispatch = useDispatch()    

    const favColor = navigation.getParam('favColor');
    const name = navigation.getParam('name');
    const profilImg = navigation.getParam('img');
    const desc = navigation.getParam('desc');
    const photoArray = navigation.getParam('photos');
    const userId = navigation.getParam('id');
    /**
     * Ces infos viennent de l'objet item de Home.js
     * 
     *                     " handleNavigate={() => navigation.navigate('Portfolio', item)} "
     */

    const selectedUser = useSelector(
        state => state.users.selectedUsers.some( user => user.id === userId )
    )
        
    const handleDispatch = useCallback(() => {
        dispatch(setSelection(userId));

        if (selectedUser) {
            Alert.alert(
                "Photos effacées",
                `Les photos de ${name} sont effacées`,
                [ { text: "OK"} ]
            )
        } else {
            Alert.alert(
                "Photos enregistrées",
                "Elles sont disponibles dans votre sélection",
                [ { text: "OK"} ]
            )
        }
        
    }, [dispatch, userId, selectedUser])

    useEffect(() => {
        navigation.setParams({ handleLike: handleDispatch })
    }, [handleDispatch])

    useEffect(() => {
        navigation.setParams({ isSelected: selectedUser})
    }, [selectedUser])

    const selectPhoto = (photo) => { // A déclarer dans Portfolio pour bénéficier de navigation
        navigation.navigate('Photo', photo )
    }

    return (
        <ScrollView style={globalStyles.container}>
            <Text>Portfolio.js</Text>
           <View style={{backgroundColor: favColor, ...styles.profilInfos}}>
                <Image 
                    style={styles.smallprofileImg}
                    // Border externe blanche
                    source={{uri: profilImg}} // L17 Image arrondi
                />
                <Text style={styles.profilName}>{name}</Text>
                {/* Prénom de la personne */}

           </View>
           <View style={styles.profilDescription}>
                <Text style={styles.titleBioText}>Bio: </Text>
                <Text style={styles.textBio}>{desc}</Text>
                {/* Description */}
           </View>
           <View>
                {
                    photoArray.map( photo => ( // photoarray récupère le tableau de photos dans usersData.js
                        <TouchableImage // Component créé et importé (Custom component)
                            key={photo.id} // A renseigner quand on .map
                            imgUrl={photo.url} // Je créer le props imgUrl qui prend pour valeur l'url de la const photo
                            imgTitle={photo.title} // Props pour le titre de l'image en BckGrnd Black 
                            onSelectPhoto={() => selectPhoto(photo)} //Déclenche la navigation vers photo
                        />
                    ))
                }
           </View>
        </ScrollView>
    )
}

/**
 * Pour customizer le header de la personne
 */
Portfolio.navigationOptions = (navigationData) => {
    const name = navigationData.navigation.getParam('name');
    const favColor = navigationData.navigation.getParam('favColor');
    const handleLike = navigationData.navigation.getParam('handleLike');
    const isSelected = navigationData.navigation.getParam('isSelected');

    return {
        headerTitle: `Profil de ${name}`, //J'ajoute son nom
        headerStyle: {
            backgroundColor: favColor //J'ajoute la couleur favoris en BckGrnd header
        },
        headerTintColor: Colors.white,
        headerRight: () => (
            <HeaderButtons
               HeaderButtonComponent={MaterialIconsHeader}
            >
                <Item 
                    title="Ajouter"
                    iconName={isSelected ? "delete" : "thumb-up"}
                    onPress={handleLike}
                />
            </HeaderButtons>
        )
    };
}


const styles = StyleSheet.create({
    profilInfos: {
        alignItems: 'center',
        padding: 10
    },
    smallprofileImg: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        margin: 9,
        borderWidth: 6,
        borderColor: Colors.white
    },
    profilName: { 
        fontFamily: 'InriaSans_700Bold',
        color: Colors.white,
        fontSize: 25
    },
    profilDescription: {
        backgroundColor: Colors.ghost,
        padding: 15,
        fontSize: 25,
        fontFamily: 'InriaSans_400Regular'
    },
    titleBioText: {
        fontSize: 25,
        padding: 9,
        fontFamily: 'InriaSans_700Bold'
    },
    textBio: {
        fontFamily: 'InriaSans_400Regular',
        fontSize: 20,
        padding: 9
    }
})

export default Portfolio