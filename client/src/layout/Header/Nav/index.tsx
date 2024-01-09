import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Hamburger from "../../../components/Hamburger";

import useRollDown from "../../../hooks/useRollDown";

import "./style.scss";

const Nav = () => {
  const location = useLocation();

  const navMenu = ["", "market", "catering", "contact", "cafe"];

  const { ref, style, isOpen, handleState: handleMenu } = useRollDown();

  return (
    <>
      <div className="main-nav__icon">
        <Hamburger isOpen={isOpen} handleClick={handleMenu} />
      </div>
      <nav ref={ref} className="main-nav" style={isOpen ? style : undefined}>
        <ul>
          {navMenu.map((section) => (
            <li key={uuid()} onClick={() => isOpen && handleMenu()}>
              <NavLink
                to={section}
                style={
                  section === location.pathname.replace("/", "")
                    ? { color: "red" }
                    : {}
                }
              >
                {!section ? "home" : section}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
