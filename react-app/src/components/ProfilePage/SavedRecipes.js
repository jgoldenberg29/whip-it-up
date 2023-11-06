import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import { thunkUnsaveRecipe } from "../../store/session"
import Masonry from 'react-masonry-css'



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
            <div className='recipe-card-container' key={recipeId}>
                <div>
                    <button
                    style={{backgroundColor: '#f9c54d',}}
                    className="small-card-button"
                    onClick={e => handleUnsave(recipeId)}>unsave</button>
                </div>
                <RecipeCard recipeId={recipeId}/>
            </div>
        )
    })

    const breakpoints = {
        default: 6,
        1200: 4,
        950: 3,
        700: 2,
        500: 1
      };

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
