import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateRecipe, thunkUpdateRecipe } from "../../store/recipes"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function RecipeForm({ formType, recipe }){
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
    const [stateFormType, setStateFormType] = useState(formType)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        if (formType='edit' && recipe) {
            setTitle(recipe.title)
            setRecipeURL(recipe.recipeURL)
            setDescription(recipe.description)
            setImage(recipe.image)
            setPrepTime(recipe.prepTime)
            setCookTime(recipe.cookTime)
            setServings(recipe.servings)

            const tempIngredients = {}
            const tempCounterIng = []
            for (let i = 0; i < recipe.ingredients.length; i++) {
                tempIngredients[i+1] = recipe.ingredients[i]
                tempCounterIng.push(i+1)
            }
            setIngredients(tempIngredients)
            setIngredientCounter(tempCounterIng)

            const tempInstructions = {}
            const tempCounterInst = []
            for (let i = 0; i < recipe.instructions.length; i++) {
                tempInstructions[i+1] = recipe.instructions[i].text
                tempCounterInst.push(i+1)
            }
            setInstructions(tempInstructions)
            setInstructionCounter(tempCounterInst)
        }
    }, [formType, recipe])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newRecipe = new FormData()

        let instructionsString = ''
        for (let text of Object.values(instructions)) {
            instructionsString += `${text}&`
        }
        let ingredientsString = ''
        for (let ingredient of Object.values(ingredients)) {
            ingredientsString += `${ingredient.quantity},`
            ingredientsString += `${ingredient.measurement},`
            ingredientsString += `${ingredient.item},`
            if (!ingredient.refridgerated) {
                ingredientsString += `False&`
            } else {
              ingredientsString += `True&`
            }

        }
        newRecipe.append('title', title)
        newRecipe.append('recipe_url', recipeURL)
        newRecipe.append('description', description)
        newRecipe.append('prep_time', prepTime)
        newRecipe.append('cook_time', cookTime)
        newRecipe.append('servings', servings)
        newRecipe.append('ingredients', ingredientsString)
        newRecipe.append('instructions', instructionsString)
        newRecipe.append('image', image)

        let data = null
        if (stateFormType === 'create'){
            data = await dispatch(thunkCreateRecipe(newRecipe))
        } else {
            data = await dispatch(thunkUpdateRecipe(newRecipe, recipe.id))
        }
        if (data) {
            setErrors(data.errors)
        } else {
            closeModal()
            history.push('/profile')
        }
    }

    const removeIngredientRow = (key) => {
        const tempIngredients = ingredients
        delete tempIngredients[key]
        setIngredients({...tempIngredients})
        const newCounter = []
        for(let k of Object.keys(tempIngredients)) {
            newCounter.push(k)
        }
        setIngredientCounter(newCounter)
    }

    const ingredientInputs = ingredientCounter.map(key => {
        // ingredients[key] = {'quantity': 0, 'item':'', refridgerated: false}
        return (
            <div className='ingredients-input-div' key={key}>
                <label htmlFor='amount'>
                <input
                type='text'
                value={ingredients[key]?.quantity ? ingredients[key]?.quantity : ''}
                id='amount'
                className='form-input'
                required
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'quantity': e.target.value}})}
                />
                </label>
                <label htmlFor='unit'>
                <select
                value={ingredients[key]?.measurement ? ingredients[key]?.measurement : ''}
                id='unit'
                required
                className='select-field form-input'
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'measurement': e.target.value}})}
                name="measurement">
                    <option value="">choose one</option>
                    <option value="whole item">whole item</option>
                    <option value="bulb">bulb</option>
                    <option value="clove">clove</option>
                    <option value="cup">cup</option>
                    <option value="drop">drop</option>
                    <option value="fluid ounce">fluid ounce</option>
                    <option value="gram">gram</option>
                    <option value="head">head</option>
                    <option value="kilogram">kilogram</option>
                    <option value="large">large</option>
                    <option value="liter">liter</option>
                    <option value="medium">medium</option>
                    <option value="milligram">milligram</option>
                    <option value="milliliter">milliliter</option>
                    <option value="ounce">ounce</option>
                    <option value="pinch">pinch</option>
                    <option value="pint">pint</option>
                    <option value="pound">pound</option>
                    <option value="quart">quart</option>
                    <option value="small">small</option>
                    <option value="stalk">stalk</option>
                    <option value="stick">stick</option>
                    <option value="tablespoon">tablespoon</option>
                    <option value="teaspoon">teaspoon</option>
                </select>
                </label>
                <label htmlFor='ingredient'>
                <input
                type='text'
                value={ingredients[key]?.item}
                id='ingredient'
                className='form-input'
                required
                onChange={e => setIngredients({...ingredients, [key]: {...ingredients[key], 'item': e.target.value} })}
                />
                </label>
                <label htmlFor='refridgerated'>
                <input
                type='checkbox'
                value={ingredients[key]?.refridgerated}
                id='refridgerated'
                className='check-box'
                checked={ingredients[key]?.refridgerated === true}
                onChange={e => {
                    if(!ingredients[key]?.refridgerated){
                        setIngredients({...ingredients, [key]: {...ingredients[key], 'refridgerated': true}})
                    } else {
                        setIngredients({...ingredients, [key]: {...ingredients[key], 'refridgerated': false}})
                    }
                }}
                />
                </label>
                <span
                className="remove-add-row"
                onClick={e => removeIngredientRow(key)}>remove</span>
            </div>
        )
    })

    const removeInstructionRow = key => {
        const tempInstructions = instructions
        delete tempInstructions[key]
        setInstructions({...tempInstructions})
        const newCounter = []
        for(let k of Object.keys(tempInstructions)) {
            newCounter.push(k)
        }
        setInstructionCounter(newCounter)
    }

    const instructionInputs = instructionCounter.map(key => {
        return (
            <div className="instructions-input-div" key={key}>
                <label htmlFor='instruction'>
                {key}.
                <textarea
                value={instructions[key]}
                id='instruction'
                className='form-input'
                onChange={e => setInstructions({...instructions, [key]: e.target.value})}
                required
                />
                </label>
                <span
                className="remove-add-row"
                onClick={e => removeInstructionRow(key)}>remove</span>
            </div>
        )
    })

    const handleAddInstruction = e => {
        if(!instructionCounter.length) setInstructionCounter([1])
        else setInstructionCounter([...instructionCounter, instructionCounter[instructionCounter.length-1]+1])
    }

    const handleAddIngredient = e => {
        if(!ingredientCounter.length) setIngredientCounter([1])
        else setIngredientCounter([...ingredientCounter, ingredientCounter[ingredientCounter.length-1]+1])
    }

    return (
        <div className='form-modal-container'>
            <h1>{formType === 'edit' ? "Update" : "Share"} Your Recipe</h1>
            <form className='recipe-form'onSubmit={handleSubmit}>
                <label className='form-label-container' htmlFor="title">
                    Give your dish a name
                    <input
                    type='text'
                    value={title}
                    id='title'
                    className='form-input'
                    onChange={e => setTitle(e.target.value)}
                    required
                    />
                </label>
                <p className={errors?.title ? 'errors': 'no-errors'}>{errors?.title ? errors?.title : ''}</p>
                <label className='form-label-container' htmlFor="image">
                    Choose a mouthwatering image
                    <input
                    type='file'
                    id='image'
                    className='form-input'
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    required={formType==="create"}
                    />
                </label>
                <p className={errors?.image ? 'errors': 'no-errors'}>{errors?.image ? errors.image : ''}</p>
                <label className='form-label-container' htmlFor="recipeURL">
                    Share your recipe url
                    <input
                    type='text'
                    value={recipeURL}
                    id='recipeURL'
                    className='form-input'
                    onChange={e => setRecipeURL(e.target.value)}
                    />
                </label>
                <p className={errors?.recipe_url ? 'errors': 'no-errors'}>{errors?.recipe_url ? errors.recipe_url : ''}</p>
                <label className='form-label-container' htmlFor="description">
                    Tell us what makes this dish so delicious
                    <textarea
                    value={description}
                    id='description'
                    className='form-input'
                    onChange={e => setDescription(e.target.value)}
                    required
                    />
                </label>
                <p className={errors?.description ? 'errors': 'no-errors'}>{errors?.description ? errors.description : ''}</p>
                <div className='form-time-servings-div'>
                <label className='form-label-container' htmlFor="prep-time">
                    Prep Time
                    <input
                    type='number'
                    min={1}
                    value={prepTime}
                    id='prep-time'
                    className='form-input'
                    onChange={e => setPrepTime(e.target.value)}
                    required
                    />
                </label>
                <label className='form-label-container' htmlFor="cook-time">
                    Cook Time
                    <input
                    type='number'
                    min={0}
                    value={cookTime}
                    id='cook-time'
                    className='form-input'
                    onChange={e => setCookTime(e.target.value)}
                    />
                </label>
                <label className='form-label-container' htmlFor="servings">
                    Servings
                    <input
                    type='number'
                    min={1}
                    value={servings}
                    id='servings'
                    className='form-input'
                    onChange={e => setServings(e.target.value)}
                    required
                    />
                </label>
                </div>
                <div className='form-time-servings'>
                    <span className={errors?.prep_time ? 'num-errors': 'no-num-errors'}>{errors?.prep_time ? errors.prep_time : ''}</span>
                    <span className={errors?.cook_time ? 'num-errors': 'no-num-errors'}>{errors?.cook_time ? errors.cook_time : ''}</span>
                    <span className={errors?.servings ? 'num-errors': 'no-num-errors'}>{errors?.servings ? errors.servings : ''}</span>
                </div>
                <h4 className='ingredients-form-header'>Add ingredients to your recipe...</h4>
                <p className={errors?.igredients ? 'errors': 'no-errors'}>{errors?.ingredients ? errors.ingredients : ''}</p>
                <div className='ingredient-headers'>
                    <span>Amount</span> <span>Unit</span> <span>Ingredient</span> <span>Refridgerated</span>
                </div>
                {ingredientInputs}
                <div>
                    <span
                    className="remove-add-row"
                    onClick={handleAddIngredient}>+ add ingredient</span>
                </div>
                <div>
                <h4 className='instructions-form-header'>Tell us how you make it...</h4>
                    <p className={errors?.instructions ? 'errors': 'no-errors'}>{errors?.instructions ? errors.instructions : ''}</p>
                </div>
                <div className='instructions-div'>
                  {instructionInputs}
                </div>
                <div>
                <span
                className="add-a-step"
                onClick={handleAddInstruction}>+ add a step</span>
                </div>
                <p className={Object.values(errors).length ? 'errors': 'no-errors'}>{Object.values(errors).length ? 'There is at least one invalid field that we need you to change.' : ''}</p>
            <button className="submit-button" type='submit'>{formType === 'edit' ? "Update" : "Share"} Recipe</button>
            </form>
        </div>
    )
}
