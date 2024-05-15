import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import GalleryDetails from "./GalleryDetails";
import Carousel from "./Carousel";

import "./Gallery.scss";

import galleryList from "../galleryList";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carouselOpen, setCarouselOpen] = useState<boolean>(false);

  const handleCarouselVisib = (index?: number) => {
    setCarouselOpen(!carouselOpen);
    index && setCurrentIndex(index);
  };

  return (
    <>
      <div className="gallery">
        <div className="gallery__list">
          {galleryList.map(({ id, ...imageData }, index) => {
            return (
              <GalleryDetails
                key={id}
                data={imageData}
                handleCarouselVisib={() => handleCarouselVisib(index)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {carouselOpen && (
          <Carousel
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            handleCarouselVisib={handleCarouselVisib}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
