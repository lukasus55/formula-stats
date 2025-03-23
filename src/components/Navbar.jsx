import { Link } from "react-router-dom";
import './Navbar.css';
import NavbarList from "./NavbarList";
import { lazy } from 'react';
const NavBarMobile = lazy(() => import('./NavBarMobile'));
import { windowSizeDefiner } from "./Helpers";

function Navbar() {

  let windowSize = windowSizeDefiner();

  if (windowSize.width<=992)
  {
    return (
      <nav className="navbar-container">

        <NavBarMobile />

      </nav>
    );
  }
  else
  {
    return (
      <nav className="navbar-container">

        <div className="navbar-logo">
          <Link to="/"> <img src="/esf1logo.png" width="48px" height="60px"></img> </Link>
        </div>

        <NavbarList />

      </nav>
    );
  }

};

export default Navbar;