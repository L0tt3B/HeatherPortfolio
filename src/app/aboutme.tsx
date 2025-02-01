import Image from "next/image";

const AboutMe = () => {
  return (
    <div className="bg-yellow-950 font-sans w-full min-h-screen max-w-full transition-transform duration-700 ease-in-out">

      <div className="w-full text-white text-lg mt-10">
        {/* You Section */}
        <div className="mb-28">
          <h2 className="text-2xl font-bold font-[customfont] text-white flex items-center justify-center">
            <span className="flex-grow border-t border-white mr-4"></span>
            Heather Burns
            <span className="flex-grow border-t border-white ml-4"></span>
          </h2>
          <div className="flex items-center mx-5 mt-5 space-x-5">
            <Image
              src="/HeatherPortfolio/heather.jpg"
              alt="You."
              width={200}
              height={200}
              className="rounded-lg shadow-md border border-white"
            />
            <div>
              <p className="text-lg mb-4">
                Hey guys and welcome back to my portfolio, I hope you like and
                recruit me for a placement. I am a 20-year-old who enjoys watching
                anime, drumming, dancing, playing Valorant, and Roblox. Please,
                someone take her. - Programmer
              </p>
              <p className="text-lg">
                I study Graphic Design at the #1 University in the UK,
                Loughborough University. What can I say, good grades neva met me.
                Only GREAT grades. 1:1 baby!
              </p>
            </div>
          </div>
        </div>

        {/* Softwares Section */}
        <div className="border-dotted bg-black/30 border-yellow-500 border-2 mx-5 py-5">
          <h2 className="text-2xl mx-6 font-bold text-white flex items-center justify-center">
            <span className="flex-grow border-t border-white mr-4"></span>
            Softwares
            <span className="flex-grow border-t border-white ml-4"></span>
          </h2>
          <div className="flex items-center mx-5 space-x-5">
            <div>
              <p className="text-center mb-2">Confidence:</p>
              <Image
                src="/HeatherPortfolio/work.jpg"
                alt="You."
                width={200}
                height={200}
                className="rounded-lg shadow-md border border-white"
              />
            </div>
            <div className="flex flex-wrap">
              <Image 
                src="/HeatherPortfolio/AI.png"
                alt="AI"
                width={140}
                height={100}
                className="rounded-2xl"
              />
              <Image 
                src="/HeatherPortfolio/PS.png"
                alt="AI"
                width={100}
                height={100}
              />
            </div>

            <p className="text-lg">I use Adobe, and some other stuff.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
