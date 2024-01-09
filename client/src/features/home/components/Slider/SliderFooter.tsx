import "./SliderFooter.scss";

interface IProps {
  index: number;
  transition: number;
  slideInViewMs: number;
  transitionActive: boolean;
}

const SliderFooter = ({
  index,
  transition,
  transitionActive,
  slideInViewMs,
}: IProps) => {
  return (
    <div
      key={index}
      style={{
        animationDuration:
          index === 0 && !transitionActive
            ? slideInViewMs - transition + "ms"
            : slideInViewMs + "ms",
      }}
      className="slider__footer"
    />
  );
};

export default SliderFooter;
