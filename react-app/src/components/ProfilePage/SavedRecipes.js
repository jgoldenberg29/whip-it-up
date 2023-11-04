import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"



export default function SavedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [savedRecipes, setSavedRecipes] = useState([])


    useEffect(() => {
        if(user) {
            if(user.savedRecipes?.length) {
                const saved = []
                for (let recipeId of user?.savedRecipes) {
                    saved.push(recipes[recipeId])
                }
                setSavedRecipes(saved)
            }
        }
    }, [user, recipes])


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
