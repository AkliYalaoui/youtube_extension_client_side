import { FaComments, FaChrome } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-4 max-w-6xl m-auto">
      <h2 className="text-3xl italic font-bold text-white flex items-baseline">
        <span>
          <FaComments />
        </span>
        <sub>analyzer</sub>
      </h2>
      <a
        href="#"
        target="_blank"
        className="flex justify-center items-center space-x-2 bg-blue-600 p-2 rounded "
      >
        <FaChrome /> <span>Get Extension</span>
      </a>
    </nav>
  );
};

export default NavBar;
