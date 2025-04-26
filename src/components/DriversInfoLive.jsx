import { fetcher } from '/src/components/helpers';
import useSWR from "swr";
import LoadingMini from '../pages/LoadingMini';
import { Link } from "react-router-dom";

function DriversInfoLiveStandings( {driverId} ) {

  let currentYear = new Date().getFullYear();

  const { data, error, isLoading } = useSWR(`https://api.jolpi.ca/ergast/f1/${currentYear}/driverstandings/`, fetcher);

  if (error) return <div className="standings-loading-error">Failed to load.</div>
  if (isLoading) return <div className="standings-loading"><LoadingMini /></div>

  let results = [];
  results = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  const isSmallDevice = window.innerWidth <= 768;

  return (
    <> 
      <div className="title"> <h5> LIVE STANDINGS </h5> </div>

      <div className="table"> 
        <Link to={`/standings`}>
          <div className="drivers-standings-live-table-container">
            <table className="drivers-standings-live-table">

              <thead>
                <tr>
                    <th className="drivers-standings-live-table-position"> # </th>
                    <th className="drivers-standings-live-table-driver"> Driver </th>
                    <th className="drivers-standings-live-table-points"> Points </th>
                </tr>
              </thead>

              <tbody>
                {results.map((driver, index) => (
                  <tr key={index}> 
                    <td className="drivers-standings-live-table-position"> {driver.positionText} </td> 
                    <td className="drivers-standings-live-table-driver"> 
                      {(isSmallDevice) ? (`${driver.Driver.givenName[0]}.`) : (driver.Driver.givenName)}&nbsp;<strong>{driver.Driver.familyName}</strong>
                    </td>
                    <td className="drivers-standings-live-table-points"> {driver.points} </td> 
                  </tr>
                ))} 
              </tbody>

            </table>
          </div>
        </Link>
      </div>
    </> 
  );

}

export default DriversInfoLiveStandings;
