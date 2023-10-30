import { ImageIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import Classification from "../Icons/Classification";
import Link from "next/link";

const BottomBar = () => {
  return (
    <div className=" fixed sm:hidden flex items-center shadow-md shadow-secondary justify-around  bottom-0 backdrop-blur-lg z-50 w-full h-[80px] bg-black/60">
      <Link href={"/"} className=" flex flex-col justify-center flex-1 gap-1">
        <ImageIcon className="mx-auto w-6 h-6" />
        <p className=" text-center text-xs">Image</p>
      </Link>
      <Link
        href={"/summarize"}
        className=" flex flex-col justify-center flex-1 gap-1 "
      >
        <Pencil1Icon className="mx-auto w-6 h-6" />
        <p className=" text-center text-xs">Summarize</p>
      </Link>{" "}
      <Link
        href={"/classification"}
        className=" flex flex-col justify-center flex-1 gap-1 "
      >
        <Classification className="mx-auto w-6 h-6" />
        <p className=" text-center text-xs">Classification</p>
      </Link>
    </div>
  );
};

export default BottomBar;
