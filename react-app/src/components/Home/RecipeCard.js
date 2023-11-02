import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import RecipeDeatailsModal from '../RecipeDetailsModal'


export default function RecipeCard({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])


    return (
        <>
            <OpenModalButton
            buttonText={<img src={recipe.image} alt='tasty food'/>}
            modalComponent={<RecipeDeatailsModal recipeId={recipeId}/>}
            />
        </>
    )
}
