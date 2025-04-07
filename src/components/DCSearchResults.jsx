import "./DCSearchResults.css";
import { fetcher } from "/src/components/helpers";
import useSWR from "swr";
import { useState, useEffect } from "react";
import nationalities, { isValid } from "i18n-nationality";
import enLocale from "i18n-nationality/langs/en.json"; //slightly modified (details in README.md - i18n adjustments section)
nationalities.registerLocale(enLocale);
import "/node_modules/flag-icons/css/flag-icons.min.css";
import LoadingMini from '../pages/LoadingMini';
import { Link } from "react-router-dom";
import LoadingError from "./LoadingError";

// All variable are called driver, prevDrivers but DCSearchResults is for both drivers and constructors searching.

function DCSearchResults({ query, searchType }) {

    const filteredQuery = query.toLowerCase();
    const words = filteredQuery.split("_");
    const [filteredResults, setfilteredResults] = useState([]);
    const [visibleCount, setVisibleCount] = useState(25);
    const [areAllLoaded, setAreAllLoaded] = useState(false);

    function filterDrivers(drivers)
    {
        let filteredDrivers;
        if (words.length===2) //use different searching method when typed exactyly 2 words (most likely name and surname)
        {
            filteredDrivers = drivers.filter(driver => 
                driver.givenName.toLowerCase().includes(words[0]) && 
                driver.familyName.toLowerCase().includes(words[1])
            );
        } 
        else
        {
            filteredDrivers = drivers.filter(driver => 
                words.some(word =>
                    driver.id.toLowerCase().includes(word) || 
                    driver.givenName.toLowerCase().includes(word) ||
                    driver.familyName.toLowerCase().includes(word)
                )
            );
        }

        return filteredDrivers;
    }

    const [offset, setOffset] = useState(0);
    const [drivers, setDrivers] = useState([]);

    const { data, error, isLoading, isValidating} = useSWR(
        `https://api.jolpi.ca/ergast/f1/${searchType}/?offset=${offset}&limit=100`,
        fetcher,
    );
    
    // function to process and store results
useEffect(() => {
    if (data) {
        if (isLoading || isValidating) {
            // Apply delay only if data was fetched from network
            setAreAllLoaded(false);
            setTimeout(() => {
                processFetchedData();
            }, 251);
        } else {
            // If data is from cache, process instantly
            processFetchedData();
        }
    }
}, [data, filteredQuery]);

    function processFetchedData() {
        if(data.MRData.DriverTable.Drivers.length > 0) {

            const newDrivers = data.MRData.DriverTable.Drivers.map(driver => ({
                id: driver.driverId,
                givenName: driver.givenName,
                familyName: driver.familyName,
                // countryCode: driver.nationality
                countryCode: nationalities.getAlpha2Code(driver.nationality, 'en') || "99" // "99" is blank flag.

            }))

            setDrivers(prevDrivers => [...prevDrivers, ...newDrivers]);
            setOffset(prevOffset => prevOffset + 100);
        }
        else //when process is fnished
        {
            setAreAllLoaded(true);
        }
        setfilteredResults(filterDrivers(drivers));
    }

    if (error) return <LoadingError></LoadingError>
    if (!areAllLoaded) return <div className="dcsearch-loading"><LoadingMini /></div>

    const viewMore = () => {
        setVisibleCount(prev => prev + 25); // Load 25 more results each time
    };

    return(
        <>
            <div className="dcsearch-results-title"> 
                {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} for {query.replace("_", " ")}
            </div>
            <div className="dcsearch-results-box">
                {filteredResults.slice(0, visibleCount).map(driver => (
                    <div key={driver.id} className="dcsearch-results-single-result"> 
                        <Link to={`/${searchType}?id=${driver.id}`} className="dcsearch-results-link">
                            <span className={`fi fi-${driver.countryCode.toLowerCase()} dcsearch-results-flag`}></span> 
                            &nbsp;{driver.givenName} 
                            &nbsp;<span className="dcsearch-results-familyName">{driver.familyName}</span>
                        </Link> 
                    </div>
                ))}
                {visibleCount < filteredResults.length ? (
                    <div className="dcsearch-results-load-more">
                        <button onClick={viewMore} className="dcsearch-results-load-more-button">
                            Load More
                        </button>
                    </div>
                ) : ""}
            </div>
        </>
    );

};

export default DCSearchResults;