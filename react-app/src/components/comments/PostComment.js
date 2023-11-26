import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkPostComment } from "../../store/recipes";


export default function PostComment({recipeId}) {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const handleSubmit = async e => {
        e.preventDefault()

        const newComment = new FormData()
        newComment.append('text', comment)
        const data = await dispatch(thunkPostComment(newComment, recipeId))
        if (data) {
            setErrors(data.errors)
        } else {
            setComment('')
        }

    }

    return (
        <>
            <div className="errors">{errors?.text ? errors.text : ''}</div>
            <form onSubmit={handleSubmit}>
            <span className={errors?.text ? 'errors': 'no-errors'}>{errors?.text ? errors.text : ''}</span>
                <input
                    className="form-input"
                    placeholder="Tell us what you think..."
                    type='text'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button type='submit'><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </>
    )
}
