import { fetcher } from '/src/components/helpers';
import useSWR from "swr";
import LoadingMini from '../pages/LoadingMini';
import StandingsDrivers from './StandingsDrivers';
import StandingsTeams from './StandingsTeams';

function StandingsContent({season, mode}) {

  let currentYear = new Date().getFullYear();
  if (season<1950 || season>currentYear)
  {
    return <div className="standings-loading-error">No data for this season.</div>
  }
  const { data, error, isLoading } = useSWR(`https://api.jolpi.ca/ergast/f1/${season}/${mode}/?limit=100`, fetcher);

  if (error) return <div className="standings-loading-error">Failed to load.</div>
  if (isLoading) return <div className="standings-loading"><LoadingMini /></div>

  let results = [];

  try {
    if (mode === "driverstandings")
    {
        results = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
    else
    {
        results = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }
    
  } catch (e) {
    return <div className="standings-loading-error">No data for this season.</div>;
  }

  return (
    mode === "driverstandings" ? <StandingsDrivers results={results} /> : <StandingsTeams results={results} />
  );

}

export default StandingsContent;
