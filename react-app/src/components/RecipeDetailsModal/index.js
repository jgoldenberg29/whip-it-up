import { useSelector } from 'react-redux'
import Instructions from './InstructionsSection'
import Ingredients from './IngredientsSection'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import { useEffect } from 'react'



export default function RecipeDeatailsModal({ recipeId }) {
    const recipe = useSelector(state => state.recipes[recipeId])

    // useEffect(() => {

    //     // Registering the 'begin' event and logging it to the console when triggered.
    //     Events.scrollEvent.register('begin', (to, element) => {
    //       console.log('begin', to, element);
    //     });

    //     // Registering the 'end' event and logging it to the console when triggered.
    //     Events.scrollEvent.register('end', (to, element) => {
    //       console.log('end', to, element);
    //     });

    //     // Updating scrollSpy when the component mounts.
    //     scrollSpy.update();

    //     // Returning a cleanup function to remove the registered events when the component unmounts.
    //     return () => {
    //       Events.scrollEvent.remove('begin');
    //       Events.scrollEvent.remove('end');
    //     };
    //   }, []);

    return (
        <div style={{overflow: 'scroll', height: '500px'}}>
            <div>
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div>
                <p>{recipe.url}</p>
                <h2>{recipe.title}</h2>
                <p>{recipe.totalTime} • {recipe.servings} servings</p>
                <p>{recipe.description}</p>
                <p>{recipe.author}</p>
                <Ingredients recipeId={recipeId}/>
                <Instructions recipeId={recipeId}/>
            </div>
        </div>
    )
}
