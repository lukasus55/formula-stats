import { Helmet } from "react-helmet-async";
import "./Standings.css";
import StandingsContent from "../components/StandingsContent";
import { useToggleState, windowSizeDefiner } from "../components/Helpers";
import SeasonsDropdown from "../components/SeasonsDropdown";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Standings () {

    let currentYear = new Date().getFullYear();
    let season = currentYear;

    const location = useLocation();
    const searchUrl = new URLSearchParams(location.search).get("season");
    let searchParams = [];

    if (searchUrl)
    {
        searchParams = searchUrl.split("_")
    }

    if (searchParams[0])
    {
        season = searchParams[0];
    }

    let [tableDriversMode, toggleTableDriversMode] = useToggleState(true);

    useEffect(() => {
        if (searchParams[1] === "c")
        {
            toggleTableDriversMode()
        }
    },[])

    return (
        <>
            <Helmet>
                <title>F1 Statistics - {season.toString()} Standings</title>
                <meta name="description" content={`F1 Stats - Drivers and constructors tandings from 1950 to ${currentYear}}`}  />
            </Helmet>

            <div className="standings-container">

                <div className="standings-title">
                    <h3>F1 Standings</h3>
                </div>

                <div className="standings-table">

                    <div className="standings-table-header"> 
                        <div className="standings-table-header-left">
                            <div className="standings-table-header-title"> <h6> Season {season} Standings </h6></div>
                            <div className="standings-table-header-mode-buttons">
                                <div className={`main-toggle-button ${tableDriversMode === true ? "main-toggle-button-active" : ""}`} onClick={toggleTableDriversMode}> Drivers </div>
                                <div className={`main-toggle-button ${tableDriversMode === false ? "main-toggle-button-active" : ""}`}  onClick={toggleTableDriversMode}> Teams </div>
                            </div>
                        </div>

                        <div className="standings-table-header-right">
                            <SeasonsDropdown selectedSeason={season}/>
                        </div>
                    </div>

                    {<StandingsContent season={season.toString()} mode={tableDriversMode ? "driverstandings" : "constructorstandings"}/>}

                </div>

            </div>
        </>
    );
};
  
export default Standings;