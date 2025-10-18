import { useState, useEffect } from "react";

const SliderCompare = ({ originalImage, processedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (x, rect) => {
    const pos = Math.max(0, Math.min(x - rect.left, rect.width));
    const percent = (pos / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(percent, 100)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMoveGlobal = (event) => {
    const slider = document.getElementById("slider-container");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    handleMove(event.clientX, rect);
  };

  const handleTouchMoveGlobal = (event) => {
    const slider = document.getElementById("slider-container");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    handleMove(event.touches[0].clientX, rect);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMoveGlobal);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMoveGlobal);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
    };
  }, [isDragging]);

  const goToBefore = (e) => {
    e.stopPropagation();
    setSliderPosition(0);
  };

  const goToAfter = (e) => {
    e.stopPropagation();
    setSliderPosition(100);
  };

  return (
    <div className="w-full relative bg-white border border-gray-300 rounded-lg">
      <div
        id="slider-container"
        className="relative w-full max-w-[700px] aspect-16/9 m-auto overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After image */}
        <img
          alt="After"
          draggable={false}
          src={processedImage}
          className="object-contain w-full h-full"
        />

        {/* Clipped Before image */}
        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-16/9 m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            draggable={false}
            alt="Before"
            src={originalImage}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>

        {/* Fixed badges */}
        <span
          className="absolute left-2 top-2 badge badge-primary cursor-pointer z-10"
          onClick={goToBefore}
        >
          Before
        </span>
        <span
          className="absolute right-2 top-2 badge badge-primary cursor-pointer z-10"
          onClick={goToAfter}
        >
          After
        </span>
      </div>
    </div>
  );
};

export default SliderCompare;
