"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import React, { FormEvent, useState } from "react";
import { Progress as ProgressElement } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import {} from "@radix-ui/react-icons";
import LightBulb from "../Icons/Lightbulb";
import { getRandomImagePrompt } from "@/lib/Prompts";
import { simulateProgress } from "@/lib/utils";

type Response = {
  url: string;
};
const ImageGenerator = () => {
  const [URL, setURL] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [Progress, setProgress] = useState(0);
  const [Error, setError] = useState("");

  const HandleSubmit = async (e: FormEvent | null, randomindex = false) => {
    if (e) {
      e.preventDefault();
    }
    setisLoading(true);
    setURL("");
    setError("");

    // Generate Random Prompt if Surprise me
    let prompt;
    if (randomindex) {
      prompt = getRandomImagePrompt();
      setinputValue(prompt);
    } else {
      prompt = inputValue;
    }

    try {
      const progressInterval = simulateProgress(90, setProgress);
      const res = await fetch("/api/image", {
        method: "POST",
        body: prompt,
      });

      if (!res.ok) {
        // Handle errors here if the response status is not okay
        console.error("Error: " + res.status);
        clearInterval(progressInterval);
        setisLoading(false);
        setError("Something Went Wrong Please Try again later");
        return;
      }

      const data: Response = await res.json();
      console.log(data);

      setProgress(100);
      clearInterval(progressInterval);
      setisLoading(false);
      setURL(data.url);
    } catch (error) {
      console.log(error);
      setError("Something Went Wrong Please try again later");
    }
  };

  return (
    <div className="">
      <div className="flex flex-col mb-4  h-max  ">
        {" "}
        <div className=" flex  gap-4 items-center">
          <h1 className=" text-2xl "> Generate An Image</h1>
          <button
            className=" bg-secondary max-sm:hidden px-3 hover:bg-secondary/50 py-1 rounded-full text-xs "
            onClick={() => HandleSubmit(null, true)}
          >
            Surprise Me
          </button>
        </div>
        <p className=" text-sm text-gray-500 ">
          create realistic images and art from a description in natural
          language.
        </p>
      </div>
      <form
        onSubmit={HandleSubmit}
        className=" flex gap-6 sticky max-sm:flex-col"
      >
        <div className=" flex flex-col w-full">
          <Input
            type="text"
            value={inputValue}
            autoFocus
            // className="text-black"
            placeholder="A Ghost Rider Riding a Fire Horse..."
            required
            onChange={(e) => setinputValue(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1 text-red-500">
            {Error}
          </p>
          {isLoading ? (
            <ProgressElement
              value={Progress}
              className=" h-1 transition-all duration-200"
            />
          ) : null}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Generating
            </div>
          ) : (
            "Generate Image"
          )}
        </Button>
      </form>

      <div className="w-full max-h-screen flex mt-7">
        {URL ? <img src={URL} className=" mx-auto max-w-full"></img> : null}
        {isLoading ? (
          <Skeleton className=" w-full aspect-square  lg:w-[700px] lg:h-[700px] mx-auto" />
        ) : null}

        {/* <img src={"/image.png"} className=" mx-auto" alt="" /> */}
      </div>
      {!URL && !isLoading ? (
        <div className=" w-full flex justify-center flex-col items-center mt-16">
          {" "}
          <h2 className=" text-xl md:text-2xl mx-auto font-serif flex gap-2 text-center">
            <LightBulb className=" w-6 h-6" /> Create Your Artwork
          </h2>
          <div className=" text-gray-400">
            or{" "}
            <button
              className=" underline"
              onClick={() => HandleSubmit(null, true)}
            >
              Surprise Me
            </button>
          </div>
        </div>
      ) : null}

      <div className=" flex w-full mt-7">
        {URL ? (
          <a
            className={buttonVariants({
              className: "mx-auto w-[200px] flex gap-2",
            })}
            href={URL}
            download="image"
          >
            <DownloadIcon />
            Download
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default ImageGenerator;
