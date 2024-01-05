import React from "react";

export default function Option(props) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [values, setValues] = React.useState({min: "", max: ""});
    const divRef = React.useRef(null);

    React.useEffect(() => {
        if (props.quant) {
            setIsAdded(props.searchParameters.some(param => param.id === props.parameter));
        } else {
            setIsAdded(props.searchParameters.some(param => param.value === props.value));
        }
    }, [props.searchParameters]);

    function updateData(event) {
        const inputId = event.target.id;
        setValues(prevValues => {return {...prevValues, [inputId]: event.target.value}});
    };

    function handleSubmit(event) {
        event.preventDefault();
        props.clearNutrient();
        props.toggleNutrientParam(event);
    };

    const styling = {backgroundColor: isAdded ? '#ACC679': 'white'};

    return (
        <div
            className="option"
            id={props.id}
            onClick={props.quant ? props.setSelectedNutrient : props.handleClick}
            data-value={props.value}
            data-parameter={props.parameter}
            data-label={props.label}
            style={{position: 'relative'}}
            >
            <span
                className="add-indicator"
                style={styling}
                id={props.id}
                data-value={props.value}
                data-parameter={props.parameter}
                data-label={props.label}
            ></span>
            {props.label}
            {props.quant && (
                <div className="nutrient-quant-container" hidden={props.currentNutrientId !== props.id} ref={divRef}>
                    <span className="exit-btn" onClick={props.clearNutrient}>x</span>
                    <p className="nutrient-quant-label">{`${props.label} (${props.unit})`}</p>
                    <form
                        id={props.parameter}
                        data-label={props.label}
                        data-parameter={`nutrients%5B${props.parameter}%5D`}
                        data-min={values.min}
                        data-max={values.max}
                        data-unit={props.unit}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="number"
                            id="min"
                            min={0}
                            max={values.max ? parseInt(values.max) : null}
                            onChange={updateData}
                            value={values.min}
                            placeholder="Min"
                            className="quant-input"/>
                        <input
                            type="number"
                            id="max"
                            min={values.min ? parseInt(values.min) : 0}
                            onChange={updateData}
                            value={values.max}
                            placeholder="Max"
                            className="quant-input"/>
                        <button className="add-btn">+</button>
                    </form>
                </div>)}
        </div>
    )
};   