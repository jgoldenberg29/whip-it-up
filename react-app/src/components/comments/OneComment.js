import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteComment, thunkEditComment } from '../../store/recipes'


export default function OneComment({ recipeId, comment }) {
    const dispatch = useDispatch()
    // const recipe = useSelector(state => state.recipes[recipeId])
    const user = useSelector(state => state.session.user)
    const [editting, setEdditing] = useState(false)
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
            setEdditing(false)
        }
    }

    if (editting) {
        return (
            <>
                <form onSubmit={handleUpdate}>
                    <span className={errors?.text ? 'errors': 'no-errors'}>{errors?.text ? errors.text : ''}</span>
                    <span className={errors?.message ? 'errors': 'no-errors'}>{errors?.message ? errors.message : ''}</span>
                    <textarea
                    className="form-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    />
                    <button>update</button>
                    <button onClick={() => setEdditing(false)}>cancel</button>
                </form>
            </>
        )
    }

    return (
        <>
            <li key={comment.id} style={{listStyleType: 'none', marginBottom: '5px'}}>
                <span style={{fontWeight: 'bold'}}>{comment.user.firstName} </span>
                <span>{comment.text}</span>
                {comment.user.id === user?.id &&
                    <div>
                        <button
                        onClick={() => setEdditing(true)}
                        ><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={() => handleDelete(comment.id)}><i className="fa-solid fa-trash-can"></i></button>

                    </div>
                }
            </li>
        </>
    )
}