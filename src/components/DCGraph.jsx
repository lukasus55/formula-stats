import LoadingMini from "../pages/LoadingMini";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { isEmpty } from "./Helpers";

function DCGraph( {driver, graphMode} ) {
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  const [positionList, setPositionList] = useState({'not_empty': 'not'});
  const [attendedAnySession, setAttendedAnySession] = useState(true);

  useEffect(() => {
    if (!driver) return;

    if(graphMode === "Races") {setPositionList(driver.racePositionsList);}
    else if(graphMode === "Qualis") {setPositionList(driver.gridList);}
    else if(graphMode == "Sprints") {setPositionList(driver.sprintPositionsList);}

  },[driver, graphMode])

  useEffect(() => {
    if (isEmpty(positionList)) {
      setAttendedAnySession(false);
    } else {
      setAttendedAnySession(true);
    }
  }, [positionList]);

  if(!driver){return <LoadingMini />}
  if(!graphMode) {return <div className="dc-graph-err"> Error occured while loading graph. </div>}
  if(!attendedAnySession) {return <div className="dc-graph-err"> This driver has not participated in any {graphMode.toLowerCase()}. </div>}

  let lastPosition = Object.keys(positionList).slice(-1).shift();
  if (isNaN(lastPosition)) //Last arg NaN are the unfinished races/sprints
  {
    lastPosition = Object.keys(positionList).slice(-2).shift();
  }
  const allPositionsAmount = parseInt(lastPosition, 10);

  const allPositions = []
  const results = []
  for (let i=1; i<=allPositionsAmount; i++)
  {
    allPositions.push(i)
    results.push(positionList[i] || 0)
  }

  const data = {
    labels: allPositions,
    datasets: [
      {
        label: "Times finished",
        data: results,
        backgroundColor: "#7f31d8",
        borderColor: "#7f31d8",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  )

}
export default DCGraph;
