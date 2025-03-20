import { useState, useEffect } from "react";
import "./DCSearch.css";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DCSearch({searchType}) {

    if(searchType != "drivers" && searchType != "constructors")
    {
        console.error("Incorrect searchType. Expected searchType to be `drivers` or `constructors` and instead got a "+searchType)
        return (<></>);
    }

    const navigate = useNavigate();

    function handleEnterClicked(event)
    {
        if (event.key === "Enter") {
            handleInputValueChange();
        }
    };

    function handleInputValueChange() 
    {
        let inputValue = document.getElementById("DCSearchBar").value;
        if (inputValue)
        {
            let outputValue = inputValue.replace(/[^A-Z0-9]+/ig, "_");
            navigate(`/${searchType}?search=${outputValue}`);
        }
        else
        {
            navigate(`/${searchType}`);
        }
    };

    return (
        <div className="dcsearch-container">

            <div className="dcsearch-searchbox-container">
                <div className="dcsearch-searchbox">
                    <input
                        className="dcsearch-searchbox-search-form" 
                        type="text"
                        minLength="1"
                        maxLength="35"
                        id="DCSearchBar"
                        placeholder="Search... "
                        onKeyDown={handleEnterClicked}
                    >
                     </input>
                    <button className="dcsearch-searchbox-search-icon" onClick={handleInputValueChange}>
                        <Search size="20px"/>
                    </button>
                </div>
            </div>

        </div>
    );

};

export default DCSearch;