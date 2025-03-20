import { Link } from "react-router-dom";

function NavbarList() {
  return (
    <div className="navbar-list-container">
      <ul className="navbar-list">
        <li className="navbar-list-standard-element"> <Link to="/"><h5> Home </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/standings"> <h5> Standings </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/schedule"><h5> Schedule </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/drivers"><h5> Drivers </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/constructors"><h5> Constructors </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/circuits"><h5> Circuits </h5></Link> </li>
        <li className="navbar-list-standard-element"> <Link to="/more"><h5> More </h5></Link> </li>
      </ul>
    </div>
  )
}

export default NavbarList;
