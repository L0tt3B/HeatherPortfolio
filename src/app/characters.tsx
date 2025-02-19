import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CharacterProps {
  character: string[];
}

const Characters = ({ character }: CharacterProps) => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      setVisibleIndices((prev) => {
        const newSet = new Set(prev);
        entries.forEach((entry) => {
          const index = observerRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            newSet.add(index);
          }
        });
        return newSet;
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    });

    observerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev !== null && prev < character.length - 1 ? prev + 1 : prev));
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-fr">
      {character.map((src, index) => (
        <div
          key={index}
          ref={(el) => {
            observerRefs.current[index] = el;
          }}
          className={`relative w-full aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg transition-opacity duration-700 ease-out ${
            visibleIndices.has(index) ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSelectedImage(index)}
        >
          <Image
            src={src}
            alt={`Art piece ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      ))}

      {selectedImage !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full flex flex-col items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-gray-800 bg-opacity-50 rounded-full"
            >
              ❮
            </button>
            <Image
              src={character[selectedImage]}
              alt="Selected Art"
              width={600}
              height={600}
              className="rounded-lg max-h-[80vh] w-auto"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-gray-800 bg-opacity-50 rounded-full"
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
