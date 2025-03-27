import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { isMobileDevice } from "./Helpers";

function StandingsDropdown( {selectedSeason} ) {

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  let seasons = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);

  useEffect(() => {
    const selectedElement = document.querySelector(`[data-season="${selectedSeason}"]`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "center",    // Scroll to the center of the element
      });
    }
  }, [selectedSeason]);

  return(
    <div className="standings-table-dropdown-content">
        <ol className="standings-table-dropdown-list">
          {seasons.map((season) => (
            <li key={season} data-season={season} className="standings-table-dropdown-year" onClick={() => (navigate(`/standings?season=${season}`))}>
              {isMobileDevice() ? (season) : (`Season ${season}`)}
            </li>
          ))}
        </ol>
    </div>
  );

}

export default StandingsDropdown;
