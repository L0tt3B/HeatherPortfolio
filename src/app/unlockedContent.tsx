import { useEffect, useState } from "react";
import Art from "./art";
import Animations from "./animations";
import AboutMe from "./aboutme";
import FooterPage from "./footer";
import DefaultPage from "./defaultPage";

interface UnlockedContentProps {
  component: string;
}

const UnlockedContent = ({ component }: UnlockedContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    "/HeatherPortfolio/newjeans.png",
    "/HeatherPortfolio/cocoon1.png",
    "/HeatherPortfolio/women.png",
    "/HeatherPortfolio/dragon.png",
    "/HeatherPortfolio/uk.png",
  ];

  const videos = [
    "/HeatherPortfolio/Thepitch.mp4"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50); // Delays the animation slightly
    return () => clearTimeout(timeout);
  }, [component]);

  const renderComponent = () => {
    switch (component) {
      case "Animations":
        return <Animations videos={videos}/>;
      case "Art":
        return <Art images={images}/>;
      case "AboutMe":
        return <AboutMe />;
      default:
        return <DefaultPage/>;
      
    }

  }

  return (
    <div
      className={`bg-yellow-950 w-full min-h-screen max-w-full border-t-4 border-black transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mt-20 text-center">
      </div>
      <div className="w-full">
        {renderComponent()}
      </div>
      <div className="bottom-0">
        <FooterPage />
      </div>
    </div>
  );
};

export default UnlockedContent;
