import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import OpenModalButton from "../OpenModalButton"
import RecipeForm from "../RecipeForm"
import DeleteRecipeModal from "../DeleteRecipeModal"
import Masonry from 'react-masonry-css'


export default function SharedRecipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)

    if (!Object.values(recipes).length) return null

    const breakpoints = {
        default: 6,
        1200: 4,
        950: 3,
        700: 2,
        500: 1
      };

    const sharedRecipesMap = user.sharedRecipes.map(recipeId => {
        const recipe = recipes[recipeId]
        return (
            <div className='recipe-card-container' key={recipeId}>
                <RecipeCard recipeId={recipeId}/>
                <div>
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
    })

    if(!user.sharedRecipes.length) {
        return (
            <div>
                <span>You have not shared any recipes yet...let's get started!</span>
                <NavLink exact to="/recipes/new">Share Recipe</NavLink>
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
