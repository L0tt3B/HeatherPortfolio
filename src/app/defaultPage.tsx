import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DefaultPage = () => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs

  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  const containerData = [
    { text: "Story", image: `${imagePath}/two.jpg` },
    { text: "Comics", image: `${imagePath}/newjeans.png` },
    { text: "Characters", image: `${imagePath}/dragon.png` },
    { text: "Illustration", image: `${imagePath}/women.png`},
    { text: "About", image: `${imagePath}/hobbies.jpg` }
  ];

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
    <div className="w-full flex flex-col gap-6 p-4 items-center">
      {containerData.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            observerRefs.current[index] = el; // Assign ref and return void
          }}
          className={`w-full max-w-3xl h-60 rounded-lg shadow-3xl overflow-hidden relative cursor-pointer transition-all duration-700 ease-out ${
            visibleIndices.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src={item.image}
            alt={item.text}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-0 w-full text-center">
            <p className="text-white text-4xl font-bold uppercase drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DefaultPage;
