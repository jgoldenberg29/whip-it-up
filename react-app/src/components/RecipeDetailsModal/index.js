import { useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'




export default function RecipeDeatailsModal({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])



    return (
        <div>
            <div>
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div>
                <p>{recipe.url}</p>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.author}</p>
                <Ingredients recipeId={recipeId}/>
                <Instructions recipeId={recipeId}/>
            </div>
        </div>
    )
}
