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
    const user = useSelector(state => state.session.user)
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

    const editDeleteDivClass = showButton ? "edit-delete-container" : "hide-container"

    const recipeCardContainerClass = user ? "recipe-card-container-user" : "recipe-card-container-no-user"

    if (pageType === 'saved') {
        return (
            <div
                className={recipeCardContainerClass}
                key={recipeId}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                >
                    <button
                    style={{backgroundColor: '#f9c54d',}}
                    className={unsaveButtonClass}
                    onClick={e => handleUnsave(recipeId)}>
                        unsave
                    </button>
                    <RecipeCard recipeId={recipeId}></RecipeCard>
                    <p className="recipe-card-title">{recipes[recipeId].title}</p>
                </div>
        )
    } else if (pageType === 'shared') {
        const recipe = recipes[recipeId]
        return (
            <div
            className={recipeCardContainerClass}
            key={recipeId}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
            >
                <RecipeCard recipeId={recipeId}/>
                <div className={editDeleteDivClass}>
                    <OpenModalButton
                        buttonText='update'
                        modalComponent={<RecipeForm formType='edit' recipe={recipe}/>}
                    />
                    <OpenModalButton
                        buttonText='remove'
                        modalComponent={<DeleteRecipeModal recipeId={recipeId}/>}

                    />
                    <p className="recipe-card-title">{recipes[recipeId].title}</p>
                </div>
            </div>
        )
    }

    return (
                <div
                className={recipeCardContainerClass}
                key={recipeId}
                onMouseEnter={() => {
                    if (user) setShowButton(true)
                }}
                onMouseLeave={() => setShowButton(false)}
                >
                    {user?.savedRecipes.indexOf(recipeId) !== -1 ?
                        <button
                        style={{backgroundColor: '#f9c54d',}}
                        className={unsaveButtonClass}
                        onClick={e => handleUnsave(recipeId)}>
                            unsave
                        </button>
                    :
                        <button
                        style={{backgroundColor: '#f9c54d',}} className={saveButtonClass} onClick={e => handleSave(recipeId)}>save</button>
                    }
                    <RecipeCard recipeId={recipeId}></RecipeCard>
                    <p className="recipe-card-title">{recipes[recipeId].title}</p>
                </div>
    )
}
