import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onTabChange: (tab: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ targetRef, onTabChange }) => {
  const [showNavbar, setShowNavbar] = useState(false);

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
            className="fixed top-0 left-0 w-full bg-yellow-900 shadow-lg p-4 flex items-center justify-between z-50"
          >
            <div className="ml-4">
              <Image src="/public/name.png" width={80} height={80} alt="Heather Burns" />
            </div>
            <div className="flex text-amber-400 text-xl mr-6">
              <a className="mx-3 relative group cursor-pointer" onClick={() => onTabChange("Contact")}>Contact</a>
              <a className="mx-3 relative group cursor-pointer" onClick={() => onTabChange("Animations")}>Animations</a>
              <a className="mx-3 relative group cursor-pointer" onClick={() => onTabChange("Art")}>Illustration</a>
              <a className="mx-3 relative group cursor-pointer" onClick={() => onTabChange("AboutMe")}>About Me</a>
              <a className="mx-3 relative group cursor-pointer" onClick={() => onTabChange("AboutMe")}>Resume</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
