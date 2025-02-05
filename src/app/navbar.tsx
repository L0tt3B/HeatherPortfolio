import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onTabChange: (tab: string) => void;
  onScrollToFooter: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ targetRef, onTabChange, onScrollToFooter }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return (
    <div>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-yellow-900 shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between z-50"
          >
            <div className="ml-4 flex justify-center sm:justify-start w-36">
              <Image src={`${imagePath}/name.png`} width={100} height={80} alt="Heather Burns" className="w-full h-auto" />
            </div>
            <div className="flex flex-wrap justify-center text-amber-400 text-xl sm:text-lg mt-3 sm:mt-0">
              <a className="mx-2 my-1 relative group cursor-pointer" onClick={() => { onTabChange("Contact"); onScrollToFooter(); }}>
                Contact
                <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
              </a>
              <a className="mx-2 my-1 relative group cursor-pointer" onClick={() => onTabChange("Animations")}>
                Animations
                <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
              </a>
              <a className="mx-2 my-1 relative group cursor-pointer" onClick={() => onTabChange("Art")}>
                Illustration
                <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
              </a>
              <a className="mx-2 my-1 relative group cursor-pointer" onClick={() => onTabChange("AboutMe")}>
                About Me
                <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
              </a>
              <a className="mx-2 my-1 relative group cursor-pointer" onClick={() => onTabChange("Resume")}>
                Resume
                <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
