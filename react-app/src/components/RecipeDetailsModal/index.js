import { useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import { useEffect } from 'react'



export default function RecipeDeatailsModal({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])

    return (
        <div className="details-main-container">
            <div className="details-image-container">
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div className="details-info-container">
                <p>{recipe.url}</p>
                <h2>{recipe.title}</h2>
                <p>{recipe.totalTime} • {recipe.servings} servings</p>
                <p className='details-description'>{recipe.description}</p>
                <p>{recipe.author}</p>
                <Ingredients recipeId={recipeId}/>
                <Instructions recipeId={recipeId}/>
            </div>
        </div>
    )
}
