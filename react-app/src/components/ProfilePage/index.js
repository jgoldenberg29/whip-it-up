import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllRecipes } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import RecipeCard from "../Home/RecipeCard"
import SavedRecipes from "./SavedRecipes"
import SharedRecipes from "./SharedRecipes"
import { useHistory } from "react-router-dom"
import { useSearch } from "../../context/Search"
import profileImage from './tempProfileImage.png'



export default function ProfilePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipes)
    const [cardsToggle, setCardsToggle] = useState('saved')
    const [savedRecipes, setSavedRecipes] = useState([])
    const [sharedRecipes, setSharedRecipes] = useState([])
    const {setOnHomePage,setShowSearch} = useSearch()

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

    useEffect(() => {
        setOnHomePage(false)
        setShowSearch(false)
    }, [])

    if(!Object.values(recipes).length){
        dispatch(thunkGetAllRecipes())
        return null
    }

    if(!user) {
        history.push('/')
        return null
    }

    const savedSelectedClass = cardsToggle === 'saved' ? 'shared-saved-span selected' : 'shared-saved-span'
    const sharedSelectedClass = cardsToggle === 'shared' ? 'shared-saved-span selected' : 'shared-saved-span'

    return (
        <div className='profile-main-container'>
            <div className='profile-user-info'>
                <img className="profile-image" src={profileImage} alt='chef icon' />
                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                <p>@{user.username}</p>
            </div>
            <div className='shared-saved-div'>
                {/* create class highlighting the chosen category */}
                <span
                className={sharedSelectedClass}
                id='shared-toggle'
                onClick={e => setCardsToggle('shared')}
                >
                Shared
                </span>
                <span
                className={savedSelectedClass}
                id='saved-toggle'
                onClick={e => setCardsToggle('saved')}
                >
                Saved
                </span>
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
