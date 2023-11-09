import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import OpenModalButton from "../OpenModalButton"
import RecipeForm from "../RecipeForm"
import DeleteRecipeModal from "../DeleteRecipeModal"
import Masonry from 'react-masonry-css'
import RecipeCardContainer from "../Home/RecipeCardContainer"


export default function SharedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)

    if (!Object.values(recipes).length) return null

    const breakpoints = {
        default: 5,
        1415: 4,
        1140: 3,
        861: 2,
        587: 1,
      };

    const sharedRecipesMap = user.sharedRecipes.map(recipeId => {
        return (
            <>
                <RecipeCardContainer pageType='shared' recipeId={recipeId}/>
            </>
        )
    })

    if(!user.sharedRecipes.length) {
        return (
            <div className="empty-profile-div">
                <span className="empty-profile-prompt">You have not shared any recipes yet...let's get started!</span>
                <OpenModalButton
                    className='empty-profile-button'
					buttonText='Share Recipe'
					modalComponent={<RecipeForm formType='create'/>}
                />
            </div>
        )
    } else {
        return (
            <div>
                <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {sharedRecipesMap}
                </Masonry>
            </div>

        )
    }
}
