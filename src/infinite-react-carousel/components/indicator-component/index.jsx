import { useCarousel } from "../../carousel-context";

const IndicatorComponent = ({ index }) => {
  const {
    currentIndex,
    transitionDuration,
    setAutoPlaying,
    autoPlayingRef,
    handleIndicatorClick,
  } = useCarousel();
  return (
    <span
      onClick={() => {
        autoPlayingRef.current = false;
        setAutoPlaying(false);
        handleIndicatorClick(index);
      }}
      key={index + "i"}
      style={{
        transition: `background-color ${transitionDuration.current}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
      }}
      className={`rounded-full w-2 h-2 ${
        currentIndex === index ? "bg-white" : "bg-white/50"
      } ring-1 ring-black cursor-pointer hover:scale-105 ${
        currentIndex === index ? "" : "hover:bg-white/70"
      }  `}
    ></span>
  );
};

export default IndicatorComponent;
