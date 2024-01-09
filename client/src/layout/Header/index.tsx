import { NavLink } from "react-router-dom";

import Nav from "./Nav";

// import CartDataNav from "./CartDataNav";

import IBabSmall from "../../assets/main-icon-small.svg";

import "./style.scss";

const Header = () => {
  return (
    <header className="main-header">
      <NavLink to="/">
        <div className="main-icon">
          <div className="main-icon__img">
            <img src={IBabSmall} />
          </div>
          <h3>Babushka Market</h3>
        </div>
      </NavLink>
      <div className="main-header__right">
        <Nav />
        {/* <CartDataNav /> */}
      </div>
    </header>
  );
};

export default Header;
