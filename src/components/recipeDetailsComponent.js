import react, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { unfavRecipe, addRecipeToFaved } from "../store/reducers/favRecipesSlice";

const RecipeDetails = ({route}) => {
    const recipe = route.params.recipe;

    const favedRecipes = useSelector(state => state.favRecipes.favedRecipesList);
    let dispatch = useDispatch();
    
    const displayFavButton = () => {
        if (favedRecipes.filter(_recipe => _recipe.id == recipe.id).length > 0){
            return (
                <Button 
                    style="styles.unFavButton" 
                    title="Retirer des favoris"
                    onPress={() => dispatch(unfavRecipe(recipe.id))} 
                />
            )
        }
        else
            return (
                <Button 
                    style="styles.favButton" 
                    title="Ajouter aux favoris"
                    onPress={() => dispatch(addRecipeToFaved(recipe))}
                />
            )
    }

    const displayProductionCompanies = () => {
        let companiesJSX = [];
        film.production_companies.forEach((company, index) => {
          companiesJSX.push(
            <ProductionCompanyItem key={index} companyData={company} />
          );
        });
        return <View>{companiesJSX}</View>;
      };

    const displayIngredients = () => {
        let ingredientsJSX = [];
        recipe.extendedIngredients.forEach((ingredient) => {
            ingredientsJSX.push(<Text>{ingredient.original}</Text>)
        })

        return <View>{ingredientsJSX}</View>
    }

    const displayInstructions = () => {
        let instructions = [];
        recipe.analyzedInstructions[0]?.steps?.forEach((instruction) => {
            instructions.push(<Text>{instruction.number}. {instruction.step}</Text>)
        })

        return <View>{instructions}</View>
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Image style={styles.picture} source={{uri: recipe.image}}/>
            {displayFavButton()}
            <View style={styles.recipeDetails}>
                <Text style={styles.header}>Ingredients</Text>
                {displayIngredients()}
                <Text style={styles.header}>Instructions</Text>
                {displayInstructions()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 15
    },
    header:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        marginTop: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 21,
        alignSelf: 'center'
    },
    picture: {
        margin: 20,
        height: 200
    },
    recipeDetails:{
        marginLeft: 10
    }
})

export default RecipeDetails;