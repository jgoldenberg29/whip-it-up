import { useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'




export default function RecipeDeatailsModal() {
    const recipes = useSelector(state => state.recipes)



    return (
        <div>
            <Ingredients/>
            <Instructions/>
        </div>
    )
}
