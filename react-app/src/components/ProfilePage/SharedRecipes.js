import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"



export default function SharedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [cardsToggle, setCardsToggle] = useState('saved')
    const [savedRecipes, setSavedRecipes] = useState([])
    const [sharedRecipes, setSharedRecipes] = useState([])

    if(!user.sharedRecipes.length) {
        return (
            <div>
                <span>You have not shared any recipes yet...let's get started!</span>
                <NavLink exact to="/recipes/new">Share Recipe</NavLink>
            </div>
        )
    } else {
        return (
            <div>
                {sharedRecipes.map(recipe => {
                    return (
                        <div className='recipe-card-container' key={recipe.id}>
                            <RecipeCard recipeId={recipe.id}/>
                        </div>
                    )
                })}
            </div>

        )
    }
}
