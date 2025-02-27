import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterPage = () => {
  return (
    <div className="bg-black w-full max-w-full text-center text-white p-10 relative mt-auto">
      <p className="mb-6 text-lg">Get in touch with me!</p>

      {/* Social Media Icons Container */}
      <div className="relative flex justify-center items-center gap-12 text-3xl">
        {/* Full-Width White Line (Always Visible & Above Everything) */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white opacity-90"></div>

        {[
          { href: "https://www.instagram.com/_heatburns_/", icon: faInstagram },
          { href: "https://www.linkedin.com/in/heather-burns-6169ba24b/", icon: faLinkedin },
          { href: "mailto:heather@burns.net", icon: faEnvelope },
        ]?.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-16 h-16 border-2 border-white rounded-lg transition duration-300 hover:text-amber-400 hover:border-amber-400 backdrop-blur-sm"
          >
            {/* Social Media Icon */}
            <FontAwesomeIcon icon={social.icon} className="relative text-white transition duration-300 group-hover:text-amber-400" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterPage;
