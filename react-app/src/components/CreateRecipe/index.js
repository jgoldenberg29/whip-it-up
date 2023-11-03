import { useState } from "react"


export default function CreateRecipe(){
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [recipeURL, setRecipeURL] = useState('')
    const [description, setDescription] = useState('')
    const [prepTime, setPrepTime] = useState(0)
    const [cookTime, setCookTime] = useState(0)
    const [servings, setServings] = useState(0)
    const [ingredients, setIngredients] = useState({})
    const [instructions, setInstructions] = useState({})
    const [ingredientCounter, setIngredientCounter] = useState([1,2,3])
    const [instructionCounter, setInstructionCounter] = useState([1,2,3])
    const [errors, setErrors] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
    }

    console.log(ingredients)

    const ingredientInputs = ingredientCounter.map(key => {
        // handle state like the reducer using an object input value = key of object onChange sets value for that key with new object
        return (
            <div key={key}>
                <label htmlFor={`amount${key}`}>
                <input
                value={ingredients[key]?.quantity}
                id={`amount${key}`}
                className='form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'quantity': e.target.value}})}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.quantity ? errors.quantity : ''}</p> */}
                <label htmlFor={`unit${key}`}>
                <input
                value={ingredients[key]?.measurement}
                id={`unit${key}`}
                className='form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'measurement': e.target.value}})}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
                <label htmlFor={`ingredient${key}`}>
                <input
                value={ingredients[key]?.item}
                id={`ingredient${key}`}
                className='form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'item': e.target.value} })}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
                <label htmlFor={`refridgerated${key}`}>
                <input
                value={ingredients[key]?.refridgerated}
                id={`refridgerated${key}`}
                className='form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'refridgerated': e.target.value} })}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
            </div>
        )
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Share Your Recipe</h1>
                <label htmlFor="title">
                    Title
                    <input
                    value={title}
                    id='title'
                    className='form-input'
                    onchange={e => setTitle(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.title ? errors.title : ''}</p>
                <label htmlFor="image">
                    Choose Image
                    <input
                    id='image'
                    className='form-input'
                    accept="image/*"
                    onchange={e => setImage(e.target.files[0])}
                    />
                </label>
                <p className='create-form-errors'>{errors.image ? errors.image : ''}</p>
                <label htmlFor="recipeURL">
                    Site URL
                    <input
                    value={recipeURL}
                    id='recipeURL'
                    className='form-input'
                    onchange={e => setRecipeURL(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.recipe_url ? errors.recipe_url : ''}</p>
                <label htmlFor="description">
                    Description
                    <input
                    value={description}
                    id='description'
                    className='form-input'
                    onchange={e => setDescription(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.description ? errors.description : ''}</p>
                <label htmlFor="prep-time">
                    Prep Time
                    <input
                    value={prepTime}
                    id='prep-time'
                    className='form-input'
                    onchange={e => setPrepTime(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.prep_time ? errors.prep_time : ''}</p>
                <label htmlFor="cook-time">
                    Cook Time
                    <input
                    value={cookTime}
                    id='cook-time'
                    className='form-input'
                    onchange={e => setCookTime(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.cook_time ? errors.cook_time : ''}</p>
                <label htmlFor="servings">
                    Servings
                    <input
                    value={servings}
                    id='servings'
                    className='form-input'
                    onchange={e => setServings(e.target.value)}
                    />
                </label>
                <p className='create-form-errors'>{errors.servings ? errors.servings : ''}</p>
                <div>
                <span>Amount</span> <span>Unit</span> <span>Ingredient</span> <span>Refridgerated</span>
                </div>
                {ingredientInputs}
                <div>
                    <span onClick={e => setIngredientCounter([...ingredientCounter, ingredientCounter.length+1])}>+ add ingredient</span>
                </div>
            </form>
        </div>
    )
}
