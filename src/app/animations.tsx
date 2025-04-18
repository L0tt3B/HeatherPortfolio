import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AnimationItem {
  src: string;
  text: string;
}

interface AnimationProps {
  videos: AnimationItem[];
  gifs: AnimationItem[];
}

const Animations = ({ videos, gifs }: AnimationProps) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      threshold: 0.01,
      rootMargin: "0px -20% 0px -20%",
    });

    observerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 p-8">
      {videos?.map((video, index) => (
        <div
          key={`video-${index}`}
          ref={(el) => {
            observerRefs.current[index] = el;
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
          <div className={`w-[40%] ${index % 2 === 0 ? "mr-auto" : "ml-auto"} transition-transform`}>
            <video src={video.src} controls className="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
            <p>{video.text}</p>
          </div>
        </div>
      ))}

      {gifs?.map((gif, index) => (
        <div
          key={`gif-${index}`}
          ref={(el) => {
            observerRefs.current[videos.length + index] = el;
          }}
          className={`w-full flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          } items-center bg-yellow-900 rounded-lg shadow-lg p-6 min-h-[200px] transition-all duration-700 ease-out ${
            visibleIndices.includes(videos.length + index)
              ? "opacity-100 translate-x-0"
              : index % 2 === 0
              ? "opacity-0 -translate-x-10"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className={`w-[40%] ${index % 2 === 0 ? "mr-auto" : "ml-auto"} transition-transform`}>
            <Image
              src={gif.src}
              alt={gif.text}
              width={500} 
              height={300} 
              unoptimized={true} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
              <p>{gif.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animations;
