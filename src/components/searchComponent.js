import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet,TextInput, View, Keyboard } from "react-native";
import { getRandomRecipesFromApi, getRecipesBySearchTerm } from "../api/spoonacularAPI";
import RecetteListElement from "./recetteListElementCompnent";

const Search = ({navigation}) => {
    const [recettes, setRecettes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadMoreRandomRecipes([]);
    }, []);
    

    const loadMoreRecipes = () => {
        setCurrentPage(currentPage + 1);
        if (searchTerm.trim() === ""){
            loadMoreRandomRecipes(recettes)
        }
        else{
            loadMoreSearchedRecipes(searchTerm, recettes, currentPage + 1);
        }
    }

    const loadMoreRandomRecipes = async (currentRecettes) => {
        const newRandomRecipes = await getRandomRecipesFromApi();
        //Filtre à faire pour éviter les doublons d'id
        const newRecipes = currentRecettes.concat(newRandomRecipes);
        setRecettes(newRecipes);
    }

    const loadMoreSearchedRecipes = async (currentSearchTerm, currentRecettes, _currentPage) => {
        console.log("appel avec currentPage" + currentPage)
        const newRecipes = await getRecipesBySearchTerm(currentSearchTerm, _currentPage);
        setRecettes([...currentRecettes, ...newRecipes]);
    }

    const newRecipesSearchByTerm = () => {
        Keyboard.dismiss();
        setCurrentPage(0);
        if (searchTerm.trim() != "")
            loadMoreSearchedRecipes(searchTerm, [], 0);
        else
            loadMoreRandomRecipes([]);
    }

    const navigateRecipeDetails = (recipe) => {
        console.log(recipe.title);
        navigation.navigate("RecipeView", {recipe: recipe})
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Chercher une recette"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                onSubmitEditing={newRecipesSearchByTerm}
            />
            <Button 
                style={styles.searchButton} 
                title="Rechercher" 
                onPress={newRecipesSearchByTerm}
            />
            <FlatList
                data={recettes}
                renderItem={ ({ item }) => <RecetteListElement onClick={() => navigateRecipeDetails(item)} recipe={item}/> }
                keyExtractor={item => item.id}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={ 0.5 }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        height: 30
    }
})

export default Search;