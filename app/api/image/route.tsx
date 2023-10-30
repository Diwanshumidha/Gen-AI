import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export async function POST(req: Request) {
  const inputvalue = await req.text();
  console.log(inputvalue);
  // const res = await inference.textToImage({
  //   model: "stabilityai/stable-diffusion-2",

  //   inputs: inputvalue,
  //   parameters: {
  //     negative_prompt: "blurry",
  //   },
  // });

  const prompt = `Generate a high-definition, realistic, 8k, Portrait, Focused  and cinematic ${inputvalue} With Ultrarealistic Textures, with proper lighting, shadows, contrast, and a focus on capturing intricate details. Ensure that the result is akin to a lifelike portrayal. Additionally, add a background blur to enhance the focus on the subject. Please add a comment in the code snippet if you make any changes or have any specific requests.`;
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: { Authorization: `Bearer ${HF_ACCESS_TOKEN}` },
      method: "POST",
      body: JSON.stringify(prompt),
    }
  );

  const res = await response.blob();
  console.log(res);
  const buffer = Buffer.from(await res.arrayBuffer());
  const dataURL = `data:${res.type};base64,${buffer.toString("base64")}`;
  return NextResponse.json({ url: dataURL }, { status: 200 });
}

// export async function POST(req: Request) {
//   const inputvalue = await req.text();
//   console.log(inputvalue);

//   // Simulate a 10-second interval
//   await simulateInterval(4_000); // 10000 milliseconds = 10 seconds

//   return NextResponse.json({ url: "Hello JS" }, { status: 200 });
// }

// function simulateInterval(ms: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
