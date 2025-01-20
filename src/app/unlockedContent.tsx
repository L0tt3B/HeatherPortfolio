import { useEffect, useState } from "react";
import Art from "./art";

const UnlockedContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const images = [
    "/newjeans.png",
    "/cocoon1.png",
    "/women.png",
    "/dragon.png",
    "/uk.png",
  ];

  const videos = [

  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50); // Delays the animation slightly
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`bg-yellow-950 w-full min-h-screen max-w-full border-t-4 border-black transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mt-20 text-center">
        <h1 className="text-4xl font-bold text-white">What's in here...?</h1>
        <p className="mt-4 text-lg text-white">
          Scroll freely to explore both sections!
        </p>
      </div>
      <div className="w-full">
        <Art images={images} />
      </div>
    </div>
  );
};

export default UnlockedContent;
