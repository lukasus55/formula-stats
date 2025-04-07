import { Helmet } from "react-helmet-async";
import "./Schedule.css";
import useSWR from "swr";
import { fetcher } from "../components/Helpers";
import LoadingError from "../components/LoadingError";
import Loading from "./Loading";
import SeasonsDropdown from "../components/SeasonsDropdown";
import { useLocation } from "react-router-dom";
import ScheduleSingleRace from "../components/ScheduleSingleRace";
import { Link } from "react-router-dom";

function Schedule () {

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

    const { data, error, isLoading} = useSWR(
        `https://api.jolpi.ca/ergast/f1/${season}/races/?limit=100`,
        fetcher,
    );

    if (error) return <div className="schedule-error"><LoadingError></LoadingError></div>
    if (isLoading) return <div className="schedule-loading"><Loading></Loading></div>

    // console.log(data.MRData.RaceTable.Races)

    const timeZone = localStorage.getItem("timeZone");
    let timeZoneName = "Tracks local";
    if (timeZone && timeZone === "user") {timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone};
    if (timeZone && timeZone === "central") {timeZoneName = "UTC+0"}

    return (
        <>
            <Helmet>
                <title>F1 Statistics - {season.toString()} Schedule</title>
                <meta name="description" content="F1 Stats - Schedule of all races in 2025. Next: " />
            </Helmet>

            <div className="schedule-container">

                <div className="schedule-title">
                    <h3>Schedule</h3>
                </div>

                <div className="schedule-year-selector-container">
                    <div className="schedule-year-selector-half">
                            <h5> {`Season ${season} Schedule`} </h5>
                    </div>
                    <div className="schedule-year-selector-half"><SeasonsDropdown selectedSeason={season}/></div> 
                </div>

                <div className="schedule-timezone-container"> 
                    <div className="schedule-timezone-box">
                        <div className="schedule-timezone-title"> 
                            Using&nbsp;<strong>{timeZoneName}</strong>&nbsp;time zone(s). You can change displayed time zone in&nbsp;
                            <span className="schedule-settings-link"><Link to="/settings#timezone">settings</Link></span>. 
                        </div>
                    </div>
                </div>

                <div className="schedule-races-container">
                    <div className="schedule-races" key={`${season} allraces}`}>
                        {data.MRData.RaceTable.Races.map(race => (
                            <ScheduleSingleRace key={`${season} ${race.raceName}`} race={race}/>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};
  
export default Schedule;