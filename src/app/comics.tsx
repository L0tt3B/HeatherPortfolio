"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function useWindowWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 800
  );
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

const Comics = ({ comics }: ComicsProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const windowWidth = useWindowWidth();

  const pageWidth = Math.min(800, windowWidth * 0.92);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
  }, []);

  useEffect(() => {
    if (!comics[0]?.src) return;
    async function fetchComic() {
      try {
        const response = await fetch(comics[0].src, {
          mode: "cors",
          headers: { "Accept": "application/pdf" },
        });
        if (!response.ok) throw new Error("Failed to load comic PDF");
        const blob = await response.blob();
        setPdfBlob(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error loading comic:", error);
      }
    }
    fetchComic();
  }, [comics]);

  return (
    <div className="w-full flex flex-col items-center bg-yellow-950 pb-16 px-4">
      <div className="w-full max-w-3xl pt-8 pb-4 text-center">
        <h1 className="text-white text-3xl font-bold uppercase tracking-widest">
          {comics[0]?.title ?? "Comic"}
        </h1>
        <div className="flex items-center gap-4 mt-2 justify-center">
          <span className="h-px w-16 bg-amber-400/50" />
          <span className="text-amber-400 text-sm tracking-widest uppercase">Scroll to read</span>
          <span className="h-px w-16 bg-amber-400/50" />
        </div>
      </div>

      {pdfBlob ? (
        <Document
          file={pdfBlob}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="flex flex-col items-center gap-0"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={pageWidth}
              className="shadow-lg"
            />
          ))}
        </Document>
      ) : (
        <p className="text-white text-lg mt-16 animate-pulse">Loading comic...</p>
      )}
    </div>
  );
};

export default Comics;