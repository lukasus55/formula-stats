import { Link } from "react-router-dom";

function StandingsTeams({results}) {

  return (
    <table className="standings-list standings-teams-list">
      
      <thead>
        <tr className="standings-teams-list-header" key="header">
            <th className="standings-teams-list-position"> # </th>
            <th className="standings-teams-list-constructor"> Constructor </th>
            <th className="standings-teams-list-wins"> Wins </th>
            <th className="standings-teams-list-points"> Points </th>
        </tr>
      </thead>

      <tbody>
        {results.map((team, index) => (
          <tr key={index} className="fade-in">
            <td className="standings-teams-list-position">{team.positionText}</td>
            <td className="standings-teams-list-constructor">
              <Link to={`/constructor?id=${team.Constructor.constructorId}`}>
                {team.Constructor.name}
              </Link>
            </td>
            <td className="standings-teams-list-wins">{team.wins}</td>
            <td className="standings-teams-list-points">{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default StandingsTeams;
