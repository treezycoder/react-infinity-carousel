import { CarouselProvider } from "./infinite-react-carousel/carousel-context";
import CarouselComponent from "./infinite-react-carousel/components/carousel-component";

function App() {
  return (
    <div className="h-screen bg-black fixed flex justify-center items-center">
      <CarouselProvider>
        <CarouselComponent />
      </CarouselProvider>
    </div>
  );
}

export default App;
