import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import Close from "../../../components/Close";
import useFreezeBackground from "../../../hooks/useFreezeBackground";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

import galleryList from "../galleryList";

import "./Carousel.scss";

const Carousel = ({
  currentIndex,
  setCurrentIndex,
  handleCarouselVisib,
}: {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  handleCarouselVisib: () => void;
}) => {
  useFreezeBackground();

  const sliderWidth = 100 / galleryList.length;

  const handleIndex = (index: number) => {
    if (index < 0 || index > galleryList.length - 1) {
      return null;
    }

    setCurrentIndex(index);
  };

  const rootElement = document.querySelector("#carousel");

  return rootElement
    ? ReactDOM.createPortal(
        <>
          <div className="carousel__close" onClick={handleCarouselVisib}>
            <Close color="#fff" />
          </div>
          <motion.div
            key={"backdrop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => null}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="carousel"
          >
            <div
              className="carousel__content"
              style={{
                width: `${100 * galleryList.length}%`,
                transform: `translateX(-${sliderWidth * currentIndex}%)`,
              }}
            >
              {galleryList.map(({ id, image }) => {
                return (
                  <div
                    key={id}
                    className="carousel__slide"
                    style={{
                      width: `${sliderWidth}%`,
                    }}
                  >
                    <img
                      src={require(`../../../assets/images/${image}`)}
                      alt="Babushka gallery"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
          {currentIndex > 0 ? (
            <div
              className="carousel__left carousel__control"
              onClick={() => handleIndex(currentIndex - 1)}
            >
              <AiOutlineArrowLeft size={35} color="#fff" />
            </div>
          ) : null}
          {currentIndex < galleryList.length - 1 ? (
            <div
              className="carousel__right carousel__control"
              onClick={() => handleIndex(currentIndex + 1)}
            >
              <AiOutlineArrowRight size={35} color="#fff" />
            </div>
          ) : null}
        </>,
        rootElement
      )
    : null;
};

export default Carousel;
