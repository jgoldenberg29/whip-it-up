import { useSelector } from 'react-redux'


export default function Ingredients() {
    const recipes = useSelector(state => state.recipes)

    return (
        <h1>Ingredients</h1>
    )
}
