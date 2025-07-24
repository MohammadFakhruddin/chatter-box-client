import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 px-4 border-t mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl mb-4 md:mb-0">Chatter Box</div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm mb-4 md:mb-0">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
