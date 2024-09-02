import { useCarousel } from "../../carousel-context";

const ImageComponent = ({ image, index }) => {
  const {
    currentIndexRef,
    currentIndex,
    isTranslating,
    transitionDuration,
    imageWidth,
    handleNext,
    handlePrev,
    isSwitchingIndicator,
    setAutoPlaying,
    handleClickDelay,
    autoPlayingRef,
  } = useCarousel();

  return (
    <div
      onClick={
        index === 1
          ? () => {
              if (isSwitchingIndicator) return;
              autoPlayingRef.current = false;
              setAutoPlaying(false);
              handleClickDelay();
              if (!isTranslating) {
                handlePrev();
              }
            }
          : index === 3
          ? () => {
              if (isSwitchingIndicator) return;
              autoPlayingRef.current = false;
              setAutoPlaying(false);
              handleClickDelay();
              if (!isTranslating) {
                handleNext();
              }
            }
          : null
      }
      style={{
        width: `${imageWidth.current}%`,
        opacity: `${image.id === currentIndexRef.current ? "1" : "0.2"}`,
        transition: isTranslating
          ? `opacity ${transitionDuration.current}ms ease-out`
          : "",
        willChange: "opacity",
      }}
      key={index}
      className={`h-[400px] flex-none ${
        index === 1 || 3 ? "cursor-pointer" : ""
      }`}
    >
      <img
        loading="lazy"
        alt={`${index + 1}`}
        src={image.src}
        className={`w-full h-full object-cover border-0`}
      />
    </div>
  );
};

export default ImageComponent;
