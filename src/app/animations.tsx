"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const basePath = "";

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


const ElasticProject = () => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch(`${basePath}/data/elasticproject.json`)
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
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
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

      <div className="w-full max-w-6xl px-4 sm:px-8 flex flex-col gap-6">

        {/* Top 3 — equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.slice(0, 3).map((img, index) => (
            <div
              key={img.id}
              ref={(el) => { observerRefs.current[index] = el; }}
              className={`relative w-full cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-700 ease-out
                ${visibleIndices.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ aspectRatio: "3 / 4", transitionDelay: `${index * 80}ms` }}
              onClick={() => setSelectedIndex(index)}
            >
              <Image src={`${basePath}${img.src}`} alt={img.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              {img.caption && <p className="absolute bottom-3 left-3 text-white text-sm bg-black/50 px-2 py-1 rounded">{img.caption}</p>}
            </div>
          ))}
        </div>

        {/* Bottom 3 — full-width panoramic strips, natural height */}
        <div className="flex flex-col gap-6 mt-2">
          {images.slice(3).map((img, i) => {
            const index = i + 3;
            return (
              <div
                key={img.id}
                ref={(el) => { observerRefs.current[index] = el; }}
                className={`relative w-full cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-700 ease-out
                  ${visibleIndices.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setSelectedIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${basePath}${img.src}`} alt={img.alt} className="w-full h-auto block rounded-xl" />
                {img.caption && <p className="absolute bottom-3 left-3 text-white text-sm bg-black/50 px-2 py-1 rounded">{img.caption}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox — portal so it truly covers only the viewport, no scroll */}
      {selectedIndex !== null && typeof document !== "undefined" && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(55,55,55,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setSelectedIndex(null)}
          >✕</button>
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.1em", zIndex: 10 }}>
            {selectedIndex + 1} / {images.length}
          </div>
          <button
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(55,55,55,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: selectedIndex === 0 ? "not-allowed" : "pointer", opacity: selectedIndex === 0 ? 0.2 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)); }}
            disabled={selectedIndex === 0}
          >❮</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${images[selectedIndex].src}`}
            alt={images[selectedIndex].alt}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "calc(100vw - 120px)", maxHeight: "calc(100vh - 80px)", objectFit: "contain", borderRadius: 8, display: "block", userSelect: "none" }}
          />
          <button
            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(55,55,55,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: selectedIndex === images.length - 1 ? "not-allowed" : "pointer", opacity: selectedIndex === images.length - 1 ? 0.2 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)); }}
            disabled={selectedIndex === images.length - 1}
          >❯</button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ElasticProject;