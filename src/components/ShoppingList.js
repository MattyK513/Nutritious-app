import React from "react";

function ShoppingList(props) {

    const [displayOrder, setDisplayOrder] = React.useState("chronological");
    let listItems;

    if (displayOrder === "chronological") {
        listItems = props.groceryList.map(item => {
        return <li key={item[0]} id={item[0]} onClick={props.deleteItem}>{item[1]}</li>
    })} else if (displayOrder === "alphabetical") {
        const list = props.groceryList.slice();
        list.sort((a, b) => a[1].localeCompare(b[1]));
        listItems = list.map(item => {
        return <li key={item[0]} id={item[0]} onClick={props.deleteItem}>{item[1]}</li>
    })};

    return (
        <div>
            <div className="shopping-list-controls">
                <input
                    onChange={props.handleChange}
                    value={props.groceryInput}
                    onKeyDown={event => {if (event.key === 'Enter') {props.addToList()}}}
                ></input>
                <button onClick={props.addToList}>Add to list</button>
                <div>
                    <button className="sort-btn" onClick={() => setDisplayOrder("alphabetical")}>Sort alphabetical</button>
                    <button className="sort-btn" onClick={() => setDisplayOrder("chronological")}>Sort by order added</button>
                </div>
            </div>
            <ul className="shopping-list">
                {listItems}
            </ul>
        </div>
    )
}

export default ShoppingList;