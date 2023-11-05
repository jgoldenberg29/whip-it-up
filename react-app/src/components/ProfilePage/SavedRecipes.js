import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"



export default function SavedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)

    if(!Object.values(recipes).length) return null

    const savedRecipeMap = user.savedRecipes.map(recipeId => {
        const recipe = recipes[recipeId]
        return (
            <div className='recipe-card-container' key={recipeId}>
                <div>
                    <button>unsave</button>
                </div>
                <RecipeCard recipeId={recipeId}/>
            </div>
        )
    })

    if (!user.savedRecipes.length) {
        return (
            <div>
                <span>Explore some new recipes!</span>
                <NavLink exact to="/">Explore</NavLink>
            </div>
        )
    } else {
        return (
            <div>
                {savedRecipeMap}
            </div>
        )
    }
}
