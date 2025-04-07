import { Link } from "react-router-dom";
import { windowSizeDefiner } from "./Helpers";
import { Moon, Clock } from 'lucide-react';
import { useToggleState } from "./Helpers";
import { useState } from "react";

function NavbarList() {

  const windowSize = windowSizeDefiner();

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  function handleThemeChange() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    window.location.reload()
}


  return (
    <>
      <div className="navbar-list-container">
        <ul className="navbar-list">
          <li className="navbar-list-standard-element"> <Link to="/"><h5> Home </h5></Link> </li>
          <li className="navbar-list-standard-element"> <Link to="/standings"> <h5> Standings </h5></Link> </li>
          <li className="navbar-list-standard-element"> <Link to="/schedule"><h5> Schedule </h5></Link> </li>
          <li className="navbar-list-standard-element"> <Link to="/drivers"><h5> Drivers </h5></Link> </li>
          <li className="navbar-list-standard-element"> <Link to="/constructors"><h5> Constructors </h5></Link> </li>
          {( 
            windowSize.width<=992 ? <li className="navbar-list-standard-element"> <Link to="/more"><h5> More </h5></Link> </li> :

            <li className="navbar-list-standard-element navbar-list-more-element"> 
              <div className="navbar-list-more-button"><h5> <Link to="/more"> More </Link></h5></div> 
              <ol className="navbar-list-more-list">

                <li> <div className="navbar-list-more-list-header-element"> GENERAL </div> </li>
                <li> <div className="navbar-list-more-list-standard-element"> <Link to="/about"> About </Link> </div> </li>
                <li> <div className="navbar-list-more-list-standard-element"> <Link to="/contact"> Contact </Link> </div> </li>
                <li> <div className="navbar-list-more-list-standard-element"> <Link to="/legal/cookie-policy"> Cookie Policy </Link> </div> </li>
                <li> <div className="navbar-list-more-list-empty-element">  </div> </li>

                <li> <div className="navbar-list-more-list-header-element"> <Link to="/settings"> SETTINGS </Link></div> </li>
                <li> <div className="navbar-list-more-list-settings-element"> 
                  <div className="navbar-setting-header" onClick={handleThemeChange}> <Moon size="15px"/>&nbsp;<span className="navbar-setting-title"> Dark Theme </span> </div>
                  <div className="navbar-toggle-container">
                    <input type="checkbox" className="navbar-toggle-checkbox" id="navbar_theme_checkbox" onChange={handleThemeChange} checked={theme === "dark"}/>
                    <label className="navbar-toggle-switch" htmlFor="navbar_theme_checkbox">
                      <span className="navbar-toggle-slider"></span>
                    </label>
                  </div>
                </div> </li>
                <li> <div className="navbar-list-more-list-standard-element"> <Link to="/settings#timezone"> <Clock size="15px"/>&nbsp;Time Zone </Link> </div> </li>

              </ol> 
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default NavbarList;
