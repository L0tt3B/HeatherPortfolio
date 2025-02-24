"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";

// Use the CDN-hosted worker script
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DefaultPageProps {
  onTabChange: (tab: string) => void;
}

const DefaultPage = ({ onTabChange }: DefaultPageProps) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const basePath = isOnline ? "/HeatherPortfolio" : "";
  
  const aboutImages = [`${basePath}/heather.jpg`, `${basePath}/heather2.jpg`, `${basePath}/heather3.jpg`];
  const comicPages = [1, 2, 3];

  const containerData = [
    { text: "Animations", title: "Animations", image: "", isGif: true },
    { text: "Comics", title: "Comics", image: "", isComic: true },
    { text: "Characters", title: "Characters", image: `${basePath}/dragon.png`, isShifted: true, objectPosition: "object-top" },
    { text: "Art", title: "Illustration", image: `${basePath}/women.png`, isShifted: true },
    { text: "AboutMe", title: "About", image: "", images: aboutImages },
  ];

  useEffect(() => {
    setIsClient(true);

    async function fetchPDF() {
      try {
        const response = await fetch("https://l0tt3b.github.io/HeatherPortfolio/comics/dnd-1.pdf", {
          mode: "cors",
          headers: { "Accept": "application/pdf" }
        });
        console.log("PDF Content-Type:", response.headers.get("Content-Type"));
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        console.log("PDF Blob URL:", blobUrl);
        setPdfBlob(blobUrl);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    }
    fetchPDF();
  }, []);

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
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 p-4 items-center">
      {containerData.map((item, index) => (
        <div
          key={index}
          ref={(el) => { observerRefs.current[index] = el; }}
          className={`relative w-full max-w-3xl h-72 rounded-lg shadow-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out ${
            visibleIndices.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${item.isShifted ? "mt-6" : ""}`}
          onClick={() => onTabChange(item.text)}
        >
          {/* GIFs */}
          {item.isGif ? (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black rounded-lg border-4 border-white shadow-lg">
              <div className="w-full h-full flex">
                <Image
                  src={`${basePath}/animations/bananagif.gif`}
                  alt="Banana Cat GIF 1"
                  width={150}
                  height={150}
                  className="object-cover w-1/2 h-full"
                />
                <Image
                  src={`${basePath}/animations/bananacatsleep.gif`}
                  alt="Banana Cat GIF 2"
                  width={150}
                  height={150}
                  className="object-cover w-1/2 h-full"
                />
              </div>
            </div>
          ) : item.isComic ? (
            // PDF Viewer
            <div className="absolute inset-0 w-full h-full flex justify-center bg-white rounded-lg border-4 border-white shadow-lg">
              {isClient && pdfBlob ? (
                <div className="flex w-full h-full">
                  {comicPages.map((pageNumber, i) => (
                    <div key={i} className="flex-grow h-full">
                      <Document file={pdfBlob} className="w-full h-full flex justify-center">
                        <Page
                          pageNumber={pageNumber}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={330}
                          className="h-full w-full object-cover"
                        />
                      </Document>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-black text-lg text-center mt-10">Loading PDF...</p>
              )}
            </div>
          ) : item.images ? (
            // About Section
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black rounded-lg border-4 border-white shadow-lg">
              <div className="w-full h-full flex">
                {item.images.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`About Image ${i + 1}`}
                    width={100}
                    height={150}
                    className="object-cover w-1/3 h-full"
                  />
                ))}
              </div>
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.text}
              layout="fill"
              objectFit="cover"
              className={`absolute inset-0 w-full h-full ${item.objectPosition || ""}`}
            />
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 w-full text-center bg-black/50 py-2">
            <p className="text-white text-4xl font-bold uppercase drop-shadow-[10px_0px_10px_rgba(0,0,0,0.9)]">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DefaultPage;
