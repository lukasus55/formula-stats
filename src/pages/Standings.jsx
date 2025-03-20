import { Helmet } from "react-helmet-async";
import "./Standings.css";
import StandingsContent from "../components/StandingsContent";
import { useToggleState, windowSizeDefiner } from "../components/Helpers";
import StandingsDropdown from "../components/StandingsDropdown";
import { useLocation } from "react-router-dom";
import { ChevronDown } from 'lucide-react';
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
    let [dropdownExtended, toggleDropdownExtended] = useToggleState(false);

    useEffect(() => {
        if (searchParams[1] === "c")
        {
            toggleTableDriversMode()
        }
    },[])

    const windowSize = windowSizeDefiner();
    let isSmallDevice = windowSize.width <= 768;

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
                                <div className={`standings-table-header-mode-drivers-button ${tableDriversMode === true ? "standings-table-header-mode-button-active" : ""}`} onClick={toggleTableDriversMode}> Drivers </div>
                                <div className={`standings-table-header-mode-teams-button ${tableDriversMode === false ? "standings-table-header-mode-button-active" : ""}`}  onClick={toggleTableDriversMode}> Teams </div>
                            </div>
                        </div>

                        <div className="standings-table-header-right">
                            <div className="standings-table-dropdown-container">
                                <div className="standings-table-dropdown-current" onClick={toggleDropdownExtended}>
                                    <div className="standings-table-dropdown-current-text">
                                        <span>{(isSmallDevice) ? (season) : (`Season ${season}`)} </span>
                                    </div>
                                    <div className="standings-table-dropdown-current-expand-icon">
                                        <ChevronDown size="16"/>
                                    </div>
                                </div>
                                <div className="standings-table-dropdown-box"  onClick={toggleDropdownExtended}>
                                    {dropdownExtended && <StandingsDropdown />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {<StandingsContent season={season.toString()} mode={tableDriversMode ? "driverstandings" : "constructorstandings"}/>}

                </div>

            </div>
        </>
    );
};
  
export default Standings;