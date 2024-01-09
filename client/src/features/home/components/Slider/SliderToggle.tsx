import { Dispatch, SetStateAction } from "react";

import IcPause from "../../../../assets/images/slider/icons/pause.svg";
import IcPlay from "../../../../assets/images/slider/icons/play.svg";

import "./SliderToggle.scss";

interface IProps {
  isAuto: boolean;
  setIsAuto: Dispatch<SetStateAction<boolean>>;
}

const SliderToggle = ({ isAuto, setIsAuto }: IProps) => {
  return (
    <div
      className="slider__auto-toggle"
      onClick={() => setIsAuto((isAuto) => !isAuto)}
    >
      <img src={isAuto ? IcPause : IcPlay} alt={isAuto ? "Pause" : "Play"} />
    </div>
  );
};

export default SliderToggle;
