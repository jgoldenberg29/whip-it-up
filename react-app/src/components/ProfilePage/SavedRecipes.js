import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import { thunkUnsaveRecipe } from "../../store/session"
import Masonry from 'react-masonry-css'
import RecipeCardContainer from "../Home/RecipeCardContainer"



export default function SavedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [errors, setErrors] = useState()

    if(!Object.values(recipes).length) return null

    const handleUnsave = async (id) => {
        const data = await dispatch(thunkUnsaveRecipe(id))
        if (data) {
            setErrors(data.errors)
        }
    }

    const savedRecipeMap = user.savedRecipes.map(recipeId => {
        const recipe = recipes[recipeId]
        return (
            <>
            <RecipeCardContainer recipeId={recipeId} pageType='saved'/>
            </>
        )
    })

    const breakpoints = {
        default: 5,
        1415: 4,
        1140: 3,
        861: 2,
        587: 1,
      };

    if (!user.savedRecipes.length) {
        return (
            <div className="empty-profile-div">
                <span className="empty-profile-prompt">Let's browse for some new recipes!</span>
                <NavLink className="empty-profile-link" exact to="/">Get Cookin'</NavLink>
            </div>
        )
    } else {
        return (
            <div>
                <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {savedRecipeMap}
                </Masonry>
            </div>
        )
    }
}
