import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("Content-Type");

    console.log(contentType);
    if (contentType !== "text/plain;charset=UTF-8") {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected 'text/plain'" },
        { status: 400 }
      );
    }

    const inputvalue = await req.text();

    const res = await inference.summarization({
      model: "facebook/bart-large-cnn",
      inputs: inputvalue,
      parameters: {
        max_length: 100,
      },
    });

    return NextResponse.json({ text: res.summary_text }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
