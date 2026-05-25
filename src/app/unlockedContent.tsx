import { useEffect, useState } from "react";
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

const UnlockedContent = ({ component, footerRef, onTabChange }: UnlockedContentProps) => {
  const [isVisible, setIsVisible] = useState(false);


  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  const comicsList = [
    { src: `${imagePath}/comics/dnd-1.pdf`, title: "Fukushima's Vengeance" }
  ];

  const comicsImg = [
    { src: `${imagePath}/comics/Farewell.webp`, title: "Farewell" }
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [component]);

  useEffect(() => {
    if (component === "Contact" && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [component, footerRef]);

  const renderComponent = () => {
    switch (component) {
      case "Comics":
      return <Comics comics={comicsList} images={comicsImg}/>;
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
        return <DefaultPage onTabChange={onTabChange}/>;
    }
  };

  return (
    <div
      className={`bg-yellow-950 w-full min-h-screen max-w-full flex flex-col border-t-4 border-black transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mt-20 text-center"></div>
      <div className="flex-grow w-full">{renderComponent()}</div>
      <div className="w-full" ref={footerRef}>
        <FooterPage />
      </div>
    </div>
  );
};

export default UnlockedContent;
