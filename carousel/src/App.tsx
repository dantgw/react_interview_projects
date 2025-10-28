import "./App.css";
import { useState } from "react";
import { images } from "./data/data";

const App = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const onCarouselLeftBtnClick = () => {
    const newIndex = imageIndex === 0 ? 0 : imageIndex - 1;
    setImageIndex(newIndex);
  };
  const onCarouselRightBtnClick = () => {
    const newIndex =
      imageIndex === images.length - 1 ? imageIndex : imageIndex + 1;
    setImageIndex(newIndex);
  };

  return (
    <div className="mainContent">
      <button className="directionButton" onClick={onCarouselLeftBtnClick}>
        left
      </button>
      <div className="carouselDisplay">
        <div className="carouselImages">
          {images.map((image) => {
            return (
              <img
                className="caroselImage"
                key={image.index}
                src={image.url}
                alt={image.name}
                style={{
                  transform: `translateX(${-400 * imageIndex + 400}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
      <button className="directionButton" onClick={onCarouselRightBtnClick}>
        right
      </button>
    </div>
  );
};

export default App;
