import { useCarousel } from "../../carousel-context";
import PlayControl from "../icons/play-control";
import IndicatorComponent from "../indicator-component";

const IndicatorsComponent = () => {
  const { images } = useCarousel();

  return (
    <div className={`absolute  w-full flex justify-center items-center`}>
      <div
        className={`h-10 flex gap-2 justify-center items-center px-2 rounded-md`}
      >
        {Array.from({ length: images.length }, (_, index) => (
          <IndicatorComponent index={index} />
        ))}
      </div>
      <PlayControl />
    </div>
  );
};

export default IndicatorsComponent;
