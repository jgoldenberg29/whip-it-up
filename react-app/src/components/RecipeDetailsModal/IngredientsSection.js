import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function Ingredients({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])
    const [showIngredients, setShowIngredients] = useState(true)


    return (
        <>
            <div className='details-section-header'>
            <h3>Ingredients</h3>
            <span onClick={e => setShowIngredients(!showIngredients)}>{showIngredients ? <i className="fa-sharp fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i> }</span>
            </div>
            {showIngredients && <div>
                <h4>Refridgerated</h4>
                <ul className="details-ingredient-list">
                    {recipe.ingredients.map(ingredient => {
                        if (ingredient.refridgerated) {
                            return (
                                <li key={ingredient.id}>
                                    <span>{ingredient.quantity} {ingredient.measurement === 'whole item' ? '' : ingredient.measurement} {ingredient.item}</span>
                                </li>
                            )
                        }
                    })}
                </ul>
                <h4>Pantry</h4>
                <ul className="details-ingredient-list">
                    {recipe.ingredients.map(ingredient => {
                        if (!ingredient.refridgerated) {
                            return (
                                <li key={ingredient.id}>
                                    <span>{ingredient.quantity} {ingredient.measurement} {ingredient.item}</span>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>}
        </>
    )
}
