import React from "react";
import Ingredient from "./Ingredient";

export default function Result({data, add, ...rest}) {

    const [ingredientsAreVisible, setIngredientsAreVisible] = React.useState(false);

    function toggleIngredients() {
        setIngredientsAreVisible(prevVis => !prevVis);
    };

    return (
        <div className="result-container">
            <div className="result-top-div">
                <a href={data.url} target="_blank"><img src={data.image.url} alt="Image unavailable"></img></a>
                <div className="name-and-link-container">
                    <a href={data.url} target="_blank" className="recipe-name">{data.name}</a>
                    <p className="recipe-link">from <a href={data.url} target="_blank" className="recipe-link">{data.source}</a></p>
                </div>
            </div>
            <div className="result-middle-div">
                <ul className="diet-list">{data.dietLabels.map((label, index) => <li key={index}>{label}</li>)}</ul>
                <ul className="caution-list">{data.cautions.map((label, index) => <li key={index}>{label}</li>)}</ul>
            </div>
            <div className="result-bottom-div">
                <div className="calorie-container">
                    <p>{data.servings} servings</p>
                    <p><span className="calories-wrap">{Math.round(data.calories / data.servings)}</span> kCal</p>
                </div>
                <ul className="macros-list">
                    <li>Protein<strong>{parseFloat((data.protein.quantity / data.servings).toFixed(1))} g</strong></li>
                    <li>Fat<strong>{parseFloat((data.fat.quantity / data.servings).toFixed(1))} g</strong></li>
                    <li>Carbs<strong>{parseFloat((data.carbs.quantity / data.servings).toFixed(1))} g</strong></li>
                    <li>Fiber<strong>{parseFloat((data.fiber.quantity / data.servings).toFixed(1))} g</strong></li>
                    <li>Sugar<strong>{parseFloat((data.sugar.quantity / data.servings).toFixed(1))} g</strong></li>
                </ul>
                <ul className="micros-list">
                    <li>Cholesterol <strong>{Math.round(data.totalDaily.CHOLE.quantity / data.servings)}%</strong></li>
                    <li>Sodium <strong>{Math.round(data.totalDaily.NA.quantity / data.servings)}%</strong></li>
                    <li>Calcium <strong>{Math.round(data.totalDaily.CA.quantity / data.servings)}%</strong></li>
                    <li>Magnesium <strong>{Math.round(data.totalDaily.MG.quantity / data.servings)}%</strong></li>
                    <li>Potassium <strong>{Math.round(data.totalDaily.K.quantity / data.servings)}%</strong></li>
                    <li>Iron <strong>{Math.round(data.totalDaily.FE.quantity / data.servings)}%</strong></li>
                </ul>
            </div>
            <span className="ingredient-list-heading">Ingredients</span>
            <button
                className={ingredientsAreVisible ? "add-btn" : "add-btn upside-down"}
                onClick={toggleIngredients}
                >^
            </button>
            <ul className={ingredientsAreVisible ? "ingredient-list" : "hidden"}>
                {data.ingredients.map((ing, index) =>
                    <Ingredient key={index} data={ing} add={add} />
                )}
            </ul>
            <hr></hr>
        </div>
    )
};