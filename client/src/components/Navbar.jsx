import React from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMobile, settoggleMobile] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <h1 className="text-[40px] text-black">TITLE</h1>
      <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Features", "Features", "Features"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-black text-white py-2 px-7 mx-4 rounded-full">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMobile && (
          <HiMenu fontSize={28} className="text-black md:hidden cursor-pointer" onClick={() => settoggleMobile(true)} />
        )}
        {toggleMobile && (
          <AiOutlineClose fontSize={28} className="text-black md:hidden cursor-pointer" onClick={() => settoggleMobile(false)} />
        )}
        {toggleMobile && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-black animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => settoggleMobile(false)} /></li>
            {["Features", "Features", "Features"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;