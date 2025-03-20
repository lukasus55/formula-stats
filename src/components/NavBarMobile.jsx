import { Link } from "react-router-dom";
import NavbarList from "./NavbarList";
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useToggleState } from "../components/Helpers";

function NavBarMobile() {
  let [menuExpanded, toggleMenuExpanded] = useToggleState(false);
  let [isDisabled, setIsDisabled] = useToggleState(false); // Button cooldown

  function handleMenuExpandButton() {
    if (isDisabled) return;

    setIsDisabled(true);
    toggleMenuExpanded();
    setTimeout(() => setIsDisabled(false), 400);
  }

  return (
    <>
      <div className={`navbar-mobile-expand-button ${isDisabled ? "disabled" : ""}`} onClick={handleMenuExpandButton}>
        {menuExpanded ? <X size="30" /> : <Menu size="30"/>}
      </div>

      <div className="navbar-logo">
        <Link to="/">
          <img src="/esf1logo.png" />
        </Link>
      </div>

      <div className="navbar-mobile-center-help-div"></div>

      {menuExpanded ? <NavbarList /> : ""}
    </>
  );
}

export default NavBarMobile;
