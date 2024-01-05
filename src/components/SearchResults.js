import React from "react";
import Result from "./resultsSubcomponents/Result";

export default function SearchResults({results, add, metaData, search, ...rest}) {


    const [resultsForRender, setResultsForRender] = React.useState(results);
    //const [searchMetaData, setSearchMetaData] = React.useState(metaData);
    //const [prevPageLinkArray, setPrevPageLinkArray] = React.useState('');

    //const {to, from, count, links} = searchMetaData;
    //const nextPage = links ? links.next.href : null;

    console.log("results:", results)
    console.log("resultsForRender: ", resultsForRender)

    /*function pageForward(url) {
        setPrevPageLinkArray(prevArray => [url, ...prevArray]);
        pagination(url);
        search();
    }

    function pageBack() {
        pagination(prevPageLinkArray[0]);
        setPrevPageLinkArray(prevArray => prevArray.slice(1));
        search();
    }*/

    React.useEffect(() => {
        setResultsForRender(results);
        //setSearchMetaData(metaData);
    }, [results]) 

    return (
        <div>
            {
                resultsForRender && resultsForRender.length > 0 ?
                    resultsForRender.map((result, index) =>
                        <Result key={index} id={index} data={result} add={add} />) :
                    <p>No results found</p>
            }
        </div>
    )
}
/*
<p className="meta-data">
                Showing results {from} - {to} of {count}
            </p>
            {from > 1 && <button onClick={pageBack}>Previous Page</button>}
            {to < count && <button onClick={() => pageForward(nextPage)}>Next page</button>}
*/