
const ALL_RECIPES = 'recipes/getAll'
const ADD_RECIPE = 'recipes/createOne'
const UPDATE_RECIPE = 'recipes/edit'
const DELETE_RECIPE = 'recipes/delete'


export const getAllRecipes = (recipes) => {
    return {
        type: ALL_RECIPES,
        recipes
    }
}

export const createRecipe = (recipe) => {
    return {
        type: ADD_RECIPE,
        recipe
    }
}

export const editRecipe = (recipe) => {
    return {
        type: UPDATE_RECIPE,
        recipe
    }
}

export const deleteRecipe = (recipeId) => {
    return {
        type: DELETE_RECIPE,
        recipeId
    }
}


// thunks
export const thunkGetAllRecipes = () => async dispatch => {
    const res = await fetch('/api/recipes')

    if(res.ok) {
        const data = await res.json();
        dispatch(ALL_RECIPES(data.recipes))
        return null
    } else {
        const data = await res.json();
        return data
    }
}


const recipeReducer = (state={}, action) => {
    switch (action.type) {
        case ALL_RECIPES:
            const allRecipes = {};
            action.recipes.forEach(recipe => {
                newState[recipe.id] = recipe
            });
            return allRecipes;
        case ADD_RECIPE:
            return {...state, [action.recipe.id]: action.recipe};
        case UPDATE_RECIPE:
            return {...state, [action.recipe.id]: action.recipe};
        case DELETE_RECIPE:
            const newState = {...state};
            delete newState[action.recipeId];
            return newState
        default:
            return state
    }
}


export default recipeReducer
