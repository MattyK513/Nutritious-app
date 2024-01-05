import React from "react";

export default function Ingredient({data, add, ...rest}) {

    const [hasBeenAdded, setHasBeenAdded] = React.useState(false);

    function handleClick(event) {
        add(event)
            .then(result => {if (result === "Success") {setHasBeenAdded(true)}})
            .catch(error => console.error("Error adding item to database,", error))
    };

    return (
        <li>
            {data.text}
            <button
                className={hasBeenAdded ? "hidden" : "add-btn"}
                data-item={data.food}
                onClick={handleClick}
                >+
            </button>
        </li>
    )
}