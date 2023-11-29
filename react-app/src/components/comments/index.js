import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import openModalButton from '../OpenModalButton'
import { thunkDeleteComment } from '../../store/recipes'
import OneComment from './OneComment.js'


export default function Comments({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])
    const [showComments, setShowComments] = useState(true)

    return (
        <>
            <div className='details-section-header'>
            <h3>Comments</h3>
            <span onClick={e => setShowComments(!showComments)}>{showComments ? <i className="fa-sharp fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i> }</span>
            </div>
            {showComments && <div>
                <ul className="details-comments-list">
                    {recipe.comments.map(comment => {
                            return (
                                <OneComment comment={comment}/>
                            )
                    })}
                </ul>
            </div>}
        </>
    )
}
