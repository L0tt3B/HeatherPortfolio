import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
const basePath = isOnline ? "/HeatherPortfolio" : "";
pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.js`;

interface ComicsProps {
  comics: { src: string; title: string }[];
}

const Comics = ({ comics }: ComicsProps) => {
  const [selectedComic, setSelectedComic] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number[]>(comics?.map(() => 1)); // Track page per comic
  const [numPages, setNumPages] = useState<number[]>(comics?.map(() => 1));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentComicIndex, setCurrentComicIndex] = useState<number | null>(null);

  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

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
      const updatedPages = [...prev];
      updatedPages[index] = numPages;
      return updatedPages;
    });
  };

  const openFullscreen = (index: number) => {
    setSelectedComic(comics[index].src);
    setCurrentComicIndex(index);
    setIsFullscreen(true);
  };

  const changePage = (index: number, direction: number) => {
    setPageNumber((prev) => {
      const updatedPages = [...prev];
      updatedPages[index] = Math.max(1, Math.min(numPages[index], updatedPages[index] + direction));
      return updatedPages;
    });
  };

  return (
    <div className="w-full flex flex-col gap-12 p-6">
      {comics?.map((comic, index) => (
        <div
          key={index}
          ref={(el) => {
            observerRefs.current[index] = el;
          }}
          className={`relative w-full flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          } items-center bg-yellow-900 rounded-lg shadow-lg p-6 min-h-[200px] transition-all duration-700 ease-out ${
            visibleIndices.includes(index)
              ? "opacity-100 translate-x-0"
              : index % 2 === 0
              ? "opacity-0 -translate-x-10"
              : "opacity-0 translate-x-10"
          }`}
        >
          {/* Comic Thumbnail with Arrows Inside */}
          <div className="relative w-[40%] cursor-pointer" onClick={() => openFullscreen(index)}>
            {/* Left Arrow */}
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

            {/* Comic Display */}
            <Document
              file={comic.src}
              className="border-2 border-white rounded-lg overflow-hidden"
              onLoadSuccess={(e) => handleDocumentLoadSuccess(index, e)}
            >
              <Page pageNumber={pageNumber[index]} renderTextLayer={false} renderAnnotationLayer={false} width={300} />
            </Document>

            {/* Right Arrow */}
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

          {/* Comic Info */}
          <div className="w-[60%] p-6 text-center text-amber-400 text-xl">
            <p>{comic.title}</p>
          </div>
        </div>
      ))}

      {/* Fullscreen Comic Viewer */}
      {selectedComic && isFullscreen && currentComicIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition"
            onClick={() => setIsFullscreen(false)}
          >
            ✖ Close
          </button>

          {/* Comic Viewer - Centered, Responsive */}
          <div className="relative w-full max-w-3xl sm:max-w-4xl flex items-center justify-center">
            {/* Left Arrow for Previous Page */}
            <button
              className={`absolute left-4 text-white text-3xl bg-gray-700/70 hover:bg-gray-600/80 px-4 py-2 rounded-full ${
                pageNumber[currentComicIndex] === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => changePage(currentComicIndex, -1)}
              disabled={pageNumber[currentComicIndex] === 1}
            >
              ❮
            </button>

            <Document file={`/HeatherPortfolio/comics/${selectedComic}`} className="w-full flex justify-center">
              <Page
                pageNumber={pageNumber[currentComicIndex]}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={500}
              />
            </Document>

            {/* Right Arrow for Next Page */}
            <button
              className={`absolute right-4 text-white text-3xl bg-gray-700/70 hover:bg-gray-600/80 px-4 py-2 rounded-full ${
                pageNumber[currentComicIndex] === numPages[currentComicIndex] ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => changePage(currentComicIndex, 1)}
              disabled={pageNumber[currentComicIndex] === numPages[currentComicIndex]}
            >
              ❯
            </button>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 w-full max-w-md">
            <span className="text-white">{`Page ${pageNumber[currentComicIndex]} of ${numPages[currentComicIndex] || "?"}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comics;
