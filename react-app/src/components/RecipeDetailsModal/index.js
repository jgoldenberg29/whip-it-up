import { useDispatch, useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import Comments from '../comments'
import PostComment from '../comments/PostComment'
import { thunkSaveRecipe, thunkUnsaveRecipe } from '../../store/session'
import { useState } from 'react'


export default function RecipeDetailsModal({ recipeId }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes[recipeId])
    const comments = useSelector(state => state.recipes[recipeId].comments)
    const [errors, setErrors] = useState({})

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

    const saveButtonClass = user ? 'details-save-unsave' : 'details-save-unsave-hidden'


    return (
        <div className="details-main-container">
            <div className="details-image-container">
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div className="details-info-container">
                    {user?.savedRecipes.indexOf(recipeId) !== -1 ? <button
                    style={{backgroundColor: '#f9c54d',}} className={saveButtonClass} onClick={e => handleUnsave(recipeId)}>unsave</button> : <button
                    style={{backgroundColor: '#f9c54d',}} className={saveButtonClass} onClick={e => handleSave(recipeId)}>save</button>}
                <div>
                    {/* <p>{recipe.recipeURL}</p> */}
                    <h2>{recipe.title}</h2>
                    <p>{recipe.totalTime} • {recipe.servings} servings</p>
                    <p className='details-description'>{recipe.description}</p>
                    {/* <p style={{fontWeight: 'bold'}}>{recipe.author}</p> */}
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
