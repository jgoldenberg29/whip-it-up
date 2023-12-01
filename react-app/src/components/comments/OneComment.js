import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteComment, thunkEditComment } from '../../store/recipes'


export default function OneComment({ recipeId, comment }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [editting, setEditing] = useState(false)
    const [text, setText] = useState(comment.text)
    const [errors, setErrors] = useState({})

    const handleDelete = async (id) => {
        const data = await dispatch(thunkDeleteComment(id))
        if (data) {
            setErrors(data)
        }
    }

    const handleUpdate = async e => {
        e.preventDefault()

        const updatedComment = new FormData()
        updatedComment.append('text', text)
        const data = await dispatch(thunkEditComment(updatedComment, comment.id))
        if (data) {
            setErrors(data.errors)
        } else {
            setEditing(false)
        }
    }

    if (editting) {
        return (
            <div className='edit-comment-container'>
                <span className={errors?.text ? 'errors': 'no-errors'}>{errors?.text ? errors.text : ''}</span>
                    <span className={errors?.message ? 'errors': 'no-errors'}>{errors?.message ? errors.message : ''}</span>
                <form
                className='edit-comment-form'
                onSubmit={handleUpdate}>
                    <textarea
                    className="form-input edit-comment-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    />
                    <div className='cancel-submit-edit-comment-div'>
                        <button className='submit-edit-comment-button'><i className="fa-solid fa-paper-plane"></i></button>
                        <button className='cancel-edit-comment-button'onClick={() => setEditing(false)}><i className="fa-solid fa-ban"></i></button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <>
            <li key={comment.id} className ="single-comment">
                <span style={{fontWeight: 'bold'}}>{comment.user.firstName} </span>
                <span>{comment.text}</span>
                {comment.user.id === user?.id &&
                    <div className='edit-delete-comment-div'>
                        <button
                        className='edit-comment-button'
                        onClick={() => setEditing(true)}
                        ><i className="fa-solid fa-pen-to-square"></i></button>
                        <button
                        className='delete-comment-button'
                        onClick={() => handleDelete(comment.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                }
            </li>
        </>
    )
}
