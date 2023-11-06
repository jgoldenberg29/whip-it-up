import { useEffect, useState } from "react";
import RecipeCards from "../RecipeDetailsModal";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllRecipes } from "../../store/recipes";
import RecipeCard from "./RecipeCard";
import { thunkSaveRecipe } from "../../store/session";
import Masonry from 'react-masonry-css'




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

    const handleSave = async (id) => {
        const data = await dispatch(thunkSaveRecipe(id))
        if (data) {
            setErrors(data.errors)
        }
    }

    const smallButtonClass = showButton ? "small-card-button" : "hide-button"

    const breakpoints = {
        default: 6,
        1200: 4,
        950: 3,
        700: 2,
        500: 1
      };

    return (
        <div className='landing-main-container'>
            <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {recipesArr.map(recipe => {
                return (
                <div
                className='recipe-card-container'
                key={recipe.id}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                >
                    <button
                    style={{backgroundColor: '#f9c54d',}} className="small-card-button" onClick={e => handleSave(recipe.id)}>save</button>
                    <RecipeCard recipeId={recipe.id}></RecipeCard>
                </div>
                )
            })}
            </Masonry>
        </div>
    )
}
