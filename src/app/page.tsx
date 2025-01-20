"use client";
import { useState, useEffect } from "react";
import UnlockedContent from "./unlockedContent"; // Import unlocked content
import Bag from "./bag"; // Import Bag component
import Image from "next/image"; // Import Next.js Image component

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBag = () => {
    setIsOpen(!isOpen);
  };

  // Automatically scroll to unlocked content when it opens
  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <div className="bg-yellow-950 w-full min-h-screen">
      {/* Bag section - 80% height and 100% width */}
      <div className="w-full h-[80vh] relative">
        <Bag />
        {/* Buckle button with image */}
        <button
          onClick={toggleBag}
          className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 border-none bg-transparent focus:outline-none z-10"
        >
          <Image
            src="/TAPE2.png" // Make sure this image exists in the public folder
            width={150}
            height={150}
            alt="Buckle button"
            className="hover:scale-105 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Main page content (fullscreen) */}
      <div className={`bg-orange-900 flex flex-col items-center justify-center w-full h-screen ${isOpen ? "" : "hidden"}`}>
        {/* Unlocked content section */}
        <div className="w-full min-h-screen scrollbar-hide">
          <UnlockedContent />
        </div>
      </div>
    </div>
  );
}
