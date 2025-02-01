import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AnimationProps {
    videos: string[];
}

const Animations = ({ videos }: AnimationProps) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = observerRefs.current.indexOf(entry.target as HTMLDivElement);
        if (entry.isIntersecting && index !== -1) {
          setVisibleIndices((prev) => [...prev, index]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.01, // Trigger when at least 1% of the card is visible
      rootMargin: "0px -20% 0px -20%", // Allow margin so cards are visible slightly at the edges
    });

    observerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect(); // Clean up observer
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 p-8">
      {videos.map((src, index) => (
        <div
          key={index}
          ref={(el) => {
            observerRefs.current[index] = el; // Assign ref and return void
          }}
          className={`w-full flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          } items-center bg-yellow-900 rounded-lg shadow-lg p-6 min-h-[200px] transition-all duration-700 ease-out ${
            visibleIndices.includes(index)
              ? "opacity-100 translate-x-0"
              : index % 2 === 0
              ? "opacity-0 -translate-x-10"
              : "opacity-0 translate-x-10"
          }`}
        >
          {/* Image Section */}
          <div
            className={`w-[40%] ${
              index % 2 === 0 ? "mr-auto" : "ml-auto"
            } transition-transform`}
          >
            <video
              src={src}
              controls
              className="w-full h-auto"
            />
          </div>

          {/* Text Section */}
          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
            <p>{`Animation Piece ${index + 1}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animations;
