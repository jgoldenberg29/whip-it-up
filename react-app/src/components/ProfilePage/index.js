import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"



export default function() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useState(state => state.recipes)
    const [cardsToggle, setCardsToggle] = useState('saved')
    const [savedRecipes, setSavedRecipes] = useState([])
    const [sharedRecipes, setSharedRecipes] = useState([])

    useEffect(() => {
        if(user.savedRecipes.length) {
            const saved = []
            for (let recipeId of user?.savedRecipes) {
                saved.push(recipes[recipeId])
            }
            setSavedRecipes(saved)
        }
        if(user.SharedRecipes.length) {
            const shared = []
            for (let recipeId of user?.sharedRecipes) {
                shared.push(recipes[recipeId])
            }
            setSharedRecipes(shared)
        }
    }, [user, recipes])

    if(!Object.values(recipes).length){
        dispatch(thunkGetAllRecipes())
        return null
    }

    return (
        <div>
            <div className='profile-user-info'>
                <h2>{user.firstName} {user.LastName}</h2>
                <p>{user.username}</p>
            </div>
            <div>
                {/* create class highlighting the chosen category */}
                <span onClick={e => setCardsToggle('shared')}>Shared</span><span onClick={e => setCardsToggle('saved')}>Saved</span>
            </div>
            {cardsToggle === 'saved' ?
                <div>
                    {savedRecipes.length ?
                        <div>
                            {savedRecipes.map(recipe => {
                        return (
                        <div className='recipe-card-container' key={recipe.id}>
                            <RecipeCard recipeId={recipe.id}/>
                        </div>
                        )
                    })}
                        </div>
                    :
                    <div>
                       <span>Explore some new recipes!</span>
                       <NavLink exact to="/">Explore</NavLink>
                    </div>
                    }
                </div>
            :
                <div>
                    {sharedRecipes.length ?
                        <div>
                            {sharedRecipes.map(recipe => {
                        return (
                        <div className='recipe-card-container' key={recipe.id}>
                            <RecipeCard recipeId={recipe.id}/>
                        </div>
                        )
                    })}
                        </div>
                    :
                    <div>
                    <span>You have not shared any recipes yet...let's get started!</span>
                    <NavLink exact to="/recipes/new">Share Recipe</NavLink>
                    </div>
                    }
                </div>
            }
        </div>
    )
}
