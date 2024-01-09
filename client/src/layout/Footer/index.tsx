import IcInstagram from "../../assets/icons/instagram.svg";
import IcFacebook from "../../assets/icons/facebook.svg";

import "./style.scss";

const Footer = () => {
  return (
    <footer
      // className={`footer ${location.pathname === "/" ? "footer__home" : ""}`}
      className="footer"
    >
      <div className="footer__hours">
        <h4>Hours</h4>
        <span>Mon – Sat: 10:00 AM – 6:30 PM</span>
        <span>Sunday: 11:00 AM – 5:00 PM</span>
      </div>
      <div className="footer__follow">
        <ul>
          <li className="footer__icon footer__fb">
            <a
              href="https://www.facebook.com/babsrussiandelish"
              target="_blank"
              rel="noreferrer"
            >
              <img src={IcFacebook} alt="Babushka Facebook Page" />
            </a>
          </li>
          <li className="footer__icon footer__ig">
            <a
              href="https://www.instagram.com/babushka.market.and.deli/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={IcInstagram} alt="Babushka Instagram Page" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__contact">
        <h4>Contact</h4>
        <span>1475 Newell Ave Walnut Creek, CA 94596</span>
        <a href="mailto:info@babushkamarket.com">info@babushkamarket.com</a>
        <a href="tel:9252100779">925-210-0779</a>
      </div>
    </footer>
  );
};

export default Footer;
