import { useState } from 'react'
import { useSelector } from 'react-redux'
import openModalButton from '../OpenModalButton'


export default function Comments({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])
    const user = useSelector(state => state.session.user)
    const [showComments, setShowComments] = useState()


    return (
        <>
            <div className='details-section-header'>
            <h3>Comments</h3>
            <span onClick={e => setShowComments(!showComments)}>{showComments ? <i className="fa-sharp fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i> }</span>
            </div>
            {showComments && <div>
                <ul className="detials-ingredient-list">
                    {recipe.comments.map(comment => {
                            return (
                                <li key={comment.id} style={{listStyleType: 'none', marginBottom: '5px'}}>
                                    <span style={{fontWeight: 'bold'}}>{comment.user.firstName} </span>
                                    <span>{comment.text}</span>
                                    {comment.user.id === user?.id &&
                                        <div>
                                            <button><i className="fa-solid fa-trash-can"></i></button>
                                            <button><i className="fa-solid fa-pen-to-square"></i></button>
                                        </div>
                                    }
                                </li>
                            )
                    })}
                </ul>
            </div>}
        </>
    )
}
