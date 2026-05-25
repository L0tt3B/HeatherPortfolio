import { motion } from "framer-motion";

interface TopNavbarProps {
  onTabChange: (tab: string) => void;
}

const tabs = [
  { label: "Contact",     key: "Contact" },
  { label: "Elastic",     key: "Elastic" },
  { label: "SKONZ",       key: "Skonz" },
  { label: "One Touch",   key: "Touch" },
  { label: "Comics",      key: "Comics" },
  { label: "Duo Connect", key: "Duo" },
  { label: "About Me",    key: "AboutMe" },
  { label: "CV",          key: "CV" },
];

const TopNavbar = ({ onTabChange }: TopNavbarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: "rgba(10,6,2,0.96)" }}
    >
      <nav className="flex flex-col items-center w-full">
        {tabs.map((tab) => (
          <a
            key={tab.key}
            className="w-full text-center cursor-pointer py-3 text-amber-400 text-2xl font-bold uppercase tracking-widest border-b border-amber-900/40 last:border-b-0 hover:text-white hover:bg-amber-900/30 transition-colors duration-150"
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

export default TopNavbar;