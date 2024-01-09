import { useEffect, useState, useMemo } from "react";

import { BrowserView, MobileView, isMobile } from "react-device-detect";

import { AnimatePresence, motion } from "framer-motion";

import { v4 as uuid } from "uuid";

import SliderControllers from "./SliderControllers";
import SliderBullets from "./SliderBullets";
import SliderToggle from "./SliderToggle";
import SliderFooter from "./SliderFooter";

import "./style.scss";

enum Position {
  TopLeft = "topleft",
  TopRight = "topright",
  BottomRight = "bottomright",
  BottomLeft = "bottomleft",
}

interface ISrc {
  mobile: string;
  standart: string;
}

interface ISlider {
  id: string;
  title: string;
  img: string | ISrc;
  position: Position;
  descr: string;
}

const slides: ISlider[] = [
  {
    id: uuid(),
    title: "Family",
    img: "papa_and_z_mobile.jpg",
    position: Position.BottomLeft,
    descr:
      "Established in 1996, our market and deli have been a labor of love for our family. From the very beginning, we set out to build a space that not only provides top-notch products but also cultivates a sense of community. Our story is woven into the fabric of our establishment, making each day a continuation of the legacy we've built over the years",
  },
  {
    id: uuid(),
    title: "Market from Outside",
    img: "sign.webp",
    position: Position.BottomRight,
    descr:
      "Step into our market, and you'll find a delightful array of homestyle goodies. From freshly baked bread and artisanal cheeses to handpicked produce and gourmet treats, we curate our selection with a discerning palate. Our deli boasts an array of signature pastries, prepared with care and using only the finest ingredients – a true reflection of our dedication to quality.",
  },
  {
    id: uuid(),
    title: "Serving",
    img: "serving.webp",
    position: Position.BottomLeft,
    descr:
      "Beyond being a market and deli, we're a hub for community connection. We've had the privilege of serving generations of families, and the relationships we've built go beyond transactions. Our customers are not just patrons; they're an extension of our family. We take pride in knowing your name, understanding your preferences, and being a familiar face in your daily routine.",
  },
  {
    id: uuid(),
    title: "Top Quality Food",
    img: "deli.webp",
    position: Position.BottomRight,
    descr:
      "Quality is not just a standard for us; it's a way of life. We source our products from trusted suppliers, ensuring that every item on our shelves meets our stringent criteria for freshness, flavor, and authenticity. Our commitment to quality extends to our deli, where each sandwich is crafted with precision and passion.",
  },
  {
    id: uuid(),
    title: "Market Inside",
    img: "inside.webp",
    position: Position.TopRight,
    descr:
      "Being a family-owned business allows us to offer a level of personalized service that larger establishments might find challenging. Our team is here to assist you, whether it's helping you find the perfect ingredients for a family recipe or crafting a custom sandwich that caters to your taste buds. Your satisfaction is our priority.",
  },
];

const slideInViewMs = 13000;
const transition = 500;

const Slider = () => {
  const [index, setIndex] = useState<number>(0);
  const [transitionActive, setTransitionActive] = useState<boolean>(true);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  const slideArr = useMemo(() => {
    return [...slides, slides[0]];
  }, []);

  useEffect(() => {
    if (isAuto) {
      const interval = setInterval(
        () => {
          if (slideArr.length - 1 > index) {
            if (!transitionActive) {
              setTransitionActive(true);
            }

            setIndex((index) => index + 1);
          }
        },
        index === 0 && !transitionActive
          ? slideInViewMs - transition
          : slideInViewMs
      );

      return () => clearInterval(interval);
    }
  }, [index, isAuto, transitionActive]);

  useEffect(() => {
    if (slideArr.length - 1 === index) {
      const timeout = setTimeout(() => {
        setIndex(0);
        setTransitionActive(false);
      }, transition);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="slider">
      <div
        style={{
          width: 100 * slideArr.length + "%",
          transform: `translateX(-${(100 / slideArr.length) * index}%)`,
          transition: transitionActive ? `${transition}ms` : "none",
        }}
        className={`slider__content`}
      >
        {slideArr.map(({ id, title, img, position, descr }: ISlider, i) => {
          return (
            <div key={id + i} className="slider__item">
              {typeof img === "string" ? (
                <img
                  src={require(`../../../../assets/images/slider/${img}`)}
                  alt={title}
                />
              ) : (
                <>
                  <BrowserView>
                    <img
                      src={require(`../../../../assets/images/slider/${img.standart}`)}
                      alt={title}
                    />
                  </BrowserView>
                  <MobileView>
                    <img
                      src={require(`../../../../assets/images/slider/${img.mobile}`)}
                      alt={title}
                    />
                  </MobileView>
                </>
              )}
              <AnimatePresence>
                {index === i && (
                  <motion.div
                    key={id + i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className={`slider__descr ${
                      position === Position.TopRight
                        ? "top-right"
                        : position === Position.TopLeft
                        ? "top-left"
                        : position === Position.BottomRight
                        ? "bottom-right"
                        : "bottom-left"
                    } ${isMobile ? "mobile" : ""}`}
                  >
                    <h4>{descr}</h4>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {isAuto ? null : (
        <SliderControllers
          setIndex={setIndex}
          isFirstSlider={index === 0}
          isLastSlider={index === slideArr.length - 2}
        />
      )}
      <SliderBullets index={index} setIndex={setIndex} slides={slides} />
      <SliderToggle isAuto={isAuto} setIsAuto={setIsAuto} />
      {isAuto ? (
        <SliderFooter
          index={index}
          transition={transition}
          transitionActive={transitionActive}
          slideInViewMs={slideInViewMs}
        />
      ) : null}
    </div>
  );
};

export default Slider;
