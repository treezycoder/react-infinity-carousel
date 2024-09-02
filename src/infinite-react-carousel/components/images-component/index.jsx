import { useCarousel } from "../../carousel-context";
import ImageComponent from "../image-component";

const ImagesComponent = () => {
  const {
    isMovingLeft,
    isTranslating,
    transitionDuration,
    images,
    imageWidth,
  } = useCarousel();
  return (
    <div
      style={{
        left: `calc(${imageWidth.current * -4}% + ${
          imageWidth.current / 2
        }% - 24px)`,
        transform: isTranslating
          ? `translateX(${
              isMovingLeft.current
                ? `calc(${imageWidth.current}% + 12px)`
                : `calc(-${imageWidth.current}% - 12px)`
            })`
          : "",
        transition: isTranslating
          ? `transform ${transitionDuration.current}ms cubic-bezier(0.645, 0.045, 0.355, 1)`
          : "",
        willChange: "transform",
      }}
      className={`relative w-[200%] flex gap-3`}
    >
      {images.map((image, index) => (
        <ImageComponent image={image} index={index} />
      ))}
    </div>
  );
};

export default ImagesComponent;
