import { useEffect } from "react";
import { useCarousel } from "../../carousel-context";
import "../../styles/styles.css"; //use this if you prefer css
import ImagesComponent from "../images-component";
import PrevControl from "../icons/prev-control";
import NextControl from "../icons/next-control";
import IndicatorsComponent from "../indicators-component";

export default function CarouselComponent() {
  const {
    images,
    currentIndex,
    isMovingLeft,
    transitionDuration,
    clickDelay,
    nextIndicator,
    isSwitchingIndicator,
    setIsSwitchingIndicator,
    autoPlaying,
    autoPlayingRef,
    handleNext,
    handlePrev,
    isTranslating,
    timeoutId,
    setTimeoutId,
  } = useCarousel();

  useEffect(() => {
    if (isSwitchingIndicator && nextIndicator < currentIndex) {
      setTimeout(handlePrev, 100);
    } else if (isSwitchingIndicator && nextIndicator > currentIndex) {
      setTimeout(handleNext, 100);
    } else if (isSwitchingIndicator && nextIndicator === currentIndex) {
      setIsSwitchingIndicator(false);
      setTimeout(
        () => (transitionDuration.current = 800),
        transitionDuration.current
      );
    }
    return () => {
      clearTimeout(handlePrev, 100);
      clearTimeout(handleNext, 100);
    }
  }, [nextIndicator, images, isSwitchingIndicator, currentIndex]);

  useEffect(() => {
    if (clickDelay !== 0 && clickDelay < 200) {
      transitionDuration.current = 100;
    } else if (clickDelay > 200 && clickDelay < 500) {
      transitionDuration.current = 300;
    } else if (clickDelay > 500 && clickDelay < 1100) {
      transitionDuration.current = 500;
    } else {
      transitionDuration.current = 800;
    }
  }, [clickDelay]);

  useEffect(() => {
    function handleAutoPlayPrev() {
      if (autoPlaying && autoPlayingRef.current) {
        handlePrev();
      }
    }

    function handleAutoPlayNext() {
      if (autoPlaying && autoPlayingRef.current) {
        handleNext();
      }
    }

    if (autoPlaying && autoPlayingRef.current) {
      transitionDuration.current = 1000;
      let id;
      if (isMovingLeft.current && autoPlaying && autoPlayingRef.current) {
        id = setTimeout(handleAutoPlayPrev, 5000);
      } else if (
        !isMovingLeft.current &&
        autoPlaying &&
        autoPlayingRef.current
      ) {
        id = setTimeout(handleAutoPlayNext, 5000);
      } else {
        id = setTimeout(handleAutoPlayNext, 5000);
      }
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId);
    };
  }, [autoPlaying, images, autoPlayingRef.current]);

  console.log(
    currentIndex,
    transitionDuration.current,
    autoPlaying,
    autoPlayingRef.current,
    isTranslating
  );
  return (
    <div
      id=""
      className={`bg-black overflow-hidden w-full pt-[12px] pb-10 relative`}
    >
      <ImagesComponent />
      <IndicatorsComponent />
      <PrevControl />
      <NextControl />
    </div>
  );
}
