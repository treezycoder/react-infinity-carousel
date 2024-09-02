import { createContext, useContext, useState, useRef } from "react";

const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {
  const [images, setImages] = useState([
    {
      src: "https://images.pexels.com/photos/34950/pexels-photo.jpg?w=1013&h=400&fit=crop",
      id: 0,
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      id: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=1013",
      id: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=1100",
      id: 3,
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
      id: 4,
    },
    {
      src: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=1400&h=600&fit=crop",
      id: 5,
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=1300",
      id: 6,
    },
    {
      src: "https://images.unsplash.com/photo-1441829266145-6d4bfbd38eb4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=1600",
      id: 7,
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
      id: 8,
    },
    {
      src: "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?w=1800&h=900&fit=crop",
      id: 9,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTranslating, setIsTranslating] = useState(false);
  const carouselRef = useRef(null);
  const isMovingLeft = useRef(null);
  const currentIndexRef = useRef(2);
  const transitionDuration = useRef(500);
  const lastClickTimeRef = useRef(null);
  const [clickDelay, setClickDelay] = useState(0);
  const [nextIndicator, setNextIndicator] = useState(null);
  const [isSwitchingIndicator, setIsSwitchingIndicator] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const autoPlayingRef = useRef(false);
  const imageWidth = useRef(33.333333);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleNext = () => {
    if (isTranslating) return;
    isMovingLeft.current = false;
    if (currentIndexRef.current === images.length - 1) {
      currentIndexRef.current = 0;
    } else {
      currentIndexRef.current += 1;
    }
    setIsTranslating(true);
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    let updatedImages = [...images, images[0]];
    updatedImages.shift();

    setTimeout(() => {
      setImages(updatedImages);
      setIsTranslating(false);
    }, transitionDuration.current);
  };

  const handlePrev = () => {
    if (isTranslating) return;
    isMovingLeft.current = true;
    if (currentIndexRef.current === 0) {
      currentIndexRef.current = images.length - 1;
    } else {
      currentIndexRef.current -= 1;
    }
    setIsTranslating(true);
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
    let updatedImages = [images[images.length - 1], ...images];
    updatedImages.pop();

    setTimeout(() => {
      setImages(updatedImages);
      setIsTranslating(false);
    }, transitionDuration.current);
  };

  const handleClickDelay = () => {
    const currentTime = Date.now();
    if (lastClickTimeRef.current !== null) {
      const delay = currentTime - lastClickTimeRef.current;
      setClickDelay(delay);
    }
    lastClickTimeRef.current = currentTime;
  };

  const handleIndicatorClick = (indicatorIndex) => {
    if (indicatorIndex === currentIndex) return;
    if (isSwitchingIndicator) return;
    setNextIndicator(indicatorIndex);
    setIsSwitchingIndicator(true);

    const transitionDurationPerIndicator = Math.abs(
      currentIndex - indicatorIndex
    );

    const maxDistance = 5; // This represents the maximum expected distance between indicators
    const minDuration = 100;
    const maxDuration = 500;
    const duration =
      maxDuration -
      ((maxDuration - minDuration) / maxDistance) *
        transitionDurationPerIndicator;

    transitionDuration.current = Math.max(
      minDuration,
      Math.min(duration, maxDuration)
    );
  };

  const handleAutoPlay = () => {
    autoPlayingRef.current = !autoPlayingRef.current;
    setAutoPlaying(!autoPlaying);
  };

  return (
    <CarouselContext.Provider
      value={{
        images,
        setImages,
        currentIndex,
        setCurrentIndex,
        isTranslating,
        setIsTranslating,
        carouselRef,
        isMovingLeft,
        currentIndexRef,
        transitionDuration,
        lastClickTimeRef,
        clickDelay,
        setClickDelay,
        nextIndicator,
        setNextIndicator,
        isSwitchingIndicator,
        setIsSwitchingIndicator,
        autoPlaying,
        setAutoPlaying,
        autoPlayingRef,
        handleNext,
        handlePrev,
        handleClickDelay,
        handleIndicatorClick,
        handleAutoPlay,
        imageWidth,
        timeoutId,
        setTimeoutId,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

const useCarousel = () => useContext(CarouselContext);

export { CarouselProvider, useCarousel };
