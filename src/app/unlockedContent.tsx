import { useEffect, useState } from "react";
import Art from "./art";
import Animations from "./animations";
import AboutMe from "./aboutme";
import FooterPage from "./footer";
import DefaultPage from "./defaultPage";
import Resume from "./resume";
import Comics from "./comics";
import Characters from "./characters";

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

  const characters = [
    `${imagePath}/dragon.png`,
    `${imagePath}/kai.png`,
  ];

  const images = [
    `${imagePath}/newjeans.png`,
    `${imagePath}/cocoon1.png`,
    `${imagePath}/women.png`,
    `${imagePath}/dragon.png`,
    `${imagePath}/uk.png`,
  ];

  const videos = [
    { src: `${imagePath}/Thepitch.mp4`, text: "The Pitch - A short animated film" },
    { src: `${imagePath}/animations/Fp.mp4`, text: "Farewell" }
  ];
  
  const gifs = [
    { src: `${imagePath}/animations/bananagif.gif`, text: "Banana Cat Talks" },
    { src: `${imagePath}/animations/bananacatsleep.gif`, text: "Banana Cat Sleeping" }
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
      case "Animations":
        return <Animations videos={videos} gifs={gifs}/>;
      case "Art":
        return <Art images={images} />;
      case "Characters":
        return <Characters character={characters}/>;
      case "AboutMe":
        return <AboutMe />;
      case "Resume":
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
