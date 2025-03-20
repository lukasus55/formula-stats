import { useNavigate } from "react-router-dom";

function StandingsDropdown() {

  let currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  let seasons = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);
  const isSmallDevice = window.innerWidth <= 768;

  return(
    <div className="standings-table-dropdown-content">
        <ol className="standings-table-dropdown-list">
          {seasons.map((season) => (
            <li key={season} className="standings-table-dropdown-year" onClick={() => (navigate(`/standings?season=${season}`))}>
              {isSmallDevice ? (season) : (`Season ${season}`)}
            </li>
          ))}
        </ol>
    </div>
  );

}

export default StandingsDropdown;
