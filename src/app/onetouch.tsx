"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const basePath = process.env.NODE_ENV === "production" ? "/HeatherPortfolio" : "";

interface ProjectImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectData {
  project: { title: string; year: string };
  images: ProjectImage[];
}

const OneTouchProject = () => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch(`${basePath}/data/onetouchproject.json`)
      .then((res) => res.json())
      .then((json: ProjectData) => { setData(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIndices((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const index = observerRefs.current.indexOf(entry.target as HTMLDivElement);
            if (entry.isIntersecting && index !== -1) next.add(index);
          });
          return next;
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    observerRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (selectedIndex === null || !data) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i !== null && i < data.images.length - 1 ? i + 1 : i));
      if (e.key === "ArrowLeft")  setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === "Escape")     setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, data]);

  if (loading) return <div className="w-full min-h-screen bg-yellow-950 flex items-center justify-center"><p className="text-amber-400 text-xl animate-pulse">Loading project…</p></div>;
  if (!data)   return <div className="w-full min-h-screen bg-yellow-950 flex items-center justify-center"><p className="text-red-400 text-xl">Failed to load project data.</p></div>;

  const { project, images } = data;

  // Layout: row 1 = [big 2/3 | small 1/3], row 2 = [small 1/3 | big 2/3]
  // Works dynamically: pairs of (wide, narrow) alternating sides
  const rows: { wide: number; narrow: number; wideLeft: boolean }[] = [];
  for (let i = 0; i < images.length; i += 2) {
    if (i + 1 < images.length) {
      rows.push({ wide: i, narrow: i + 1, wideLeft: (i / 2) % 2 === 0 });
    } else {
      // Odd one out — render full width
      rows.push({ wide: i, narrow: -1, wideLeft: true });
    }
  }

  return (
    <div className="w-full min-h-screen bg-yellow-950 flex flex-col items-center pb-16">

      {/* Header */}
      <div className="w-full max-w-5xl px-6 pt-8 pb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold uppercase tracking-widest">{project.title}</h1>
        <div className="flex items-center gap-4 mt-1">
          <span className="h-px w-16 bg-amber-400/50" />
          <p className="text-amber-400 text-sm tracking-widest uppercase">{project.year}</p>
          <span className="h-px w-16 bg-amber-400/50" />
        </div>
      </div>

      {/* Gallery — alternating wide/narrow rows */}
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={`flex flex-col sm:flex-row gap-4 ${row.wideLeft ? "" : "sm:flex-row-reverse"}`}>

            {/* Wide tile (2/3) */}
            <div
              ref={(el) => { observerRefs.current[row.wide] = el; }}
              className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg group transition-all duration-700 ease-out sm:w-2/3 w-full
                ${visibleIndices.has(row.wide) ? "opacity-100 translate-x-0" : row.wideLeft ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}`}
              style={{ aspectRatio: "16 / 9" }}
              onClick={() => setSelectedIndex(row.wide)}
            >
              <Image src={`${basePath}${images[row.wide].src}`} alt={images[row.wide].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 66vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 rounded-lg" />
              {images[row.wide].caption && <p className="absolute bottom-3 left-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2 py-1 rounded">{images[row.wide].caption}</p>}
            </div>

            {/* Narrow tile (1/3) */}
            {row.narrow !== -1 && (
              <div
                ref={(el) => { observerRefs.current[row.narrow] = el; }}
                className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg group transition-all duration-700 ease-out sm:w-1/3 w-full
                  ${visibleIndices.has(row.narrow) ? "opacity-100 translate-x-0" : row.wideLeft ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"}`}
                style={{ aspectRatio: "16 / 9", transitionDelay: "80ms" }}
                onClick={() => setSelectedIndex(row.narrow)}
              >
                <Image src={`${basePath}${images[row.narrow].src}`} alt={images[row.narrow].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg" />
                {images[row.narrow].caption && <p className="absolute bottom-2 left-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2 py-1 rounded">{images[row.narrow].caption}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-gray-800/60 hover:bg-gray-700 px-3 py-1 rounded-full transition z-10"
            onClick={() => setSelectedIndex(null)}
          >✕</button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest z-10">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-3xl bg-gray-800/60 hover:bg-gray-700 px-3 py-2 rounded-full transition z-10 ${selectedIndex === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)); }}
            disabled={selectedIndex === 0}
          >❮</button>

          {/* Image — no save/drag */}
          <div
            className="relative flex items-center justify-center w-full h-full px-16 py-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}${images[selectedIndex].src}`}
              alt={images[selectedIndex].alt}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-full max-h-full object-contain rounded-lg select-none pointer-events-none"
              style={{ maxHeight: "calc(100vh - 8rem)" }}
            />
            {images[selectedIndex].caption && (
              <p className="absolute bottom-14 left-0 right-0 text-center text-white/80 text-sm bg-black/50 py-2">
                {images[selectedIndex].caption}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-3xl bg-gray-800/60 hover:bg-gray-700 px-3 py-2 rounded-full transition z-10 ${selectedIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)); }}
            disabled={selectedIndex === images.length - 1}
          >❯</button>
        </div>
      )}
    </div>
  );
};

export default OneTouchProject;