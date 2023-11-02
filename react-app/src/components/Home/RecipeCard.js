import { useSelector } from 'react-redux'


export default function RecipeCard({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])

    return (
        <>
            <img src={recipe.image} alt='tasty food'/>
        </>
    )
}
