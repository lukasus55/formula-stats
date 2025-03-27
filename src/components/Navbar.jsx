import { Link } from "react-router-dom";
import './Navbar.css';
import NavbarList from "./NavbarList";
import NavBarMobile from './NavBarMobile';
import { windowSizeDefiner } from "./Helpers";

function Navbar() {

  const windowSize = windowSizeDefiner();

  return (
    <nav className="navbar-container">
      {(windowSize.width<=992 ? 
        <NavBarMobile /> :
        <>
          <div className="navbar-logo">
            <Link to="/"> <img src="./esf1logo.png" width="48px" height="60px"></img> </Link>
          </div>
          <NavbarList />
        </>
      )}
  </nav>
  );


};

export default Navbar;