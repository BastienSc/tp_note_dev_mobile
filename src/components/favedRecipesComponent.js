import react from "react"
import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import RecetteListElement from "./recetteListElementCompnent"

const FavedRecipes = ({navigation}) => {
    const dispatch = useDispatch();
    const favedRecipes = useSelector((state) => state.favRecipes.favedRecipesList);

    const navigateRecipeDetails = (recipe) => {
        console.log(recipe.title);
        navigation.navigate("RecipeView", {recipe: recipe})
    }

    return (<View>
        <FlatList
                data={favedRecipes}
                renderItem={ ({ item }) => <RecetteListElement onClick={() => navigateRecipeDetails(item)} recipe={item}/> }
                keyExtractor={item => item.id}
            />
    </View>)
}


export default FavedRecipes;