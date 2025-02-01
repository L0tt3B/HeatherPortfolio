import Image from "next/image";

interface BagProps {
  onTabChange: (tab: string) => void;
}

const Bag = ({ onTabChange }: BagProps) => {
  return (
    <div className="bg-yellow-900 w-full h-full rounded-lg flex flex-col justify-center items-center p-6">
      <div>
        <Image
          src="/public/name.png"
          width={650}
          height={600}
          alt="Heather Burns"
        />
      </div>
      <div className="flex font-custom text-amber-400 text-xl mt-12">
        <a className="mx-3 relative group cursor-pointer"
            onClick={() => onTabChange("Contact")}>
          Contact
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group cursor-pointer"
            onClick={() => onTabChange("Animations")}>
          Animations
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group cursor-pointer"
            onClick={() => onTabChange("Art")}>
          Illustration
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group cursor-pointer"
            onClick={() => onTabChange("AboutMe")}>
          About Me
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group cursor-pointer"
            onClick={() => onTabChange("AboutMe")}>
          Resume
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
      </div>
    </div>
  );
};

export default Bag;
