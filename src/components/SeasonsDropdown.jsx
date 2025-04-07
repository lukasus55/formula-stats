import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./SeasonsDropdown.css"
import { ChevronDown } from 'lucide-react';
import { useToggleState, isMobileDevice } from "./Helpers"; 

function SeasonsDropdown( {selectedSeason} ) {

  let currentYear = new Date().getFullYear();
  let isSmallDevice = isMobileDevice();
  const navigate = useNavigate();
  let seasons = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);
  let [dropdownExtended, toggleDropdownExtended] = useToggleState(false);

  useEffect(() => {
    if (!dropdownExtended) return;

    const selectedElement = document.querySelector(`[data-season="${selectedSeason}"]`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "center",    // Scroll to the center of the element
      });
    }
  }, [selectedSeason, !dropdownExtended]);

  return(
  <div className="seasons-dropdown-container">
        <div className="seasons-dropdown-current" onClick={toggleDropdownExtended}>
            <div className="seasons-dropdown-current-text">
                <span>{(isSmallDevice) ? (selectedSeason) : (`Season ${selectedSeason}`)} </span>
            </div>
            <div className="seasons-dropdown-current-expand-icon">
                <ChevronDown size="16"/>
            </div>
        </div>
        <div className="seasons-dropdown-box"  onClick={toggleDropdownExtended}>
            {dropdownExtended && 
              <div className="seasons-dropdown-content">
                <ol className="seasons-dropdown-list">
                  {seasons.map((season) => (
                    <li key={season} data-season={season} className="seasons-dropdown-year" onClick={() => (navigate(`?season=${season}`))}>
                      {isSmallDevice ? (season) : (`Season ${season}`)}
                    </li>
                  ))}
                </ol>
              </div>
            }
        </div>
    </div>
  );

}

export default SeasonsDropdown;
