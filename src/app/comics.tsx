"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
const basePath = isOnline ? "/HeatherPortfolio" : "";
pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.js`;

function useWindowWidth() {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

interface ComicsProps {
  comics: { src: string; title: string }[];
  images: { src: string; title: string }[];
}

const Comics = ({ comics, images }: ComicsProps) => {
  const [selectedComic, setSelectedComic] = useState<{ src: string; type: "pdf" | "image" } | null>(null);
  const [pageNumber, setPageNumber] = useState<number[]>(comics.map(() => 1));
  const [numPages, setNumPages] = useState<number[]>(comics.map(() => 1));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentComicIndex, setCurrentComicIndex] = useState<number | null>(null);

  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const windowWidth = useWindowWidth();

  const responsivePageWidth = Math.min(500, windowWidth * 0.9);

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
      threshold: 0.1,
      rootMargin: "0px -20% 0px -20%",
    });

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const handleDocumentLoadSuccess = (index: number, { numPages }: { numPages: number }) => {
    setNumPages((prev) => {
      const updated = [...prev];
      updated[index] = numPages;
      return updated;
    });
  };

  const openFullscreen = (index: number, type: "pdf" | "image") => {
    if (type === "pdf") {
      setSelectedComic({ src: comics[index].src, type: "pdf" });
    } else {
      setSelectedComic({ src: images[index].src, type: "image" });
    }
    setCurrentComicIndex(index);
    setIsFullscreen(true);
  };

  const changePage = (index: number, direction: number) => {
    setPageNumber((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(1, Math.min(numPages[index], updated[index] + direction));
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col gap-12 p-6">
      {comics.map((comic, index) => (
        <div
          key={index}
          ref={(el) => { observerRefs.current[index] = el; }}
          className={`relative w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"} items-center bg-yellow-900 rounded-lg shadow-lg p-6 min-h-[200px] transition-all duration-700 ease-out ${
            visibleIndices.includes(index)
              ? "opacity-100 translate-x-0"
              : index % 2 === 0
              ? "opacity-0 -translate-x-10"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative w-[40%] cursor-pointer" onClick={() => openFullscreen(index, "pdf")}>
            <button
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl bg-gray-800/70 hover:bg-gray-600/80 px-3 py-2 rounded-full z-10 ${
                pageNumber[index] === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                changePage(index, -1);
              }}
              disabled={pageNumber[index] === 1}
            >
              ❮
            </button>
            <Document
              file={comic.src}
              className="border-2 border-white rounded-lg overflow-hidden"
              onLoadSuccess={(e) => handleDocumentLoadSuccess(index, e)}
            >
              <Page
                pageNumber={pageNumber[index]}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={300}
                className="object-contain"
              />
            </Document>
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl bg-gray-800/70 hover:bg-gray-600/80 px-3 py-2 rounded-full z-10 ${
                pageNumber[index] === numPages[index] ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                changePage(index, 1);
              }}
              disabled={pageNumber[index] === numPages[index]}
            >
              ❯
            </button>
          </div>

          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
            <p>{comic.title}</p>
          </div>
        </div>
      ))}
      {images.map((image, index) => (
        <div key={index} className={`relative w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"} items-center bg-yellow-900 rounded-lg shadow-lg p-6 min-h-[200px] transition-all duration-700 ease-out ${
          visibleIndices.includes(index)
            ? "opacity-100 translate-x-0"
            : index % 2 === 0
            ? "opacity-0 -translate-x-10"
            : "opacity-0 translate-x-10"
        }`}>
          <div className="relative w-[40%] cursor-pointer" onClick={() => openFullscreen(index, "image")}>
            <Image 
              src={image.src}
              alt={image.title}
              width={400}
              height={500}
              className="object-contain rounded-lg"
            />
          </div>
          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
            {image.title}
          </div>
        </div>
      ))}

      {/* Fullscreen view */}
      {selectedComic && isFullscreen && currentComicIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4" onClick={(e) => { const target = e.target as HTMLElement; if (!target.closest('.comic-container, .control-button')) setIsFullscreen(false); }}>
          <button
            className="absolute top-4 right-4 bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition"
            onClick={() => setIsFullscreen(false)}
          >
            ✖ Close
          </button>
          <div className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {selectedComic.type === "pdf" ? (
              <div className="items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                  className={`control-button absolute left-4 text-white text-3xl bg-gray-700/70 hover:bg-gray-600/80 px-4 py-2 rounded-full ${
                    pageNumber[currentComicIndex] === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => changePage(currentComicIndex, -1)}
                  disabled={pageNumber[currentComicIndex] === 1}
                  >
                    ❮
                  </button>

                  <Document file={selectedComic.src} className="comic-container w-full flex justify-center">
                    <Page
                      pageNumber={pageNumber[currentComicIndex]}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={responsivePageWidth}
                      className="object-contain"
                    />
                  </Document>
                  <button
                    className={`control-button absolute right-4 text-white text-3xl bg-gray-700/70 hover:bg-gray-600/80 px-4 py-2 rounded-full ${
                      pageNumber[currentComicIndex] === numPages[currentComicIndex] ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => changePage(currentComicIndex, 1)}
                    disabled={pageNumber[currentComicIndex] === numPages[currentComicIndex]}>
                    ❯
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4 w-full max-w-md">
                  <span className="text-white">
                    {`Page ${pageNumber[currentComicIndex]} of ${numPages[currentComicIndex] || "?"}`}
                  </span>
                </div>
              </div>
            ): (
              <Image src={selectedComic.src} alt="Fullscreen" width={600} height={500} className="comic-container object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comics;
