"use client";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import DuoProject from "@/app/duo";
import SkonzProject from "@/app/skonz";
import OneTouchProject from "@/app/onetouch";
import ElasticProject from "@/app/animations";
import Comics from "@/app/comics";
import AboutMe from "@/app/aboutme";
import Resume from "@/app/resume";
import FooterPage from "@/app/footer";
import Bag from "@/app/bag";
import Navbar from "@/app/navbar";

const comicsList = [
  { src: "/comics/dnd-1.pdf", title: "Fukushima's Vengeance" },
];
const comicsImg = [
  { src: "/comics/Farewell.webp", title: "Farewell" },
];

const PROJECT_ORDER = [
  { key: "duo",      label: "Duo Connect" },
  { key: "skonz",    label: "SKONZ" },
  { key: "onetouch", label: "One Touch" },
  { key: "elastic",  label: "Elastic" },
  { key: "comics",   label: "Comics" },
  { key: "aboutme",  label: "About Me" },
  { key: "cv",       label: "CV" },
];

const COMPONENTS: Record<string, React.ReactNode> = {
  duo:      <DuoProject />,
  skonz:    <SkonzProject />,
  onetouch: <OneTouchProject />,
  elastic:  <ElasticProject />,
  comics:   <Comics comics={comicsList} images={comicsImg} />,
  aboutme:  <AboutMe />,
  cv:       <Resume />,
};

export default function ProjectClient({ slug }: { slug: string }) {
  const router = useRouter();
  const key = slug.toLowerCase();
  const contentRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instant = sessionStorage.getItem("skipSmooth") === "true";
    sessionStorage.removeItem("skipSmooth");
    contentRef.current?.scrollIntoView({ behavior: instant ? "instant" : "smooth" });
  }, [slug]);

  if (!COMPONENTS[key]) notFound();

  const currentIndex = PROJECT_ORDER.findIndex((p) => p.key === key);
  const prev = currentIndex > 0 ? PROJECT_ORDER[currentIndex - 1] : null;
  const next = currentIndex < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[currentIndex + 1] : null;

  return (
    <div className="bg-yellow-950 w-full min-h-screen">
      <Navbar
        targetRef={bagRef}
        onTabChange={(tab) => {
          if (tab === "AboutMe") router.push("/projects/aboutme");
          else if (tab === "CV") router.push("/projects/cv");
          else if (tab === "Contact") document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
          else router.push("/");
        }}
        onScrollToFooter={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
      />
      {/* Bag header — identical to page.tsx */}
      <div ref={bagRef} className="w-full h-[80vh] relative">
        <Bag
          onTabChange={(tab) => {
            if (tab === "") router.push("/");
            else router.push(`/projects/${tab.toLowerCase()}`);
          }}
          onScrollToFooter={() => {
            document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <button
          onClick={() => router.push("/")}
          className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 border-none bg-transparent focus:outline-none z-10"
        >
          <Image
            src="/TAPE2.png"
            width={150}
            height={150}
            alt="Buckle button"
            className="hover:scale-110 transition-transform duration-100"
          />
        </button>
      </div>

      {/* Content — identical styling to unlockedContent */}
      <div ref={contentRef} className="bg-yellow-950 w-full min-h-screen max-w-full flex flex-col border-t-4 border-black">
        <div className="mt-20 text-center"></div>
        <div className="flex-grow w-full">
          {COMPONENTS[key]}
        </div>

        {/* Prev / Next navigation */}
        <div className="w-full flex items-center justify-between px-6 sm:px-12 py-8 border-t border-amber-900/40">
          {prev ? (
            <button
              onClick={() => { sessionStorage.setItem("skipSmooth", "true"); router.push(`/projects/${prev.key}`); }}
              className="flex items-center gap-3 group text-amber-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-200">❮</span>
              <span className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-widest text-amber-600 group-hover:text-amber-400 transition-colors duration-200 font-sans">Previous</span>
                <span className="text-base font-bold uppercase tracking-wide font-custom">{prev.label}</span>
              </span>
            </button>
          ) : <div />}

          {next ? (
            <button
              onClick={() => { sessionStorage.setItem("skipSmooth", "true"); router.push(`/projects/${next.key}`); }}
              className="flex items-center gap-3 group text-amber-400 hover:text-white transition-colors duration-200"
            >
              <span className="flex flex-col text-right">
                <span className="text-xs uppercase tracking-widest text-amber-600 group-hover:text-amber-400 transition-colors duration-200 font-sans">Next</span>
                <span className="text-base font-bold uppercase tracking-wide font-custom">{next.label}</span>
              </span>
              <span className="text-2xl group-hover:translate-x-1 transition-transform duration-200">❯</span>
            </button>
          ) : <div />}
        </div>

        <div id="footer" className="w-full mt-0">
          <FooterPage />
        </div>
      </div>
    </div>
  );
}