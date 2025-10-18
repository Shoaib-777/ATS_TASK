import { useState } from "react";

// If you are looking for mobile support, please refer to the
// following implementation by @daviddecorso
// https://github.com/unhingedmagikarp/comparison-slider/tree/mobile-support
const Test = ({originalImage,processedImage}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative my-4" onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <img
          alt=""
          draggable={false}
          src={processedImage}
        />
        <span className="absolute right-2 top-2  badge badge-primary"> After</span>
        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            draggable={false}
            alt=""
            src={originalImage}
            className=""
          />
          <span className="absolute left-2 top-2  badge badge-primary"> Before</span>
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

export default Test