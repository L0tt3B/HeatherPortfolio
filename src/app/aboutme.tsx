import Image from "next/image";

const AboutMe = () => {
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  return (
    <div className="bg-yellow-950 font-sans w-full min-h-screen max-w-full transition-transform duration-700 ease-in-out p-4 sm:p-2">
      <div className="w-full text-white text-lg mt-10">
        <div className="mb-20 sm:mb-12">
          <h2 className="text-2xl font-bold font-[customfont] text-white flex items-center justify-center">
            <span className="flex-grow border-t border-white mr-4"></span>
            Heather Burns
            <span className="flex-grow border-t border-white ml-4"></span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center mx-5 mt-5 space-y-4 sm:space-y-0 sm:space-x-5">
            <Image
              src={`${imagePath}/heather.jpg`}
              alt="You."
              width={200}
              height={200}
              className="rounded-lg shadow-md border border-white w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
            />
            <div className="text-center sm:text-left">
              <p className="text-lg mb-4">
                Hey guys and welcome back to my portfolio, I hope you like and recruit me for a placement. I am a 20-year-old who enjoys watching anime, drumming, dancing, playing Valorant, and Roblox.
              </p>
              <p className="text-lg">
                I study Graphic Design at the #1 University in the UK, Loughborough University. What can I say, good grades neva met me. Only GREAT grades. 1:1 baby!
              </p>
            </div>
          </div>
        </div>

        <div className="border-dotted bg-black/30 border-yellow-500 border-2 mx-5 py-5">
          <h2 className="text-2xl mx-6 font-bold text-white flex items-center justify-center">
            <span className="flex-grow border-t border-white mr-4"></span>
            Softwares
            <span className="flex-grow border-t border-white ml-4"></span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center mx-5 space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="text-center">
              <p className="mb-2">Confidence:</p>
              <Image
                src={`${imagePath}/work.jpg`}
                alt="You."
                width={200}
                height={200}
                className="rounded-lg shadow-md border border-white w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
              />
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start">
              <Image 
                src={`${imagePath}/AI.png`}
                alt="AI"
                width={140}
                height={100}
                className="rounded-2xl w-[100px] h-[80px] sm:w-[140px] sm:h-[100px]"
              />
              <Image 
                src={`${imagePath}/PS.png`}
                alt="AI"
                width={100}
                height={100}
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
              />
            </div>

            <p className="text-lg text-center sm:text-left">I use Adobe, and some other stuff.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
