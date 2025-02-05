import { useEffect, useState } from "react";
import Art from "./art";
import Animations from "./animations";
import AboutMe from "./aboutme";
import FooterPage from "./footer";
import DefaultPage from "./defaultPage";
import Resume from "./resume";

interface UnlockedContentProps {
  component: string;
  footerRef: React.RefObject<HTMLDivElement | null>;
}

const UnlockedContent = ({ component, footerRef }: UnlockedContentProps) => {
  const [isVisible, setIsVisible] = useState(false);


  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  const images = [
    `${imagePath}/newjeans.png`,
    `${imagePath}/cocoon1.png`,
    `${imagePath}/women.png`,
    `${imagePath}/dragon.png`,
    `${imagePath}/uk.png`,
  ];

  const videos = [
    `${imagePath}/Thepitch.mp4`
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50); // Delays the animation slightly
    return () => clearTimeout(timeout);
  }, [component]);

  useEffect(() => {
    if (component === "Contact" && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [component]);

  const renderComponent = () => {
    switch (component) {
      case "Animations":
        return <Animations videos={videos} />;
      case "Art":
        return <Art images={images} />;
      case "AboutMe":
        return <AboutMe />;
      case "Resume":
        return <Resume />;
      default:
        return <DefaultPage />;
    }
  };

  return (
    <div
      className={`bg-yellow-950 w-full min-h-screen max-w-full border-t-4 border-black transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mt-20 text-center"></div>
      <div className="w-full">{renderComponent()}</div>
      <div className="bottom-0" ref={footerRef}>
        <FooterPage />
      </div>
    </div>
  );
};

export default UnlockedContent;
