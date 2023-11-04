import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import SavedRecipes from "./SavedRecipes"
import SharedRecipes from "./SharedRecipes"



export default function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [cardsToggle, setCardsToggle] = useState('saved')
    const [savedRecipes, setSavedRecipes] = useState([])
    const [sharedRecipes, setSharedRecipes] = useState([])

    useEffect(() => {
        if(user) {
            if(user.savedRecipes.length) {
                const saved = []
                for (let recipeId of user?.savedRecipes) {
                    saved.push(recipes[recipeId])
                }
                setSavedRecipes(saved)
            }
            if(user.sharedRecipes?.length) {
                const shared = []
                for (let recipeId of user?.sharedRecipes) {
                    shared.push(recipes[recipeId])
                }
                setSharedRecipes(shared)
        }
        }
    }, [user, recipes])

    if(!user || !Object.values(recipes).length){
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
                    <SavedRecipes />
                </div>
            :
                <div>
                    <SharedRecipes />
                </div>
            }
        </div>
    )
}
