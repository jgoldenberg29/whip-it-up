import { useEffect, useState } from "react";
import RecipeCards from "../RecipeDetailsModal";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllRecipes } from "../../store/recipes";
import RecipeCard from "./RecipeCard";
import { thunkSaveRecipe } from "../../store/session";
import Masonry from 'react-masonry-css'
import RecipeCardContainer from "./RecipeCardContainer";




export default function Home() {
    const recipes = useSelector(state => state.recipes)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState()
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllRecipes())
    }, [])

    const recipesArr = Object.values(recipes)
    if(!recipesArr.length) return null;

    const smallButtonClass = showButton ? "small-card-button" : "hide-button"

    const breakpoints = {
        default: 5,
        1415: 4,
        1140: 3,
        861: 2,
        587: 1,
      };

    return (
        <div className='landing-main-container'>
            <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {recipesArr.map(recipe => {
                return (
                <RecipeCardContainer recipeId={recipe.id}/>
                )
            })}
            </Masonry>
        </div>
    )
}
