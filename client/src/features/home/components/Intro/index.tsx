import { forwardRef } from "react";

import { motion } from "framer-motion";

import Slider from "../Slider";
import Matreshka from "./Matreshka";

import "./style.scss";

const Intro = () => {
  return (
    <section className="intro">
      {/* <Slider /> */}

      <div className="intro__content">
        <div className="intro__wrap">
          <div className="intro__label">
            <h1>Babushka Market, Deli & Cafe</h1>
          </div>
          <div className="intro__descr">
            <h3>
              Welcome to our family-owned market and deli, where tradition meets
              taste, and every visit feels like coming home. Since 1996, we've
              been proudly serving our community with a commitment to quality,
              personalized service, and a passion for creating culinary
              experiences that bring people together.
            </h3>
          </div>
          <div className="intro__matreshka">
            <div className="intro__matreshka__parts">
              <Matreshka />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
