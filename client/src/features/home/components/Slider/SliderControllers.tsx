import { Dispatch, SetStateAction } from "react";

import IcDown from "../../../../assets/icons/down.svg";

import "./SliderControllers.scss";
import Button from "../../../../components/Button";

const SliderControllers = ({
  setIndex,
  isFirstSlider,
  isLastSlider,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
  isFirstSlider: boolean;
  isLastSlider: boolean;
}) => {
  return (
    <>
      <div
        style={{ display: isFirstSlider ? "none" : "block" }}
        className="slider__arrow left"
        onClick={() => !isFirstSlider && setIndex((index) => index - 1)}
      >
        <Button>
          <img src={IcDown} alt="Left" />
        </Button>
      </div>
      <div
        style={{ display: isLastSlider ? "none" : "block" }}
        className="slider__arrow right"
        onClick={() => !isLastSlider && setIndex((index) => index + 1)}
      >
        <Button>
          <img src={IcDown} alt="Left" />
        </Button>
      </div>
    </>
  );
};

export default SliderControllers;
