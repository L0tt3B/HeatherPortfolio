import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const Resume = () => {
  const pdfURL = `https://www.heatherburnsdesign.uk/comics/CV.pdf`;

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
  }, []);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPDF() {
      try {
        const response = await fetch(pdfURL, {
          mode: "cors",
          headers: { "Accept": "application/pdf" },
        });
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        setPdfBlob(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error loading resume:", error);
      }
    }
    fetchPDF();
  }, [pdfURL]);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
          {pdfBlob ? (
            <Document file={pdfBlob} className="w-full flex justify-center">
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={getPDFWidth()}
                className="rounded-lg shadow-lg"
              />
            </Document>
          ) : (
            <p className="text-white text-lg text-center mt-10 p-6">Loading Resume PDF...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;