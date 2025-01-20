import Image from "next/image";

const Bag = () => {
  return (
    <div className="bg-yellow-900 w-full h-full rounded-lg flex flex-col justify-center items-center p-6">
      <div>
        <Image
          src="/name.png"
          width={650}
          height={600}
          alt="Heather Burns"
        />
      </div>
      <div className="flex text-amber-400 text-xl mt-12">
        <a className="mx-3 relative group">
          Contact
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group">
          Animations
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group">
          Art
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
        <a className="mx-3 relative group">
          About Me
          <span className="block absolute bottom-0 left-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </a>
      </div>
    </div>
  );
};

export default Bag;
