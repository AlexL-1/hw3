import { useCallback, useState } from "react";
import styles from "./Carousel.module.scss";
import React from "react";
import PrevIcon from "components/icons/PrevIcon";
import NextIcon from "components/icons/NextIcon";

type CarouselProps = {
  images: string[];
  alt: string;
};

const Carousel: React.FC<CarouselProps> = ({ images, alt }: CarouselProps) => {
  const [imgID, SetImgID] = useState(0);

  const handleNextImage = useCallback(
    (step: number) => {
      //шаг вперед или назад, но не дальше границ массива
      let nextImageID = imgID + step;
      if (nextImageID < 0) nextImageID = images.length - 1;
      if (nextImageID >= images.length) nextImageID = 0;
      SetImgID(nextImageID);
    },
    [imgID]
  );

  return (
    <div className={styles.container}>
      <button className={styles.buttonPrev} onClick={() => handleNextImage(-1)}>
        <PrevIcon />
      </button>
      <button className={styles.buttonNext} onClick={() => handleNextImage(1)}>
        <NextIcon />
      </button>
      <img src={images[imgID]} alt={alt} />
    </div>
  );
}; //надо показать одну картинку из коллекции и кнопки для прокрутки

export default Carousel;
