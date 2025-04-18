import Image from "next/image";

interface BagProps {
  onTabChange: (tab: string) => void;
  onScrollToFooter: () => void;
}

const Bag = ({ onTabChange, onScrollToFooter }: BagProps) => {

  return (
    <div className="bg-yellow-900 w-full h-full rounded-lg flex flex-col justify-center items-center p-6 sm:p-4">
      <div className="w-full flex justify-center" onClick={() => onTabChange("")}>
        <Image
          src={`/HeatherPortfolio/name.png`}
          width={650}
          height={600}
          alt="Heather Burns"
          className="max-w-full h-auto sm:max-w-[80%] md:max-w-[60%] cursor-pointer"
        />
      </div>
      <div className="flex flex-wrap justify-center font-custom text-amber-400 text-xl mt-6 sm:text-lg sm:mt-4 space-x-6 sm:space-x-4 space-y-3 sm:space-y-2">
        <a className="my-2 relative group cursor-pointer text-center inline-block"
            onClick={() => { onScrollToFooter(); }}>
          Contact
          <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2 bottom-[-2px]"></span>
        </a>
        <a className="mx-4 my-2 relative group cursor-pointer text-center inline-block"
            onClick={() => onTabChange("Animations")}> 
          Animations
          <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-4 relative group cursor-pointer text-center inline-block"
            onClick={() => onTabChange("Art")}> 
          Illustration
          <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-4 relative group cursor-pointer text-center inline-block"
            onClick={() => onTabChange("AboutMe")}> 
          About Me
          <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-4 relative group cursor-pointer text-center inline-block"
            onClick={() => onTabChange("Resume")}> 
          Resume
          <span className="block absolute left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
      </div>
    </div>
  );
};

export default Bag;
