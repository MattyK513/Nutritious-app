import React from "react";
import ShoppingList from './components/ShoppingList';
import RecipeSearch from './components/RecipeSearch';
import firebaseConfig from './firebaseConfig.json';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove, off} from 'firebase/database';
import { getAuth } from 'firebase/auth';

initializeApp(firebaseConfig);
const database = getDatabase();
const shoppingListInDB = ref(database, 'shoppingList');


function App() {

  const [groceryList, setGroceryList] = React.useState([]);
  const [groceryInput, setGroceryInput] = React.useState("");
  const [groceryListIsDisplayed, setGroceryListIsDisplayed]  = React.useState(false);
  const [recipeSearchResults, setRecipeSearchResults] = React.useState([]);
  const [searchMetaData, setSearchMetaData] = React.useState({});
  const [searchString, setSearchString] = React.useState('');
  const [appKey, setAppKey] = React.useState('384be6582807f7e4df0b77949c4f8574');

  React.useEffect(() => {
    getGroceryListFromDB();
    return () => {
      off(shoppingListInDB, 'value', getGroceryListCallback);
    };
  }, []);

  const getGroceryListCallback = (snapshot) => {
    const groceryItems = snapshot.val() ? Object.entries(snapshot.val()) : [];
    setGroceryList(groceryItems);
  };

  function getGroceryListFromDB() {
    try {
      const unsubscribe = onValue(shoppingListInDB, getGroceryListCallback);
      if (!unsubscribe) {
        console.error("Error retrieving list from database");
      }
    } catch (error) {
      console.error("Error retrieving list from database");
    };
  };

  function addToList() {
    if (groceryInput) {
      push(shoppingListInDB, groceryInput)
        .then(() => {setGroceryInput("")})
        .then(() => {getGroceryListFromDB()})
        .catch(error => console.error("Error adding item to database:", error))
    }
  };

  function addToListfromRecipe(event) {
    return new Promise((resolve, reject) => {
      push(shoppingListInDB, event.target.dataset.item)
      .then(() => {resolve("Success")})
      .catch(error => {
        console.error("Error adding ingredient to database:", error);
        reject(error);
      })
    })
  };

  function deleteItem(event) {
    const itemLocationInDB = ref(database, `shoppingList/${event.target.id}`);
    remove(itemLocationInDB)
      .then(() => getGroceryListFromDB())
      .catch(error => console.error("Error removing item from online database:", error))
  };

  function updateGroceryInput(event) {
    setGroceryInput(event.target.value);
  };

  function toggleDisplay() {
    setGroceryListIsDisplayed(prevDisplay => !prevDisplay);
  };

  function updateSearchString(input) {
    let baseString = `https://api.edamam.com/api/recipes/v2?type=public&app_id=2e9caf28&app_key=${appKey}`
    setSearchString(baseString + input);
  };

  /*function setSearchStringForPagination(url) {
    setSearchString(url);
  };*/

  function searchRecipes() {
    if (searchString) {
      setRecipeSearchResults([]);
      fetch(searchString)
        .then(res => res.json())
        .then(data => {
            const {from, to, count, _links : links, hits} = data;
            setSearchMetaData(prevData => ({from: from, to: to, count: count, links: links}))
            if (hits && hits.length) {hits.map(hit => {
              const {label, url, yield : servings, dietLabels, cautions, ingredients, calories, source, totalDaily} = hit.recipe;
              const {FAT : fat, CHOCDF : carbs, FIBTG : fiber, SUGAR : sugar, PROCNT: protein} = hit.recipe.totalNutrients;
              setRecipeSearchResults(prevResults => [
                ...prevResults, {
                  name: label,
                  url: url,
                  image: hit.recipe.images.SMALL,
                  servings: servings,
                  dietLabels: dietLabels,
                  cautions: cautions,
                  ingredients: ingredients.map(ing => {return {text: ing.text, food: ing.food, quantity: ing.quantity, id: ing.foodId}}),
                  calories: calories,
                  source: source,
                  fat: fat,
                  carbs: carbs,
                  fiber: fiber,
                  sugar: sugar,
                  protein: protein,
                  totalDaily: totalDaily
                }
              ])
            })}
        })
        .catch(error => console.error("Error:", error))
    }
  };

  return (
    <div>
      {
        groceryListIsDisplayed ?
        <div>
          <header>
            <h1>Grocery List</h1>
            <p onClick={toggleDisplay}>go to Recipe Search</p>
          </header>
          <ShoppingList
            groceryList={groceryList}
            groceryInput={groceryInput}
            handleChange={updateGroceryInput}
            addToList={addToList}
            deleteItem={deleteItem}
          />
        </div> :
        <div>
          <header>
            <h1>Recipe Search</h1>
            <p onClick={toggleDisplay}>go to Grocery List</p>
          </header>
          <RecipeSearch
            search={searchRecipes}
            updateSearchString={updateSearchString}
            results={recipeSearchResults}
            metaData={searchMetaData}
            add={addToListfromRecipe}
          />
        </div>
      }
    </div>
  );
}

export default App;