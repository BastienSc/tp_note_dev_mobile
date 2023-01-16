import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecetteListElement = ({recipe, onClick}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Image style={styles.picture} source={{uri: recipe.image}}/>
            <View style={styles.recipeInfos}>
                <View>
                    <Text style={styles.title}>{recipe.title} </Text>
                <Text>Temps de préparation : ({recipe.readyInMinutes} minutes)</Text>
                </View>
                <Text>{recipe.aggregateLikes} j'aime</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        padding: 8,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: '10%'
    },
    picture: {
        height: 70,
        width: 70
    },
    title: {
        fontWeight: 'bold',flexShrink: 1
    },
    recipeInfos: {
        paddingLeft: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default RecetteListElement;