import LoadingError from "./LoadingError";
import moment from "moment-timezone";
import tzlookup from "tz-lookup"

function ScheduleTime( { race } ) {

  if (!race) return <div className="schedule-single-race-error"> <LoadingError /> </div>
  if (!race.time || !race?.date) return <div className="schedule-single-race-error"> No data for this session. </div>

  const timeZone = localStorage.getItem("timeZone");

  const sessions = [
    {
      name: 'First Practice', 
      time: race?.FirstPractice?.time,
      date: race?.FirstPractice?.date,
    },
    {
      name: 'Second Practice', 
      time: race?.SecondPractice?.time,
      date: race?.SecondPractice?.date
    },
    {
      name: 'Third Practice', 
      time: race?.ThirdPractice?.time,
      date: race?.ThirdPractice?.date
    },
    {
      name: 'Sprint Shootout', 
      time: race?.SprintShootout?.time,
      date: race?.SprintShootout?.date
    },
    {
      name: 'Sprint Qualifying', 
      time: race?.SprintQualifying?.time,
      date: race?.SprintQualifying?.date
    },
    {
      name: 'Sprint', 
      time: race?.Sprint?.time,
      date: race?.Sprint?.date
    },
    {
      name: 'Qualifying', 
      time: race?.Qualifying?.time,
      date: race?.Qualifying?.date
    },
    {
      name: 'Race', 
      time: race?.time,
      date: race?.date
    }
  ];

  const validSessions = sessions
  .filter(session => session.time)
  .map(session => ({
    ...session,
    datetime: moment.utc(`${session.date}T${session.time}`)
  }));

  // Sort sessions chronologically
  validSessions.sort((a, b) => a.datetime - b.datetime);

  // Time formatin for UTC+0 time zone
  if (timeZone === "central") {
    validSessions.forEach(session => {
      session.time = session.time.slice(0, 5);
    });
  }

  // Adjusting dates and times for user local time zone
  else if (timeZone === "user") {
    validSessions.forEach(session => {
      const localTimeZone = moment.tz.guess();
      const localMoment = session.datetime.clone().tz(localTimeZone);
      session.time = localMoment.format('HH:mm');
      session.date = localMoment.format('YYYY-MM-DD');
    });
  }

  else if (timeZone === "track") {
    const lat = race.Circuit.Location.lat;
    const long = race.Circuit.Location.long;
    const timeZoneName = tzlookup(lat, long);

    validSessions.forEach(session => {
      const trackMoment = session.datetime.clone().tz(timeZoneName);
      session.time = trackMoment.format('HH:mm');
      session.date = trackMoment.format('YYYY-MM-DD');
    });
  }

  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <>
      {validSessions.map(session => (
        <div className="schedule-single-race-single-session" key={session.name}>
          <div className="schedule-single-session-date">
            <span className="schedule-single-session-date-day">{session.date.split("-")[2]}</span>&nbsp;
            <span className="schedule-single-session-date-month">{shortMonths[parseInt(session.date.split("-")[1]-1)]}</span>
          </div>
          <div className={`schedule-single-session-name ${session.name === 'Race' ? 'schedule-single-session-name-main-race' : ''}`}>
            {session.name}
          </div>
          <div className="schedule-single-session-time">
            {session.time}
          </div>
        </div>
      ))}
    </>
  );
}

export default ScheduleTime;
