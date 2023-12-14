import { useSelector } from "react-redux"


export default function Rating({recipeId}) {
    const recipe = useSelector(state => state.recipes[recipeId])

    const starMap = [1,2,3,4,5].map(star => {
        const rating = recipe.avgRating
        const fullStarClass = Math.ceil(rating) >= star ? 'full-star' : 'hidden-star'
        const partialStarPercent = (rating % 1) * 100
        const partialStar = star - rating > 0 && star - rating < 1
        return (
            <span className='empty-star' key={star}>
                {partialStar
                ?
                <span className={fullStarClass} style={{width: `${partialStarPercent}%`}}></span>
                :
                <span className={fullStarClass}></span>}
            </span>
        )
    })

    return (
        <div className='stars-container'>
         {starMap}
        </div>
    )
}
