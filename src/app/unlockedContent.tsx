import { useEffect, useRef, useState } from "react";
import AboutMe from "./aboutme";
import FooterPage from "./footer";
import DefaultPage from "./defaultPage";
import Resume from "./resume";
import Comics from "./comics";
import DuoProject from "./duo";
import ElasticProject from "./animations";
import SkonzProject from "./skonz";
import OneTouchProject from "./onetouch";

interface UnlockedContentProps {
  component: string;
  footerRef: React.RefObject<HTMLDivElement | null>;
  onTabChange: (tab: string) => void;
}

const PROJECT_ORDER = [
  { key: "Duo",     label: "Duo Connect" },
  { key: "Skonz",   label: "SKONZ" },
  { key: "Touch",   label: "One Touch" },
  { key: "Elastic", label: "Elastic" },
  { key: "Comics",  label: "Comics" },
  { key: "AboutMe", label: "About Me" },
  { key: "CV",      label: "CV" },
];

const UnlockedContent = ({ component, footerRef, onTabChange }: UnlockedContentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const skipScrollRef = useRef(false);

  const imagePath = "";

  const comicsList = [
    { src: `${imagePath}/comics/dnd-1.pdf`, title: "Fukushima's Vengeance" }
  ];

  const comicsImg = [
    { src: `${imagePath}/comics/Farewell.webp`, title: "Farewell" }
  ];

  // Scroll to top for normal navigation, or watch page height settle for prev/next
  useEffect(() => {
    if (component === "Contact") {
      skipScrollRef.current = false;
      return;
    }

    if (!skipScrollRef.current) {
      // Normal nav — go to top immediately
      topRef.current?.scrollIntoView({ behavior: "instant" });
      skipScrollRef.current = false;
      const timeout = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timeout);
    }

    // Prev/next nav — wait for the page height to stop growing, then scroll navRef into view
    skipScrollRef.current = false;
    setIsVisible(true);

    const container = topRef.current;
    if (!container || !navRef.current) return;

    let lastHeight = container.scrollHeight;
    let stableCount = 0;
    const nav = navRef.current;

    const observer = new ResizeObserver(() => {
      const newHeight = container.scrollHeight;
      if (newHeight === lastHeight) {
        stableCount++;
        if (stableCount >= 3) {
          observer.disconnect();
          nav.scrollIntoView({ behavior: "instant", block: "end" });
        }
      } else {
        lastHeight = newHeight;
        stableCount = 0;
      }
    });

    observer.observe(container);

    // Fallback: disconnect after 3 seconds regardless
    const fallback = setTimeout(() => {
      observer.disconnect();
      nav.scrollIntoView({ behavior: "instant", block: "end" });
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [component]);

  useEffect(() => {
    if (component === "Contact" && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [component, footerRef]);

  const currentIndex = PROJECT_ORDER.findIndex((p) => p.key === component);
  const prevProject = currentIndex > 0 ? PROJECT_ORDER[currentIndex - 1] : null;
  const nextProject = currentIndex !== -1 && currentIndex < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[currentIndex + 1] : null;

  const handleProjectNav = (key: string) => {
    skipScrollRef.current = true;
    onTabChange(key);
  };

  const renderComponent = () => {
    switch (component) {
      case "Comics":
        return <Comics comics={comicsList} images={comicsImg} />;
      case "Elastic":
        return <ElasticProject />;
      case "Duo":
        return <DuoProject />;
      case "Skonz":
        return <SkonzProject />;
      case "Touch":
        return <OneTouchProject />;
      case "AboutMe":
        return <AboutMe />;
      case "CV":
        return <Resume />;
      default:
        return <DefaultPage onTabChange={onTabChange} />;
    }
  };

  return (
    <div
      ref={topRef}
      className={`bg-yellow-950 w-full min-h-screen max-w-full flex flex-col border-t-4 border-black transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mt-20 text-center"></div>
      <div className="flex-grow w-full">{renderComponent()}</div>

      {currentIndex !== -1 && (
        <div ref={navRef} className="w-full flex items-center justify-between px-6 sm:px-12 py-8 border-t border-amber-900/40">
          {prevProject ? (
            <button
              onClick={() => handleProjectNav(prevProject.key)}
              className="flex items-center gap-3 group text-amber-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-200">❮</span>
              <span className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-widest text-amber-600 group-hover:text-amber-400 transition-colors duration-200 font-sans">Previous</span>
                <span className="text-base font-bold uppercase tracking-wide font-custom">{prevProject.label}</span>
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <button
              onClick={() => handleProjectNav(nextProject.key)}
              className="flex items-center gap-3 group text-amber-400 hover:text-white transition-colors duration-200"
            >
              <span className="flex flex-col text-right">
                <span className="text-xs uppercase tracking-widest text-amber-600 group-hover:text-amber-400 transition-colors duration-200 font-sans">Next</span>
                <span className="text-base font-bold uppercase tracking-wide font-custom">{nextProject.label}</span>
              </span>
              <span className="text-2xl group-hover:translate-x-1 transition-transform duration-200">❯</span>
            </button>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className="w-full mt-0" ref={footerRef}>
        <FooterPage />
      </div>
    </div>
  );
};

export default UnlockedContent;