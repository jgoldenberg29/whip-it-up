import { useSelector } from 'react-redux'


export default function Instructions() {
    const recipes = useSelector(state => state.recipes)

    return (
        <h1>Instructions</h1>
    )
}
