import { useEffect } from "react";
import RecipeCards from "../RecipeDetailsModal";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllRecipes } from "../../store/recipes";
import RecipeCard from "./RecipeCard";




export default function Home() {
    const recipes = useSelector(state => state.recipes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllRecipes())
    }, [])

    if(!Object.values(recipes).length) return null;

    return (
        <div className='landing-main-container'>
            {recipes.map(recipe => {
                <div className='recipe-card-container' key={recipe.id}>
                    <RecipeCard recipeId={recipe.id}/>
                </div>
            })}
        </div>
    )
}
