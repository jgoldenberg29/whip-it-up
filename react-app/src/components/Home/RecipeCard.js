import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import RecipeDeatailsModal from '../RecipeDetailsModal'



export default function RecipeCard({ recipeId }) {
    const user = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes[recipeId])

    return (
        <>
            <OpenModalButton
            id="recipecard-image-button"
            className='recipecard-image-button'
            style={{border: 'none', background: 'none', width: '100%'}}
            buttonText={<img className='recipecard-image' src={recipe?.image} alt='tasty food'/>}
            modalComponent={<RecipeDeatailsModal recipeId={recipeId}/>}
            />
        </>
    )
}
