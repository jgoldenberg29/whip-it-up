import { setUser } from "./session"

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
        dispatch(getAllRecipes(data.recipes))
        return null
    } else {
        const data = await res.json();
        return data
    }
}

export const thunkCreateRecipe = (recipe) => async dispatch => {
    const res = await fetch('/api/recipes', {
        method: "POST",
        body: recipe
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createRecipe(data.recipe))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkUpdateRecipe = (recipe, id) => async dispatch => {
    const res = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        body: recipe
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkDeleteRecipe = (id) => async dispatch => {
    const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(deleteRecipe(id))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkPostComment = (comment, recipeId) => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        body: comment,
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkEditComment = (comment, commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: comment,
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkDeleteComment = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        return null
    } else {
        const data = await res.json()
        return data
    }
}


const recipeReducer = (state={}, action) => {
    switch (action.type) {
        case ALL_RECIPES:
            const allRecipes = {};
            action.recipes.forEach(recipe => {
                allRecipes[recipe.id] = recipe
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
