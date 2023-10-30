"use server"
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = "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";

const inference = new HfInference(HF_ACCESS_TOKEN);

export async function GetImage() {
  const res = await inference.textToImage({
    model: "stabilityai/stable-diffusion-2",
    inputs: "A cute Panda",
    parameters: {
      negative_prompt: "blurry",
    },
  });

  const buffer = Buffer.from(await res.arrayBuffer());
  const dataURL = `data:${res.type};base64,${buffer.toString("base64")}`;
  return dataURL
}
