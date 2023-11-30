import { useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import Comments from '../comments'
import PostComment from '../comments/PostComment'


export default function RecipeDetailsModal({ recipeId }) {
    const user = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes[recipeId])
    const comments = useSelector(state => state.recipes[recipeId].comments)


    return (
        <div className="details-main-container">
            <div className="details-image-container">
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div className="details-info-container">
                <div>
                    <p>{recipe.url}</p>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.totalTime} • {recipe.servings} servings</p>
                    <p className='details-description'>{recipe.description}</p>
                    <p style={{fontWeight: 'bold'}}>{recipe.author}</p>
                    <Ingredients recipeId={recipeId}/>
                    <Instructions recipeId={recipeId}/>
                    <Comments recipeId={recipeId}/>
                </div>
                <div className="comment-input-container">
                    <p className={`total-comments ${!user ? 'no-user-total-comments' : ''}`}>{comments.length} Comments</p>
                    {user && <PostComment recipeId={recipe.id}/>}
                </div>
            </div>
        </div>
    )
}
