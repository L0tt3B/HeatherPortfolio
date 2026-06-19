"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const pdfURL = `/comics/CV.pdf`;

function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

const Resume = () => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
  }, []);

  const windowWidth = useWindowWidth();

  const getPDFWidth = () => {
    if (!windowWidth) return 700;
    if (windowWidth < 400) return 280;
    if (windowWidth < 640) return 340;
    if (windowWidth < 768) return 400;
    if (windowWidth < 1024) return 500;
    return 700;
  };

  return (
    <div className="bg-yellow-950 font-sans w-full min-h-screen flex flex-col items-center p-6 sm:p-4">
      <div className="text-white text-lg mt-4 sm:mt-3 text-center">
        <a
          href={pdfURL}
          download
          className="bg-yellow-800/50 px-6 py-3 font-bold text-yellow-400 rounded-xl border-2 border-yellow-700 hover:bg-yellow-900/80 transition duration-150"
        >
          PDF RESUME DOWNLOAD
        </a>
      </div>
      <div className="mt-10 w-full flex flex-col items-center">
        <div className="relative border-2 border-white rounded-xl shadow-lg p-3 bg-black/20">
          {windowWidth && (
            <Document
              file={pdfURL}
              className="w-full flex justify-center"
              loading={<p className="text-white text-lg text-center p-6">Loading Resume PDF...</p>}
              error={<p className="text-red-400 text-lg text-center p-6">Failed to load PDF.</p>}
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={getPDFWidth()}
                className="rounded-lg shadow-lg"
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;