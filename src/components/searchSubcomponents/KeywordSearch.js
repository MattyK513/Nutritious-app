import React from "react";

export default function KeywordSearch(props) {
    const [searchInput, setSearchInput] = React.useState("");

    function addKeywordAndSearch() {
        if (searchInput && searchInput.trim() !== '') {
            props.addKeywords(searchInput);
        }
        setSearchInput('');
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            props.addKeywords(searchInput);
        }
    };

    return (
        <div className="input-based-method-container">
            <h4>Keywords</h4>
            <div className="search-bar">
                <input
                    placeholder="Type one or more keywords"
                    value={searchInput}
                    onChange={event => {setSearchInput(event.target.value)}}
                    onKeyDown={handleKeyDown}
                ></input>
                <button onClick={addKeywordAndSearch} className="add-btn">+</button>
            </div>
        </div>
    )
}