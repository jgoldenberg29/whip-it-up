import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateRecipe } from "../../store/recipes"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function CreateRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
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

    const handleSubmit = async e => {
        e.preventDefault()
        const recipe = new FormData()


        let instructionsString = ''
        console.log(instructions)
        console.log(Object.values(instructions))
        for (let text of Object.values(instructions)) {
            console.log(text)
            console.log(instructionsString)
            instructionsString += `${text}/`
        }
        let ingredientsString = ''
        for (let ingredient of Object.values(ingredients)) {
            console.log(ingredientsString)
            ingredientsString += `${ingredient.quantity},`
            ingredientsString += `${ingredient.measurement},`
            ingredientsString += `${ingredient.item},`
            if (!ingredient.refridgerated) {
                ingredientsString += `False/`
            } else {
              ingredientsString += `True/`
            }

        }
        recipe.append('title', title)
        recipe.append('recipe_url', recipeURL)
        recipe.append('image', image)
        recipe.append('description', description)
        recipe.append('prep_time', prepTime)
        recipe.append('cook_time', cookTime)
        recipe.append('servings', servings)
        recipe.append('ingredients', ingredientsString)
        recipe.append('instructions', instructionsString)

        const data = await dispatch(thunkCreateRecipe(recipe))
        if (data) {
            setErrors(data.errors)
        } else {
            history.push('/profile')
        }
    }

    console.log(instructions)

    const ingredientInputs = ingredientCounter.map(key => {
        ingredients[key] = {'quantity':0, 'item':'', refridgerated: false}
        return (
            <div key={key}>
                <label htmlFor={`amount${key}`}>
                <input
                type='number'
                value={ingredients[key]?.quantity}
                id={`amount${key}`}
                className='form-input'
                required
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'quantity': e.target.value}})}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.quantity ? errors.quantity : ''}</p> */}
                <label htmlFor={`unit${key}`}>
                <select
                value={ingredients[key]?.measurement}
                id={`unit${key}`}
                required
                className='form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'measurement': e.target.value}})}
                name="measurement">
                    <option value="">choose one</option>
                    <option value="bulb">bulb</option>
                    <option value="clove">clove</option>
                    <option value="cup">cup</option>
                    <option value="drop">drop</option>
                    <option value="fluid ounce">fluid ounce</option>
                    <option value="gram">gram</option>
                    <option value="head">head</option>
                    <option value="kilogram">kilogram</option>
                    <option value="liter">liter</option>
                    <option value="milligram">milligram</option>
                    <option value="milliliter">milliliter</option>
                    <option value="ounce">ounce</option>
                    <option value="pint">pint</option>
                    <option value="pound">pound</option>
                    <option value="quart">quart</option>
                    <option value="stalk">stalk</option>
                    <option value="stick">stick</option>
                    <option value="tablespoon">tablespoon</option>
                    <option value="teaspoon">teaspoon</option>
                    <option value="whole">whole</option>
                </select>
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
                <label htmlFor={`ingredient${key}`}>
                <input
                type='text'
                value={ingredients[key]?.item}
                id={`ingredient${key}`}
                className='form-input'
                required
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'item': e.target.value} })}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
                <label htmlFor={`refridgerated${key}`}>
                <input
                type='checkbox'
                value={ingredients[key]?.refridgerated}
                id={`refridgerated${key}`}
                className='form-input'
                required
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'refridgerated': e.target.value} })}
                />
                </label>
                {/* <p className='create-form-errors'>{errors.title ? errors.title : ''}</p> */}
            </div>
        )
    })

    const instructionInputs = instructionCounter.map(key => {
        return (
            <div key={key}>
                <label htmlFor={`instruction${key}`}>
                {key}.
                <textarea
                value={instructions[key]}
                id={`instructions${key}`}
                className='form-input'
                onChange={e => setInstructions({...instructions, [key]: e.target.value})}
                required
                />
                </label>
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
                    type='text'
                    value={title}
                    id='title'
                    className='form-input'
                    onChange={e => setTitle(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.title ? errors?.title : ''}</p>
                <label htmlFor="image">
                    Choose Image
                    <input
                    type='file'
                    id='image'
                    className='form-input'
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.image ? errors.image : ''}</p>
                <label htmlFor="recipeURL">
                    Site URL
                    <input
                    type='text'
                    value={recipeURL}
                    id='recipeURL'
                    className='form-input'
                    onChange={e => setRecipeURL(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.recipe_url ? errors.recipe_url : ''}</p>
                <label htmlFor="description">
                    Description
                    <textarea
                    value={description}
                    id='description'
                    className='form-input'
                    onChange={e => setDescription(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.description ? errors.description : ''}</p>
                <label htmlFor="prep-time">
                    Prep Time
                    <input
                    type='number'
                    value={prepTime}
                    id='prep-time'
                    className='form-input'
                    onChange={e => setPrepTime(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.prep_time ? errors.prep_time : ''}</p>
                <label htmlFor="cook-time">
                    Cook Time
                    <input
                    type='number'
                    value={cookTime}
                    id='cook-time'
                    className='form-input'
                    onChange={e => setCookTime(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.cook_time ? errors.cook_time : ''}</p>
                <label htmlFor="servings">
                    Servings
                    <input
                    type='number'
                    value={servings}
                    id='servings'
                    className='form-input'
                    onChange={e => setServings(e.target.value)}
                    required
                    />
                </label>
                <p className='create-form-errors'>{errors?.servings ? errors.servings : ''}</p>
                <div>
                <span>Amount</span> <span>Unit</span> <span>Ingredient</span> <span>Refridgerated</span>
                </div>
                {ingredientInputs}
                <div>
                    <span onClick={e => setIngredientCounter([...ingredientCounter, ingredientCounter.length+1])}>+ add ingredient</span>
                </div>
                <div>
                    <span>Cooking Instructions</span>
                </div>
                {instructionInputs}
                <div>
                <span onClick={e => setInstructionCounter([...instructionCounter, instructionCounter.length+1])}>+ add a step</span>
                </div>
            <button type='submit'>Share Recipe</button>
            </form>
        </div>
    )
}