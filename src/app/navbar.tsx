import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TopNavbar from "./topNavbar";

type NavbarProps = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onTabChange: (tab: string) => void;
  onScrollToFooter: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ targetRef, onTabChange, onScrollToFooter }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    return () => observer.disconnect();
  }, [targetRef]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const tabDisplayNames: Record<string, string> = {
    Contact: "Contact",
    Animations: "Animations",
    Art: "Illustrations",
    AboutMe: "About",
    Resume: "Resume",
  };

  const handleTabChange = (tab: string) => {
    setIsMobileMenuOpen(false); 
    onTabChange(tab);
    if (tab === "Contact") onScrollToFooter();
  };

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-yellow-900 shadow-lg p-4 flex items-center justify-between z-50"
          >
            <div className="ml-4 flex justify-start w-36" onClick={() => handleTabChange("")}>
              <Image src={`${imagePath}/name.png`} width={100} height={80} alt="Heather Burns" className="w-full h-auto cursor-pointer" />
            </div>

            {!isMobile && (
              <div className="flex flex-wrap justify-center text-amber-400 text-lg">
                {Object.entries(tabDisplayNames)?.map(([tab, displayName]) => (
                  <a
                    key={tab}
                    className="mx-2 relative group cursor-pointer"
                    onClick={() => handleTabChange(tab)}
                  >
                    {displayName}
                    <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 transform -translate-x-1/2 bottom-[-2px]"></span>
                  </a>
                ))}
              </div>
            )}

            {isMobile && (
              <button className="text-amber-400 text-2xl" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <TopNavbar onTabChange={handleTabChange} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
