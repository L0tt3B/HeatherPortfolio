import Image from "next/image";

const AboutMe = () => {
  const isOnline = typeof window !== "undefined" && window.location.hostname !== "localhost";
  const imagePath = isOnline ? "/HeatherPortfolio" : "";

  return (
    <div className="bg-yellow-950 font-sans w-full min-h-fit transition-transform duration-700 ease-in-out p-4 mb-12 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl text-white text-lg">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold font-[customfont] flex items-center justify-center">
            <span className="flex-grow border-t border-white mx-4"></span>
            Heather Burns
            <span className="flex-grow border-t border-white mx-4"></span>
          </h2>
        </div>

        {/* About Section */}
        <div className="flex flex-col sm:flex-row items-center mx-auto space-y-6 sm:space-y-0 sm:space-x-8">
          <Image
            src={`${imagePath}/heather.jpg`}
            alt="Heather Burns"
            width={280}
            height={280}
            className="rounded-lg shadow-md border border-white w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] object-cover"
          />
          <div className="text-center sm:text-left max-w-lg space-y-4">
          <p>
            <strong>Hello, my name is Heather Marie Burns.</strong> I am a British graphic designer based in England.
              Currently, I&apos;m studying at the University of Loughborough for my Graphic Design Degree, graduating in 2026.
          </p>
          <p>
            <strong>I&apos;d love to work with you on your next project!</strong> I have experience with the Adobe Suite,
            Krita, and Clip Studio Paint EX.
          </p>
          <p>
            <strong>In my free time,</strong> I enjoy going out to eat, watching movies, and playing games with my friends.
            If you&apos;d like to contact me for work (or just to say hi), feel free to reach out!
          </p>

          </div>
        </div>

        {/* Softwares Section */}
        <div className="border-dotted bg-black/30 border-yellow-500 border-2 mt-12 p-6 rounded-lg flex flex-col items-center w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center">
            <span className="flex-grow border-t border-white mx-4"></span>
            Softwares
            <span className="flex-grow border-t border-white mx-4"></span>
          </h2>

          {/* Software Icons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mt-6 w-full max-w-lg">
            {[
              { src: "AI2.png", width: 110, height: 80 },
              { src: "PS2.png", width: 120, height: 120 },
              { src: "Adobe_Creative_Cloud.png", width: 100, height: 100 },
              { src: "Krita.png", width: 100, height: 100 },
              { src: "CPS.png", width: 100, height: 100 },
            ].map((software, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={`${imagePath}/${software.src}`}
                  alt={software.src.replace(".png", "")}
                  width={software.width}
                  height={software.height}
                  className="rounded-lg object-contain w-[100px] h-[80px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
