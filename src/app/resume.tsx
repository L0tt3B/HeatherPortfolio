import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const Resume = () => {
  // Determine if we're in production or local.
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const basePath = isOnline ? "/HeatherPortfolio" : "";
  // Construct an absolute URL for the PDF.
  const pdfURL = `https://l0tt3b.github.io${basePath}/CV.pdf`;

  // Set PDF worker dynamically using the basePath.
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.js`;
  }, [basePath]);

  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = 2;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  // Fetch the resume PDF as a blob.
  useEffect(() => {
    async function fetchPDF() {
      try {
        const response = await fetch(pdfURL, {
          mode: "cors",
          headers: { "Accept": "application/pdf" }
        });
        console.log("Resume PDF Content-Type:", response.headers.get("Content-Type"));
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        console.log("Resume PDF Blob URL:", blobUrl);
        setPdfBlob(blobUrl);
      } catch (error) {
        console.error("Error loading resume PDF:", error);
      }
    }
    fetchPDF();
  }, [pdfURL]);

  // Update window width for responsiveness.
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Compute a responsive PDF width.
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
      {/* Resume Download Button */}
      <div className="text-white text-lg mt-4 sm:mt-3 text-center">
        <a
          href={pdfURL}
          download
          className="bg-yellow-800/50 px-6 py-3 font-bold text-yellow-400 rounded-xl border-2 border-yellow-700 hover:bg-yellow-900/80 transition duration-150"
        >
          PDF RESUME DOWNLOAD
        </a>
      </div>

      {/* Resume Viewer */}
      <div className="mt-10 w-full flex flex-col items-center">
        <div className="relative border-2 border-white rounded-xl shadow-lg p-3 bg-black/20">
          {pdfBlob ? (
            <Document file={pdfBlob} className="w-full flex justify-center">
              <Page 
                pageNumber={pageNumber} 
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
                width={getPDFWidth()}
                className="rounded-lg shadow-lg"
              />
            </Document>
          ) : (
            <p className="text-black text-lg text-center mt-10">Loading Resume PDF...</p>
          )}
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
