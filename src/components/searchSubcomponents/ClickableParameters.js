import React from "react";
import { allergyOptions, dietOptions, cuisineOptions, dishTypeOptions, nutrientOptions } from "../../data";
import Option from "./ClickableParamSubcomponents/Option";

export default function ClickableParameters(props) {

    const [currentNutrientId, setCurrentNutrientId] = React.useState('');

    function setSelectedNutrient(event) {
        const elementClicked = event.target.id;
        const nutrientWasClicked = nutrientOptions.some(nutrient => nutrient.parameter === elementClicked);
        if (nutrientWasClicked) {setCurrentNutrientId(event.target.id)};
    };

    function clearSelectedNutrient() {
        setCurrentNutrientId('');
    };

    function getDataArray(searchMethod) {
        const dataArrayMap = {
            Allergies: allergyOptions,
            Diets: dietOptions,
            DishTypes: dishTypeOptions,
            CuisineTypes: cuisineOptions,
            Nutrients: nutrientOptions
        }
        return dataArrayMap[searchMethod];
    };

    function renderOptionList(optionsDataArr) {
        if (props.method !== 'Nutrients') {
            return optionsDataArr.map(option => 
                <Option
                    key={option.value}
                    id={props.getId(option.parameter, option.value)}
                    handleClick={props.toggleClickable}
                    value={option.value}
                    parameter={option.parameter}
                    label={option.label}
                    searchParameters={props.searchParameters}
                />)
        } else {
            return optionsDataArr.map(option =>
                <Option
                    key={option.parameter}
                    id={option.parameter}
                    parameter={option.parameter}
                    label={option.label}
                    unit={option.unit}
                    searchParameters={props.searchParameters}
                    setSelectedNutrient={setSelectedNutrient}
                    clearNutrient={clearSelectedNutrient}
                    currentNutrientId={currentNutrientId}
                    toggleNutrientParam={props.toggleQuant}
                    quant={true}
                />)
        }
    };

    return (
        <div className="options-container">
            {renderOptionList(getDataArray(props.method))}
        </div>
    )
}