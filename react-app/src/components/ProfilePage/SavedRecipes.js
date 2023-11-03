import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"



export default function SavedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [cardsToggle, setCardsToggle] = useState('saved')
    const [savedRecipes, setSavedRecipes] = useState([])
    const [sharedRecipes, setSharedRecipes] = useState([])

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
                {savedRecipes.map(recipe => {
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
