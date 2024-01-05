import React from "react";

export default function QuantParameters(props) {

    const [values, setValues] = React.useState({min: "", max: ""});

    function updateData(event) {
        setValues(prevValues => {return {...prevValues, [event.target.id]: event.target.value}})
    };
    
    function handleSubmit(event){
        event.preventDefault();
        props.toggleParam(event)
        setValues({min: "", max: ""})
    };

    return (
        <div className="input-based-method-container">
            <h4>{props.method === "Calories" ? 'Calories' : 'Prep Time'}</h4>
            <p
                className="quant-search-instruction"
                >{props.method === "Calories" ?
                'Specify desired calories per serving. Fill out one or both input fields.' :
                'Fill out one or both input fields. Times must be in minutes.'}
            </p>
            <form
                onSubmit={handleSubmit}
                key={props.method}
                id={props.method}
                data-parameter={props.method === "Calories" ? 'calories' : 'time'}
                data-label={props.method === "Calories" ? 'Calories' : 'Time'}
                data-min={values.min}
                data-max={values.max}
            >
                <input
                    type="number"
                    id="min"
                    onChange={updateData}
                    value={values.min}
                    className="quant-input"
                    placeholder="Min">
                </input>
                <input
                    type="number"
                    id="max"
                    onChange={updateData}
                    value={values.max}
                    className="quant-input"
                    placeholder="Max">
                </input>
                <button className="add-btn">+</button>
            </form>
        </div>
    )
}