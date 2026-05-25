"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
//const basePath = isOnline ? "/HeatherPortfolio" : "";
const basePath = process.env.NODE_ENV === "production" ? "/HeatherPortfolio" : "";
pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.js`;

interface DefaultPageProps {
  onTabChange: (tab: string) => void;
}

const DefaultPage = ({ onTabChange }: DefaultPageProps) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  const aboutImages = [
    `${basePath}/heather.jpg`,
    `${basePath}/heather2.jpg`,
    `${basePath}/heather3.jpg`
  ];
  const comicPages = [1, 2, 3];

  const containerData = [
  { text: "Duo", title: "Duo Connect", image: `${basePath}/duoconnect.webp`, isShifted: true },
  { text: "Skonz", title: "SKONZ", image: `${basePath}/skonz.webp`, isShifted: true },
  { text: "Touch", title: "One Touch", image: `${basePath}/onetouch.webp`, isShifted: true },
  { text: "Elastic", title: "Elastic", image: "", isGif: true },
  { text: "Comics", title: "Comics", image: "", isComic: true },
  { text: "AboutMe", title: "About Me", image: "", images: aboutImages },
];

  useEffect(() => {
    setIsClient(true);

    async function fetchPDF() {
      try {
        const response = await fetch(`https://l0tt3b.github.io${basePath}/comics/dnd-1.pdf`, {
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
    <div className="w-full flex flex-col gap-10 p-4 items-center">
      {containerData.map((item, index) => (
        <div
          key={index}
          ref={(el) => { observerRefs.current[index] = el; }}
          className={`flex flex-col gap-3 w-full max-w-3xl cursor-pointer transition-all duration-700 ease-out group ${
            visibleIndices.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${item.isShifted ? "mt-6" : ""}`}
          onClick={() => onTabChange(item.text)}
        >
          {/* Title above the card */}
          <p className="text-white text-4xl font-bold uppercase text-center drop-shadow-[10px_0px_10px_rgba(0,0,0,0.9)] tracking-wide group-hover:text-gray-300 transition-colors duration-200">
            {item.title}
          </p>

          {/* 3D card */}
          <div
            className="relative w-full h-72 rounded-lg overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-2"
            style={{
              boxShadow: "0 6px 0 #1a1a1a, 0 12px 0 #111, 0 18px 0 #0a0a0a, 0 24px 30px rgba(0,0,0,0.6)",
              transform: "perspective(800px) rotateX(2deg)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateX(0deg) translateY(-8px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 0 #1a1a1a, 0 18px 0 #111, 0 26px 0 #0a0a0a, 0 36px 40px rgba(0,0,0,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateX(2deg)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 0 #1a1a1a, 0 12px 0 #111, 0 18px 0 #0a0a0a, 0 24px 30px rgba(0,0,0,0.6)";
            }}
          >
            {item.isGif ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black rounded-lg shadow-lg">
                <div className="w-full h-full flex">
                  <Image
                    src={`${basePath}/animations/elastic.gif`}
                    alt="Elastic"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                  {/**
                  <Image
                    src={`${basePath}/animations/bananacatsleep.gif`}
                    alt="Banana Cat GIF 2"
                    width={150}
                    height={150}
                    className="object-cover w-1/2 h-full"
                  />
                   */}
                </div>
              </div>
            ) : item.isComic ? (
              <div className="absolute inset-0 w-full h-full flex justify-center bg-white rounded-lg border-4 border-white shadow-lg overflow-hidden">
                {isClient && pdfBlob ? (
                  <div className="flex w-full h-full">
                    {comicPages.map((page, i) => (
                      <div key={i} className="flex-grow h-full">
                        <Document file={pdfBlob} className="w-full h-full flex justify-center">
                          <Page
                            pageNumber={page}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={330}
                            className="h-full w-full object-contain"
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
                className={`absolute inset-0 w-full h-full`}
              />
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default DefaultPage;