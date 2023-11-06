import { useEffect, useState } from "react";
import RecipeCards from "../RecipeDetailsModal";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllRecipes } from "../../store/recipes";
import RecipeCard from "./RecipeCard";
import { thunkSaveRecipe } from "../../store/session";
import { thunkUnsaveRecipe } from "../../store/session"
import DeleteRecipeModal from "../DeleteRecipeModal"
import OpenModalButton from "../OpenModalButton"
import RecipeForm from "../RecipeForm"


export default function RecipeCardContainer({ pageType, recipeId }) {
    const recipes = useSelector(state => state.recipes)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState()
    const [showButton, setShowButton] = useState(false)

    const recipesArr = Object.values(recipes)
    if(!recipesArr.length) return null;

    const handleSave = async (id) => {
        const data = await dispatch(thunkSaveRecipe(id))
        if (data) {
            setErrors(data.errors)
        }
    }

    const handleUnsave = async (id) => {
        const data = await dispatch(thunkUnsaveRecipe(id))
        if (data) {
            setErrors(data.errors)
        }
    }

    const saveButtonClass = showButton ? "small-card-button" : "hide-button"

    const unsaveButtonClass = showButton ? "small-card-button unsave" : "hide-button"

    if (pageType === 'saved') {
        return (
            <div
                className='recipe-card-container'
                key={recipeId}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                >
                    <button
                    style={{backgroundColor: '#f9c54d',}} className={unsaveButtonClass} onClick={e => handleUnsave(recipeId)}>unsave</button>
                    <RecipeCard recipeId={recipeId}></RecipeCard>
                </div>
        )
    } else if (pageType === 'shared') {
        const recipe = recipes[recipeId]
        return (
            <div className='recipe-card-container' key={recipeId}>
                <RecipeCard recipeId={recipeId}/>
                <div className="edit-delete-container">
                    <OpenModalButton
                        buttonText='update'
                        modalComponent={<RecipeForm formType='edit' recipe={recipe}/>}
                    />
                    <OpenModalButton
                        buttonText='remove'
                        modalComponent={<DeleteRecipeModal recipeId={recipeId}/>}

                    />
                </div>
            </div>
        )
    }

    return (
                <div
                className='recipe-card-container'
                key={recipeId}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                >
                    <button
                    style={{backgroundColor: '#f9c54d',}} className={saveButtonClass} onClick={e => handleSave(recipeId)}>save</button>
                    <RecipeCard recipeId={recipeId}></RecipeCard>
                </div>
    )
}
