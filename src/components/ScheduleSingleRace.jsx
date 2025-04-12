import { ChevronDown } from 'lucide-react';
import lookup from 'country-code-lookup';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useToggleState } from './Helpers';
import LoadingError from './LoadingError';
import ScheduleTime from './ScheduleTime';
import { isMobileDevice } from './Helpers';

function ScheduleSingleRace( { race } ) {

  if (!race) return <div className="schedule-single-race-error"> <LoadingError /> </div>

  let [raceDetailsExpanded, toggleRaceDetailsExpanded] = useToggleState(false);

  const firstPracticeDate = race?.FirstPractice?.date?.split("-")
  const raceDate = race?.date?.split("-");

  let formattedFirstPracticeDate = "";
  let formattedRaceDate = ""; 

  if (firstPracticeDate) {formattedFirstPracticeDate = `${firstPracticeDate[2]}.${firstPracticeDate[1]}`}; //formating from "YYYY-MM-DD" to "DD.MM" and adding "-" if not mobile}
  if (raceDate) {formattedRaceDate = `${raceDate[2]}.${raceDate[1]}`}; //formating from "YYYY-MM-DD" to "DD.MM"

  let circuitCountry = race.Circuit.Location.country;
  if (circuitCountry === "UAE") {circuitCountry = "United Arab Emirates"};
  if (circuitCountry === "UK") {circuitCountry = "United Kingdom"};
  if (circuitCountry === "USA") {circuitCountry = "United States"};

  const circuitCountryCode = lookup.byCountry(circuitCountry)?.iso2.toLowerCase()

  return (
    <>
        <div className="schedule-single-race">
          <div className="schedule-single-race-header">
            <div className="schedule-single-race-title"> 
              <span className={`fi fi-${circuitCountryCode} dcsearch-results-flag`}/>
              &nbsp;{ isMobileDevice() ? race.raceName.split(" ")[0]+" GP" : race.raceName} 
            </div>
            <div className="schedule-single-race-date"> {formattedFirstPracticeDate}{isMobileDevice() ? <br /> : ' - '}{formattedRaceDate} </div>
            <div className="schedule-single-race-expand-container" onClick={toggleRaceDetailsExpanded}> 
              <ChevronDown size="16" className={`schedule-single-race-expand-button ` + (raceDetailsExpanded && 'rotate180')}/> 
            </div>
          </div>
          {raceDetailsExpanded && 
            <div className="schedule-single-race-details">
              <div className="schedule-single-race-times"> <ScheduleTime race={race}/> </div>
            </div>
          }
        </div>
    </>
  );
}

export default ScheduleSingleRace;
