import {
  GitHubLogoIcon,
  Link1Icon,
  Link2Icon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";

const Navbar = () => {
  return (
    <div className=" w-full bg-background max-sm:border-b max-sm:border-solid border-gray-900 flex px-4 justify-between items-center  h-[60px] md:h-[70px]">
      <div className="flex items-center sm:hidden space-x-3">
        <img src="/Logo.png" className="  w-6 h-6"></img>
        <h1 className="text-lg font-medium">Gen AI</h1>
      </div>
      <div className=" ml-auto flex items-center gap-1 ">
        <a className=" hover:bg-secondary/50 p-2 rounded-md cursor-pointer">
          {" "}
          <Link2Icon className="w-5 h-5" />
        </a>
        <a className=" hover:bg-secondary/50 p-2 rounded-md cursor-pointer">
          <LinkedInLogoIcon className="w-5 h-5" />
        </a>
        <a className=" hover:bg-secondary/50 p-2 rounded-md cursor-pointer">
          <GitHubLogoIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
