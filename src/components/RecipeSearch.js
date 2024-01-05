import React from "react";
import KeywordSearch from "./searchSubcomponents/KeywordSearch";
import ClickableParameters from "./searchSubcomponents/ClickableParameters";
import QuantParameters from "./searchSubcomponents/QuantParameters";
import SearchResults from "./SearchResults";
import { nutrientOptions } from "../data";

export default function RecipeSearch(props) {

    const [currentSearchMethod, setCurrentSearchMethod] = React.useState('KeywordSearch');
    const [searchParameters, setSearchParameters] = React.useState([]);

    React.useEffect(() => {
            let searchString = '';
            if (searchParameters.length) {
                searchParameters.forEach(param => {searchString += `&${param.parameter}=${param.value}`});
                props.updateSearchString(searchString.replace(/ /g, '%20'));
            } else {
                props.updateSearchString(searchString);
            }
        }, [searchParameters]);

    function generateId(param, val) {
        let id = `${param[0]}=`;
        const valChars = val.split("");
        for (const char of valChars) {
            if (id.length < 11) {
                id += char;
            } else {
                break;
            }
        }
        return id;
    }; 

    function keywordSearch(keywords) {
        setSearchParameters(prevParams => [
            ...prevParams.filter(param => param.parameter !== 'q'),
            {parameter: 'q', value: keywords, label: keywords, id: generateId('q', keywords)}
        ]);
    };
    
    function toggleClickableParam(event) {
        const {dataset, id} = event.target;
        const {parameter, value, label} = dataset;
        const paramIsSelected = searchParameters.some(param => param.id === id);
        if (paramIsSelected) {
            setSearchParameters(prevParams => prevParams.filter(param => param.id !== id))
        } else {
            setSearchParameters(prevParams => [
                ...prevParams,
                {
                    parameter: parameter,
                    value: value,
                    label: label,
                    id: id
                }
            ]);
        }
    };

    function toggleQuantParam(event) {
        const {dataset, id} = event.target;
        const {parameter, min, max, label} = dataset;
        const unit = dataset.unit ? dataset.unit : null;
        const value = min && max ? `${min}-${max}` : min ? `${min}%2B`: max;
        setSearchParameters(prevParams => [
            ...prevParams.filter(param => param.parameter !== parameter), 
            {
                parameter: parameter,
                min: min,
                max: max,
                value: value,
                label: label,
                id: id,
                unit: unit
            }
        ])
    }

    function changeSearchMethod(event) {
        setCurrentSearchMethod(event.target.id);
    };

    function deleteParameter(event) {
        const idToDelete = event.currentTarget.dataset.delete;
        setSearchParameters(prevParams => prevParams.filter(param => param.id !== idToDelete));
    }; 

    const searchParameterListItems = searchParameters
        .map(param => {
            let isNutrient = false;
            if (param.min || param.max) {isNutrient = nutrientOptions.some(nutrient => param.id === nutrient.parameter)}
            let quantDisplay = param.min && param.max ? `${param.min}-${param.max}` :
                                    param.min ? `${param.min}+` :
                                    param.max ? `up to ${param.max}` : null
            if (param.label === "Time") {quantDisplay += ' min'} else if (isNutrient) {quantDisplay += ` ${param.unit}`}
            return <li
                        key={param.id}
                        id={param.id}
                        className="search-parameter"
                        data-delete={param.id}
                        onClick={deleteParameter}
                        >
                        <span className="param-label">{param.label}</span>
                        <span className="param-quant">{quantDisplay && `: ${quantDisplay}`}</span>
                </li>
    });

    return (
        <div className="recipe-search-container">
            <div className="search-method-list-container">
                <ul>
                    <li
                        id="KeywordSearch"
                        className={currentSearchMethod === "KeywordSearch" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Keyword search
                        </li>
                    <li
                        id="Allergies"
                        className={currentSearchMethod === "Allergies" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Allergies
                    </li>
                    <li
                        id="Diets"
                        className={currentSearchMethod === "Diets" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Diets
                    </li>
                    <li
                        id="Calories"
                        className={currentSearchMethod === "Calories" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Calories
                    </li>
                    <li
                        id="Nutrients"
                        className={currentSearchMethod === "Nutrients" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Nutrients
                    </li>
                    <li
                        id="DishTypes"
                        className={currentSearchMethod === "DishTypes" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Dish Types
                    </li>
                    <li
                        id="CuisineTypes"
                        className={currentSearchMethod === "CuisineTypes" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Cuisine Types
                    </li>
                    <li
                        id="PrepTime"
                        className={currentSearchMethod === "PrepTime" ? "active-method" : null}
                        onClick={changeSearchMethod}
                        >Prep Time
                    </li>
                    {props.results.length ?
                        <li
                            id="SearchResults"
                            className={currentSearchMethod === "SearchResults" ? "active-method" : null}
                            onClick={changeSearchMethod}
                            >Search Results
                        </li>
                        : null}
                </ul>
            </div>
            <div className="search-method-container">
                {currentSearchMethod === "KeywordSearch" ?
                    <KeywordSearch
                        addKeywords={keywordSearch}
                        search={props.search}
                    /> :
                    currentSearchMethod === "Calories"  || currentSearchMethod === "PrepTime" ?
                    <QuantParameters
                        method={currentSearchMethod}
                        toggleParam={toggleQuantParam}
                        getId={generateId}
                    /> :
                    currentSearchMethod === "SearchResults" ? 
                    <SearchResults
                        results={props.results}
                        add={props.add}
                        metaData={props.metaData}
                        search={props.search}
                    /> :
                    <ClickableParameters
                        method={currentSearchMethod}
                        searchParameters={searchParameters}
                        toggleClickable={toggleClickableParam}
                        toggleQuant={toggleQuantParam}
                        getId={generateId}
                    />
                }
            </div>
            <div className="search-parameter-container">
                <ul>
                    {searchParameterListItems}
                </ul>
                <button
                    onClick={() =>{
                        if (searchParameters.length) {props.search()};
                        setCurrentSearchMethod('SearchResults');
                    }}>Search
                </button>
            </div>
        </div>
    );
}


/*
app-keys:
384be6582807f7e4df0b77949c4f8574
5ef2b5f2c4f91703f56a28b55b33684a	    
6057859c24aa955b915009a3b8cc838c	
974a2fc89b6ce046bfb659308f780af4	
b66b77a4c653c0d37b14ab83a7a6b1fc
*/