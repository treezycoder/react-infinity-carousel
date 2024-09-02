import { useCarousel } from "../../carousel-context";

const NextControl = () => {
  const {
    isSwitchingIndicator,
    isTranslating,
    handleClickDelay,
    setAutoPlaying,
    handleNext,
    autoPlayingRef,
  } = useCarousel();
  return (
    <span
      style={{ top: "calc(50% - 40px)" }}
      className={`absolute right-[5%] cursor-pointer lg:hidden`}
      onClick={() => {
        if (isSwitchingIndicator) return;
        autoPlayingRef.current = false;
        setAutoPlaying(false);
        handleClickDelay();
        if (!isTranslating) {
          handleNext();
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="gray"
        className={`size-8  transition ease-in-out delay-200`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </span>
  );
};

export default NextControl;
