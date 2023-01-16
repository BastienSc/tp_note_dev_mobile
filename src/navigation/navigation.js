import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";

import Search from "../components/searchComponent";
import RecipeDetails from "../components/recipeDetailsComponent";
import FavedRecipes from "../components/favedRecipesComponent";

const SearchNavigation = createStackNavigator();
const FavedNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const SearchStack = () => {
    return (
        <SearchNavigation.Navigator initialRouteName="SearchView">
            <SearchNavigation.Screen
                name="SearchView"
                component={Search}
            />
            <SearchNavigation.Screen name="RecipeView" component={RecipeDetails}/>
        </SearchNavigation.Navigator>
    )
}

const FavedStack = () => {
    return (
        <FavedNavigation.Navigator initialRouteName="FavedView">
            <FavedNavigation.Screen
                name="FavedView"
                component={FavedRecipes}/>
            <FavedNavigation.Screen 
                name="RecipeView"
                component={RecipeDetails}/>
        </FavedNavigation.Navigator>
    )
}

const RootStack = () => {
    return (
        <TabNavigation.Navigator
            screenOptions={{
                headerShown: false,
         }}>
        <TabNavigation.Screen
                name="Recherche"
                component={SearchStack}
            />
            <TabNavigation.Screen
                name="Favoris"
                component={FavedStack}
            />
        </TabNavigation.Navigator>  
    )
}

export default RootStack;