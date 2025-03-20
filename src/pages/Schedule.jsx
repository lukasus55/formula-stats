import { Helmet } from "react-helmet-async";
import "./Schedule.css";

function Schedule () {
    let currentYear = new Date().getFullYear();

    return (
        <>
            <Helmet>
                <title>F1 Statistics - {currentYear.toString()} Schedule</title>
                <meta name="description" content="F1 Stats - Schedule of all races in 2025. Next: " />
            </Helmet>

            <div className="schedule-container">

                <div className="schedule-title">
                    <h3>Schedule</h3>
                </div>

            </div>
        </>
    );
};
  
export default Schedule;