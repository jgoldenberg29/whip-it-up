# Whip it up
### Share your favorite recipes with the world

_Whip it up_ is a full stack web application for sharing discovering recipes with a user interface inspired by Pinterest. From the moment you land on our homepage, you're greeted with a diverse array of recipes catering to any occasion or palate. Whip It Up takes your culinary journey to the next level. Upon signing up, a world of culinary possibilities unfolds. Share your favorite recipes, curate a personalized collection by saving recipes to your profile, and engage with a vibrant community by commenting on recipes shared by fellow chefs.

## Overview

Whip It Up is a delightful full-stack web application designed to make your culinary journey even more enjoyable. With a robust Python, Flask, and SQLAlchemy backend paired with a dynamic React frontend, this application offers three key features: Recipes, Saves, and Comments.

## Features

- Users are authenticated using hashed passwords in order to ensure the security of the user's data. Their security is further enhanced through the use of an SQLAlchemy ORM (Object Relational Mapper) and toolkit in our API.
- The full functionality of the site can be experienced through signing up or logging, as well as through our "Demo User".  

### 1. Recipes

Recipes allow users to explore a diverse collection of culinary delights contributed by the community. Each recipe provides a detailed description, as well as lists of ingredients, and step-by-step instructions to guide them through the cooking process. Whether you're a seasoned chef or a kitchen novice, Whip It Up's Recipes are your go-to resource for culinary inspiration. A user can view all recipes on the site as well as create, edit and delete their own recipes. The collection of the recipes a user has shared can be viewed on their profile page.

- Users can share(create) a new recipe.
- Users can view(read) all recipes.
- Users can view(read) their shared recipes
- Users can edit(update) their shared recipes.
- Users can remove(delete) their recipes.

### 2. Saves

Never lose track of your favorite recipes again! The Saves feature allows users to bookmark their preferred recipes for easy access. With a simple click, users can add or remove a recipe to their saved collection. Users saved recipes are stored and viewed through their profile page along side their shared collection. users can toggle back and forth between shared and saved recipes with a single click so all their recipes are easily accessible.

- User can save(create) any recipe.
- User can view(read) their saved recipes.
- User can unsave(delete) a saved recipe.

### 3. Comments

Engage with others in the community through the Comments feature! Share your thoughts, tips, and experiences with fellow chefs by leaving comments on specific recipes. Whether you've added your unique twist to a recipe or want to express your appreciation, Comments provide a space for users to collaborate and celebrate the joy of cooking together. Users can view comments from other chefs as well as add, edit and delete their own.

- User can view(create) a new comment.
- User can view(read) all comments.
- User can edit(update) their comments.
- User can remove(delete) their recipes.

## Getting Started

To experience the magic of Whip It Up in production visit:

 https://whipitup.onrender.com/

To get a look behind the scenes on your local machine:

1. **Clone the Repository:**
   ```
   git clone https://github.com/yourusername/whip-it-up.git](https://github.com/jgoldenberg29/whip-it-up.git
   ```

2. **Backend Setup:**
   - From the 'root' directory:

     - install dependencies, enter the pipenv shell:
      ```
      pipenv install
      pipenv shell
      ```
     - Set up the local database:
      ```
      flask db init
      flask db migrate
      flask db upgrade
      flask seed all
      ```
     - Run the Flask server:
      ```
      flask run
      ```

3. **Frontend Setup:**
   - Navigate to the `react-app` directory and install dependencies:
     ```
     cd react-app
     npm install
     ```
   - Run the React frontend:
     ```
     npm start
     ```

4. **Access Whip It Up:**
   - Open your web browser and visit http://localhost:3000 to view the site locally

## Notable Functionality and Code
1. Share Recipe Form with variable number of input fields:
   - The Whip it up recipes are organized into three distinct tables, Recipes, Ingredients and Instructions. This allows users to enter recipe information in the simpliest most hassle free form and still allow for control for clean and efficient rendering of the data once it has been added. The Share Recipe form has variable inputs for ingredients and instructions allowing users to add and remove rows to the form with the click of a button.
   - This required:
     - Controlling an unknown number of inputs with nested objects in the react form, which I accomplished through a system based on the redux store and reducer functionality
     - Converting the objects to character seperated strings in order to transfer the data from the React/Javascript frontend to the Python/Flask backend where they could be parsed and stored in the database.
       ```js
       const ingredientInputs = ingredientCounter.map(key => { 
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
                    <option value="can">can</option>
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
          ```
         - To see more code from my recipe form, please visit the file at: https://github.com/jgoldenberg29/whip-it-up/blob/main/react-app/src/components/RecipeForm/index.js
2. The Whip it up is comprised of a clean collection of nested components to maximize the the simplicity, readability and ease of maintenance for the applications code base. A good example of this is the comments section of our Recipes, which nests a comments component and then a single comment component. keeping both of the nested component files to less than 15 lines of straightforward and jsx that is comprehensible on first read.

   Recipe Details Modal
   ```js
       <div className="details-main-container">
            <div className="details-image-container">
                <img src={recipe.image} alt='tasty food'/>
            </div>
            <div className="details-info-container">
                    {user?.savedRecipes.indexOf(recipeId) !== -1 ? <button
                    style={{backgroundColor: '#f9c54d',}} className='details-save-unsave' onClick={e => handleUnsave(recipeId)}>unsave</button> : <button
                    style={{backgroundColor: '#f9c54d',}} className='details-save-unsave' onClick={e => handleSave(recipeId)}>save</button>}
                <div>
                    {/* <p>{recipe.recipeURL}</p> */}
                    <h2>{recipe.title}</h2>
                    <p>{recipe.totalTime} • {recipe.servings} servings</p>
                    <p className='details-description'>{recipe.description}</p>
                    {/* <p style={{fontWeight: 'bold'}}>{recipe.author}</p> */}
                    <Ingredients recipeId={recipeId}/>
                    <Instructions recipeId={recipeId}/>
                    <Comments recipeId={recipeId}/>
                </div>
                <div className="comment-input-container">
                    <p className={`total-comments ${!user ? 'no-user-total-comments' : ''}`}>{comments.length} Comments</p>
                    {user && <PostComment recipeId={recipe.id}/>}
                </div>
            </div>
        </div>
     ```

      Comments
     ```js
         <>
            <div className='details-section-header'>
            <h3>Comments</h3>
            <span onClick={e => setShowComments(!showComments)}>{showComments ? <i className="fa-sharp fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i> }</span>
            </div>
            {showComments && <div>
                <ul className="details-comments-list">
                    {recipe.comments.map(comment => {
                            return (
                                <OneComment comment={comment}/>
                            )
                    })}
                </ul>
            </div>}
        </>
     ```
      One Comment
     ```js
         <>
            <li key={comment.id} className ="single-comment">
                <span style={{fontWeight: 'bold'}}>{comment.user.firstName} </span>
                <span>{comment.text}</span>
                {comment.user.id === user?.id &&
                    <div className='edit-delete-comment-div'>
                        <button
                        className='edit-comment-button'
                        onClick={() => setEdditing(true)}
                        ><i className="fa-solid fa-pen-to-square"></i></button>
                        <button
                        className='delete-comment-button'
                        onClick={() => handleDelete(comment.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                }
            </li>
        </>
     ```
   

## Feedback and Support

We love hearing from our users! If you have any feedback, suggestions, or encounter issues, please don't hesitate to reach out. Visit our [issue tracker](https://github.com/yourusername/whip-it-up/issues) to report bugs or propose new features.

Thank you for making Whip It Up a flavorful and thriving community. Happy cooking!

👩‍🍳👨‍🍳🍽️
