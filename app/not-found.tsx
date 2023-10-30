import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className=" w-full h-[calc(100vh-90px)] text-center flex-col flex justify-center items-center">
      <h1 className=" text-2xl font-semibold"> AI Can't Find Page</h1>
      <p className=" text-gray-500 max-sm:hidden">
        Sorry we are not able to find the page you are looking for
      </p>
      <p className=" text-sm text-gray-500 ">
        Generate beautiful{" "}
        <Link href={"/"} className="underline text-[#d61dfc]">
          Images
        </Link>{" "}
      </p>
    </div>
  );
};

export default NotFound;
