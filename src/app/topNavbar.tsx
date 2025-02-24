import { motion } from "framer-motion";

interface TopNavbarProps {
  onTabChange: (tab: string) => void;
}

const TopNavbar = ({ onTabChange }: TopNavbarProps) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full bg-black/70 z-20 flex flex-col items-center justify-center space-y-6 text-amber-400 text-2xl shadow-lg h-screen"
    >
      {/* Navigation Links */}
      {["Contact", "Animations", "Characters", "Comics", "Art", "AboutMe", "Resume"]?.map((tab) => (
        <a
          key={tab}
          className="cursor-pointer"
          onClick={() => onTabChange(tab)} // Clicking closes the menu
        >
          {tab}
        </a>
      ))}
    </motion.div>
  );
};

export default TopNavbar;
