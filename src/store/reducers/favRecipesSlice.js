
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favedRecipesList: [],
};

const favRecipesSlice = createSlice({
  name: "favRecipes",
  initialState: initialState,
  reducers: {
    addRecipeToFaved(state, action) {
      state.favedRecipesList.push(action.payload);
    },
    unfavRecipe(state, action) {
      state.favedRecipesList = state.favedRecipesList.filter((recipe) => recipe.id !== action.payload);
    },
  },
});

export const { addRecipeToFaved, unfavRecipe } = favRecipesSlice.actions;
export default favRecipesSlice.reducer;