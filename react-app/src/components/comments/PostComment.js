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
            <span className={errors?.text ? 'errors': 'no-comment-errors'}>{errors?.text || errors?.message ? `${errors?.text}${errors?.message}` : ''}</span>
            <form
            className="comment-form"
            onSubmit={handleSubmit}>
                <textarea
                    className="form-input create-comment-input"
                    placeholder="Tell us what you think..."
                    type='text'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button
                type='submit'
                className="submit-comment-button"
                >
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </>
    )
}
