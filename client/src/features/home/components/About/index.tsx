import { useRef } from "react";

import Slider from "../Slider";
import IDown from "../../../../assets/icons/down.svg";

import "./style.scss";

const About = () => {
  const aboutSectionRef = useRef<any>(null);

  return (
    <div ref={aboutSectionRef} className="about">
      <div
        className="about__down"
        onClick={() =>
          aboutSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
      >
        <img src={IDown} alt="Scroll Down" />
      </div>
      <div className="about__content">
        <Slider />
      </div>
    </div>
  );
};

export default About;
