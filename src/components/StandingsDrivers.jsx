import { Link } from "react-router-dom";

function StandingsDrivers({results}) {

  const isSmallDevice = window.innerWidth <= 768;

  return (
    <table className="standings-list standings-drivers-list">
      
      <thead>
        <tr className="standings-drivers-list-header" key="header">
            <th className="standings-drivers-list-position"> # </th>
            <th className="standings-drivers-list-driver"> Driver </th>
            <th className="standings-drivers-list-constructor"> Constructor </th>
            <th className="standings-drivers-list-points"> Points </th>
        </tr>
      </thead>

      <tbody>
        {results.map((driver, index) =>(
          <tr key={index} className="fade-in">
            <td className="standings-drivers-list-position">{driver.positionText}</td>
            <td className="standings-drivers-list-driver">
              <Link to={`/drivers?id=${driver.Driver.driverId}`}>
                {(isSmallDevice) ? (`${driver.Driver.givenName[0]}.`) : (driver.Driver.givenName)}&nbsp;<span className="standings-drivers-list-driver-familyName">{driver.Driver.familyName}</span>
              </Link>
            </td>
            <td className="standings-drivers-list-constructor">
              <Link to={`/constructor?id=${driver.Constructors[0].constructorId}`}>
                {driver.Constructors[driver.Constructors.length-1].name}
              </Link>
            </td>
            <td className="standings-drivers-list-points">{driver.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default StandingsDrivers;
