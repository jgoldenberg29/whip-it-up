import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkDeleteRecipe } from "../../store/recipes";


export default function DeleteRecipeModal({ recipeId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState()

    const handleDelete = async (e) => {
        const data = await dispatch(thunkDeleteRecipe(recipeId))
        if(data) setErrors(data.errors)
        else {
            closeModal()
        }
    }

    return (
        <div className="form-modal-container delete-modal">
            <h1>Remove Recipe</h1>
            <p className='delete-prompt'>Are you sure you want to keep this recipe all to yourself?</p>
            <p className='errors'>{errors?.message ? errors.message : ''}</p>
            <button className='delete-submit-button' onClick={handleDelete}>{'yes (remove)'}</button>
            <button className='delete-submit-button' onClick={e => closeModal()}>{'No (keep)'}</button>
        </div>
    )
}
