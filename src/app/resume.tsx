import Image from "next/image";

const Resume = () => {
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  return (
    <div className="bg-yellow-950 font-sans w-full min-h-screen max-w-full transition-transform duration-700 ease-in-out p-6 sm:p-4 flex mb-10 flex-col items-center">
      <div className="w-full text-white text-lg mt-6 sm:mt-4 text-center">
        <button className="bg-yellow-800/50 px-6 py-3 font-bold text-yellow-400 rounded-xl border-2 border-yellow-700 hover:bg-yellow-900/80 duration-100">
          PDF RESUME DOWNLOAD
        </button>
      </div>
      <div className="border-2 border-white rounded-lg drop-shadow-xl mt-10 w-full max-w-4xl flex justify-center p-4 sm:p-2">
        <Image 
          src={`${imagePath}/personal.jpg`}
          alt="Resume"
          width={700}
          height={500}
          className="w-full h-auto max-w-full rounded-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Resume;
