import "./DriversInfo.css"
import useSWR from "swr";
import { fetcher } from "./Helpers";
import LoadingMini from "../pages/LoadingMini";
import { useState, useEffect } from "react";
import nationalities from "i18n-nationality";
import enLocale from "i18n-nationality/langs/en.json"; //slightly modified (details in README.md - i18n adjustments section)
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Crown } from 'lucide-react';
import { Link } from "react-router-dom";
import DCGraph from "./DCGraph";
import { Helmet } from "react-helmet-async";
import LoadingError from "./LoadingError";
nationalities.registerLocale(enLocale);

function DriversInfo( {driverId} ) {
  
    let [driver, setDriver] = useState({
      championshipsList: [],
      countryCode: "",
      dateOfBirth: "",
      driverId: "",
      familyName: "",
      firstRace: { date: "", name: "", country: "", circuit: "" },
      givenName: "",
      gridList: {},
      lastRace: { date: "", name: "", country: "", circuit: "" },
      racePositionsList: {},
      sprintPositionsList: {},
      totalRacePoints: 0,
      totalRacePositions: 0,
      totalRaces: 0,
      totalGridPositions: 0,
      totalSprintPoints: 0,
      totalSprintPositions: 0,
      totalSprints: 0,
      TeamsList: {}
    });

    const [offsetResults, setOffsetResults] = useState(0);
    const [offsetSprint, setOffsetSprint] = useState(0);
    const [totalRacePoints, setTotalRacePoints] = useState(0);
    const [totalRacePositions, setTotalRacePositions] = useState(0);
    const [totalSprintPoints, setTotalSprintPoints] = useState(0)
    const [totalSprintPositions, setTotalSprintPositions] = useState(0);
    const [totalGridPositions, setTotalGridPositions] = useState(0);
    const [RacePositionsList, setRacePositionsList] = useState([]);
    const [GridList, setGridList] = useState([]);
    const [SprintPositionsList, setSprintPositionsList] = useState([]);
    const [TeamsList, setTeamsList] = useState([]);
    const [areAllRaceLoaded, setAllRaceLoaded] = useState(false);
  
    const { data : raceData, error: raceError, isLoading: isRaceLoading } = useSWR(
      `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results/?offset=${offsetResults}&limit=100`,
      fetcher
    );

    // IMPORTANT NOTE: This is only a temporary solution with ergast api instead of jolpica api. Ergast api will not add any new data, sucha as world champions (used here) from 2025. 
    // More here: https://github.com/jolpica/jolpica-f1/discussions/132
    const { data: championshipData, error: championshipError, isLoading: isChampionshipLoading } = useSWR(
      `https://ergast.com/api/f1/drivers/${driverId}/driverStandings/1/seasons.json`,
      fetcher
    );

    const { data: sprintData, error: sprintError, isLoading: isSprintLoading } = useSWR(
      `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/sprint/?offset=${offsetSprint}&limit=100`,
      fetcher
    );

    useEffect(() => {
      if (raceData && raceData.MRData.RaceTable.Races.length > 0) {
  
        const totalRaces = parseInt(raceData.MRData.total);

        // First race datas
        if (offsetResults === 0)
        {
          const firstRace = raceData.MRData.RaceTable.Races[0];
          setDriver((prev) => ({
            ...prev,
            driverId: raceData.MRData.RaceTable.driverId,
            givenName: firstRace.Results[0].Driver.givenName,
            familyName: firstRace.Results[0].Driver.familyName,
            totalRaces: totalRaces,
            countryCode: nationalities.getAlpha2Code(firstRace.Results[0].Driver.nationality, "en") || "99",
            dateOfBirth: firstRace.Results[0].Driver.dateOfBirth,
            firstRace : {
              date: firstRace.date,
              name: firstRace.raceName,
              country: firstRace.Circuit.Location.country,
              season: firstRace.season,
              wikipedia: firstRace.url
            }
          }));
        }
  
        let newTotalRacePoints = 0;
        let newTotalRacePositions = 0;
        let newTotalGridPositions = 0;
        let newRacePositionsList = { ...RacePositionsList };
        let newGridList = { ...GridList };
        let newTeamsList = [ ...TeamsList ];
    
        raceData.MRData.RaceTable.Races.forEach(session => {
          const position = parseInt(session.Results[0].positionText);
          const grid = parseInt(session.Results[0].grid)
          newTotalRacePoints += parseFloat(session.Results[0].points);
          newTotalRacePositions += position || 0;
          newTotalGridPositions += grid || 0;
          newRacePositionsList[position] = (newRacePositionsList[position] || 0) + 1;
          newGridList[grid] = (newGridList[grid] || 0) + 1;

          let newTeam = session.Results[0].Constructor;
          const currentlyLastTeam = newTeamsList[newTeamsList.length-1]
          if (currentlyLastTeam?.constructorId == newTeam.constructorId)
          {
            if (currentlyLastTeam.seasonsList[currentlyLastTeam.seasonsList.length-1] != session.season)
            {
              currentlyLastTeam.seasonsList.push(session.season);
            }
          }
          else
          {
            newTeam.seasonsList = [session.season];
            newTeamsList.push(newTeam)
          }

        })

        setTeamsList(newTeamsList);
  
        setTotalRacePoints((prev) => prev + newTotalRacePoints);
        setTotalRacePositions((prev) => prev + newTotalRacePositions);
        setTotalGridPositions((prev) => prev + newTotalGridPositions);
        setRacePositionsList(newRacePositionsList);
        setGridList(newGridList);
    
        setDriver((prev) => ({
          ...prev,
          totalRacePoints: totalRacePoints + newTotalRacePoints,
          totalRacePositions: totalRacePositions + newTotalRacePositions,
          totalGridPositions: totalGridPositions + newTotalGridPositions,
          racePositionsList: newRacePositionsList,
          teamsList: newTeamsList,
          gridList: newGridList,
        }));

        // Last race datas
        const currentBatchCount = raceData.MRData.RaceTable.Races.length;
        if (offsetResults + currentBatchCount >= totalRaces) {
          const lastRace = raceData.MRData.RaceTable.Races[currentBatchCount - 1];
          setDriver((prev) => ({
            ...prev,
            lastRace : {
              date: lastRace.date,
              name: lastRace.raceName, 
              country: lastRace.Circuit.Location.country,
              season: lastRace.season,
              wikipedia: lastRace.url,
            },
          }));
          setAllRaceLoaded(true)
        }
        setOffsetResults(prevOffset => prevOffset + 100);
      }
    }, [raceData])

    useEffect(() => {
      if (championshipData && championshipData.MRData.SeasonTable.Seasons.length>0) {
        setDriver((prev) => ({
          ...prev,
          championshipsList: championshipData.MRData.SeasonTable.Seasons
        }))
      }
    },[championshipData])

    useEffect(() => {
      if (sprintData && sprintData.MRData.RaceTable.Races.length > 0) {

        let newTotalSprintPoints = 0;
        let newTotalSprintPositions = 0;
        let newSprintPositionsList = { ...SprintPositionsList };
        const totalSprints = parseInt(sprintData.MRData.total);

        sprintData.MRData.RaceTable.Races.forEach(session => {
          const position = parseInt(session.SprintResults[0].positionText);
          newTotalSprintPositions += position || 0;
          newTotalSprintPoints += parseFloat(session.SprintResults[0].points);
          newSprintPositionsList[position] = (newSprintPositionsList[position] || 0) + 1;;
        })

        setTotalSprintPoints((prev) => prev + newTotalSprintPoints);
        setTotalSprintPositions((prev) => prev + newTotalSprintPositions);
        setSprintPositionsList(newSprintPositionsList);

        setDriver((prev) => ({
          ...prev,
          totalSprintPoints: totalSprintPoints + newTotalSprintPoints,
          totalSprintPositions: totalSprintPositions + newTotalSprintPositions,
          sprintPositionsList: newSprintPositionsList,
          totalSprints: totalSprints,
        }));

        setOffsetSprint(prevOffset => prevOffset + 100);
      }
    },[sprintData])
  
    const [graphMode, setGraphMode] = useState("Races");

    if (raceError || championshipError || sprintError) return <LoadingError />
    // With this sollution it is possible to page be displayed when all sprints and/or championships arent yet loaded but thats not an issue.
    if (isRaceLoading || isChampionshipLoading || isSprintLoading || !areAllRaceLoaded)
      return <div className="drivers-info-loading"><LoadingMini /></div>;

    const totalFinishedRaces = driver.totalRaces - (driver.racePositionsList[NaN] || 0);
    const totalFinishedSprints = driver.totalSprints - (driver.sprintPositionsList[NaN] || 0);

    const mergedTeams = new Map();

    driver?.teamsList?.forEach((team) => {
      if (!mergedTeams.has(team.constructorId)) {
        mergedTeams.set(team.constructorId, { ...team, seasonsList: (team.seasonsList) });
      } else {
        mergedTeams.get(team.constructorId).seasonsList = ([
          ...mergedTeams.get(team.constructorId).seasonsList,
          ...team.seasonsList,
        ]);
      }
    });

    const mergedTeamsArray = Array.from(mergedTeams.values())
    console.log(driver) 

    return(
      <>
        {(driver && driver.givenName) ? (
        <div className="drivers-info-container">
          
          <Helmet>
            <title>{`F1 Statistics - ${driver.givenName} ${driver.familyName}`}</title>
            <meta name="description" content={`F1 Stats - ${driver.givenName} ${driver.familyName}`} />
          </Helmet>

          <div className="title"> <span className={`fi fi-${driver.countryCode ? (driver.countryCode.toLowerCase()) : ("99")} dcsearch-results-flag`}></span>&nbsp;{driver.givenName} {driver.familyName} </div>
          
          <div className="badges">
          {driver.championshipsList?.map((championship, index) => (
            <Link key={"link"+index} to={`/standings?season=${championship.season}`} className="drivers-info-champion-badge" title={`${championship.season} CHAMPION`}>
              <Crown className="widgetTextFill" size="15px"/>&nbsp;{championship.season}
            </Link>
          ))}
          </div>

          <div className="details">
            <div className="title"> <h5> DETAILS </h5> </div>
            <div className="list">
              <ul>
                <li> Born:&nbsp;<span className="drivers-bold"> {driver.dateOfBirth || "Uknown"} </span> </li>
                <li> 
                  First GP:&nbsp;
                  <span className="drivers-bold"> 
                    {
                      driver.firstRace && (<Link key={"firstRace"} target="blank" to={driver.firstRace.wikipedia} title={driver.firstRace.name}> {`${driver.firstRace.country} ${driver.firstRace.season}`} </Link>)
                    }
                  </span> 
                </li>
                <li> 
                  Last GP:&nbsp; 
                  <span className="drivers-bold">
                    {
                      driver.lastRace && (<Link key={"firstRace"} target="blank" to={driver.lastRace.wikipedia} title={driver.lastRace.name}> {`${driver.lastRace.country} ${driver.lastRace.season}`} </Link>)
                    }
                  </span>
                </li>

                <li> </li>
                
                <li> <span className="drivers-bold"> {driver.totalRaces} </span>&nbsp;Grand Prix </li>
                <li> <span className="drivers-bold"> {driver.racePositionsList[1] || "0"} </span>&nbsp;GP wins </li>
                <li> <span className="drivers-bold"> {driver.gridList[1] || "0"} </span>&nbsp;pole positions </li>
                <li> <span className="drivers-bold"> {driver.sprintPositionsList[1] || "0"} </span>&nbsp;sprint wins </li>
                <li> </li>
                <li> <span className="drivers-bold"> {(parseFloat(driver.totalRacePoints)+parseFloat(driver.totalSprintPoints))} </span>&nbsp;total points </li>
                <li> <span className="drivers-bold"> {driver.totalRacePoints} </span>&nbsp;race points </li>
                <li> <span className="drivers-bold"> {driver.totalSprintPoints} </span>&nbsp;sprint points </li>
                <li> </li>
                <li> Avg. race position:&nbsp;<span className="drivers-bold">{(parseFloat(driver.totalRacePositions)/totalFinishedRaces).toFixed(2)}</span></li>
                <li> Avg. sprint position:&nbsp;<span className="drivers-bold">{(parseFloat(driver.totalSprintPositions)/totalFinishedSprints).toFixed(2)}</span></li>
              </ul>
            </div>
          </div>

          <div className="results">
            <div className="header">
              <div className="drivers-results-header-buttons">
                <div className={`drivers-results-button ${graphMode=='Races' ? 'drivers-results-button-active' : ''}`} onClick={() => setGraphMode("Races")}>Races</div>
                <div className={`drivers-results-button ${graphMode=='Qualis' ? 'drivers-results-button-active' : ''}`} onClick={() => setGraphMode("Qualis")}>Grid</div>
                <div className={`drivers-results-button ${graphMode=='Sprints' ? 'drivers-results-button-active' : ''}`} onClick={() => setGraphMode("Sprints")}>Sprints</div>
              </div>
              <div className="drivers-results-header-title">
              <div className="drivers-results-header-title-top">{graphMode!='Qualis' ? `${graphMode} results` : `Grid positions`} </div>
              <div className="drivers-results-header-title-bottom drivers-gray">{graphMode!='Qualis' ? `Only finished ${graphMode.toLowerCase()}` : 'Races starting positions'} </div>
              </div>
            </div>
            <div className="graph">
              <DCGraph driver={driver} graphMode={graphMode}/>
            </div>
          </div>

          <div className="teams">
            <div className="title"> Teams history </div>
            <div className="list">
              <ol>
                {mergedTeamsArray.map((team) => (
                  <li key={'Team '+team.constructorId}> 
                    <span className="drivers-team-name" style={{ whiteSpace: "nowrap" }}>
                      <Link to={`/constructors?id=${team.constructorId}`}>
                        <span className="drivers-bold">{team.name}</span>:
                      </Link>
                    </span>
                    <span className="drivers-seasons-list drivers-gray"> 
                      {team?.seasonsList?.map((seasonNumber) => (
                          <span className="drivers-team-season" key={'Team '+team.constructorId + ' SeasonLink '+ seasonNumber}>
                            &nbsp;
                            <Link to={`/standings?season=${seasonNumber}_c`}>
                              {seasonNumber}
                            </Link>
                            {team.seasonsList[team.seasonsList.length-1]===seasonNumber ? "" : ","}
                        </span>
                      ))} 
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        ) : <div className="drivers-info-loading-error">Failed to load.</div>}
      </>
    );
  
  }
export default DriversInfo;
