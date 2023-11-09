import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function Instructions({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])
    const [showInstructions, setShowInstructions] = useState()
    return (
        <>
            <div className='details-section-header'>
            <h3>Instructions</h3>
            <span onClick={e => setShowInstructions(!showInstructions)}>{showInstructions ? <i className="fa-sharp fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i> }</span>
            </div>
            {showInstructions && <div>
                <ol className="detials-instructions-list">
                    {recipe.instructions.map(instruction => {
                            return (
                                <li key={instruction.id}>
                                    <span>{instruction.text}</span>
                                </li>
                            )
                    })}

                </ol>
            </div>}
        </>
    )
}
