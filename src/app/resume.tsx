import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const Resume = () => {
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const pdfPath = isOnline ? "/HeatherPortfolio/CV.pdf" : "/comics/CV.pdf";
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = 2;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // ✅ Dynamically set PDF worker
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;
  }, []);

  // ✅ Update window width for responsiveness
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ✅ Responsive PDF width scaling
  const getPDFWidth = () => {
    if (!windowWidth) return 700; // Default width
    if (windowWidth < 400) return 280; // Small screens
    if (windowWidth < 640) return 340; // Mobile
    if (windowWidth < 768) return 400; // Small tablets
    if (windowWidth < 1024) return 500; // Medium tablets
    return 700; // Default large screen
  };

  return (
    <div className="bg-yellow-950 font-sans w-full min-h-screen flex flex-col items-center p-6 sm:p-4">
      {/* Resume Download Button */}
      <div className="text-white text-lg mt-4 sm:mt-3 text-center">
        <a
          href={pdfPath}
          download
          className="bg-yellow-800/50 px-6 py-3 font-bold text-yellow-400 rounded-xl border-2 border-yellow-700 hover:bg-yellow-900/80 transition duration-150"
        >
          PDF RESUME DOWNLOAD
        </a>
      </div>

      {/* Resume Viewer */}
      <div className="mt-10 w-full flex flex-col items-center">
        <div className="relative border-2 border-white rounded-xl shadow-lg p-3 bg-black/20">
          <Document file={pdfPath} className="w-full flex justify-center">
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
              width={getPDFWidth()}
              className="rounded-lg shadow-lg" // ✅ Rounded PDF edges with shadow
            />
          </Document>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 w-full max-w-lg px-4">
          <button
            className={`px-4 py-2 bg-yellow-800 text-white rounded-md transition ${
              pageNumber === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-700"
            }`}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            ⬅ Previous
          </button>

          <span className="text-white text-lg">
            Page {pageNumber} of {totalPages}
          </span>

          <button
            className={`px-4 py-2 bg-yellow-800 text-white rounded-md transition ${
              pageNumber === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-700"
            }`}
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
            disabled={pageNumber === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
