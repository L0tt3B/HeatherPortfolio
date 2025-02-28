"use client";
import { useState, useEffect, useRef } from "react";
import UnlockedContent from "./unlockedContent";
import Bag from "./bag";
import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Art");
  const linksRef = useRef<HTMLDivElement | null>(null);

  //const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  //const imagePath = isOnline ? "/HeatherPortfolio" : "";

  const footerRef = useRef<HTMLDivElement>(null);


  const toggleBag = () => {
    setActiveTab("Default");
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "Contact" && footerRef.current) {
      setTimeout(() => {
        if (footerRef.current) {
          footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;    }

    setActiveTab(tab);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <div className="bg-yellow-950 w-full min-h-screen">
      <Navbar 
        targetRef={linksRef} 
        onTabChange={handleTabChange}
        onScrollToFooter={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })}
      />
      <div className="w-full h-[80vh] relative" ref={linksRef}>
        <Bag 
          onTabChange={handleTabChange}
          onScrollToFooter={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })} 
        />
        <button
          onClick={toggleBag}
          className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 border-none bg-transparent focus:outline-none z-10"
        >
          <Image
            src={`/HeatherPortfolio/TAPE2.png`}
            width={150}
            height={150}
            alt="Buckle button"
            className="hover:scale-110 transition-transform duration-100"
          />
        </button>
      </div>
      <div className={`bg-orange-900 flex flex-col items-center justify-center w-full h-screen ${isOpen ? "" : "hidden"}`}>
        <div className="w-full min-h-screen scrollbar-hide">
          <UnlockedContent component={activeTab} footerRef={footerRef} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}
