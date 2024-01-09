import { Dispatch, SetStateAction } from "react";

import "./SliderBullets.scss";

interface IProps {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  slides: any;
}

const SliderBullets = ({ index, setIndex, slides }: IProps) => {
  return (
    <div className="slider__bullets">
      {Array(slides.length)
        .fill(null)
        .map((_, i) => {
          return (
            <div
              key={i}
              style={{ backgroundColor: index === i ? "#666" : "#ccc" }}
              className="slider__donut"
              onClick={() => setIndex(i)}
            />
          );
        })}
    </div>
  );
};

export default SliderBullets;
