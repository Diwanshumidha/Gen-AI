import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);

type ClassificationResponseType = [{ label: string; score: number }[]];

export async function POST(req: Request) {
  const labelMeanings = {
    admiration: "A feeling of deep respect and approval.",
    joy: "A feeling of great pleasure and happiness.",
    excitement: "A feeling of intense enthusiasm and anticipation.",
    gratitude: "A feeling of thankfulness and appreciation.",
    approval: "A positive assessment or agreement with something.",
    pride: "A sense of satisfaction in one`s achievements or qualities.",
    neutral: "Not favoring any particular side or viewpoint.",
    love: "A strong affection or deep emotional attachment.",
    optimism: "A hopeful and positive outlook on the future.",
    relief: "A feeling of reassurance or alleviation of distress.",
    caring: "Showing concern and kindness toward others.",
    amusement: "Entertainment or enjoyment from something amusing.",
    realization: "The act of becoming aware or comprehending something.",
    desire: "A strong feeling of wanting or longing for something.",
    surprise: "A sudden and unexpected emotional reaction.",
    annoyance: "A slight feeling of irritation or displeasure.",
    disapproval: "A negative assessment or disagreement with something.",
    curiosity: "A strong desire to know or learn something.",
    sadness: "A feeling of unhappiness or sorrow.",
    anger: "A strong feeling of displeasure or hostility.",
    confusion: "A state of being bewildered or lacking clarity.",
    disappointment: "A sense of unfulfilled expectations or letdown.",
    grief: "Deep sorrow or emotional suffering, typically due to loss.",
    nervousness: "A state of anxiety or unease.",
    fear: "An unpleasant emotional response to a perceived threat.",
    disgust: "A strong feeling of revulsion or repulsion.",
    remorse: "A deep sense of guilt or regret for past actions.",
    embarrassment: "A feeling of self-consciousness or awkwardness.",
  };
  const emojiMapping = {
    neutral: "😐",
    joy: "😃",
    excitement: "🎉",
    approval: "👍",
    admiration: "😍",
    relief: "😌",
    realization: "💡",
    pride: "🏆",
    gratitude: "🙏",
    surprise: "😲",
    caring: "❤️",
    annoyance: "😠",
    love: "❤️",
    optimism: "🌞",
    amusement: "😄",
    sadness: "😢",
    desire: "😍",
    disappointment: "😞",
    anger: "😡",
    disapproval: "👎",
    grief: "😥",
    curiosity: "🤔",
    embarrassment: "😳",
    nervousness: "😬",
    confusion: "😕",
    fear: "😱",
    disgust: "🤢",
    remorse: "😔",
  };

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

    // Define the URLs for the two requests
    const firstURL =
      "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
    const secondURL =
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

    // Define an array of promises for both requests
    const requests = [
      fetch(firstURL, {
        headers: { Authorization: `Bearer ${HF_ACCESS_TOKEN}` },
        method: "POST",
        body: JSON.stringify(inputvalue),
      }),
      fetch(secondURL, {
        headers: { Authorization: `Bearer ${HF_ACCESS_TOKEN}` },
        method: "POST",
        body: JSON.stringify(inputvalue),
      }),
    ];

    // Use Promise.all to fetch both requests concurrently
    const responses = await Promise.all(requests);

    // Process the responses
    const results = await Promise.all(
      responses.map((response) => response.json())
    );

    const emotionRes: ClassificationResponseType = results[0];
    const PositiveRes = results[1];

    if (!emotionRes || !responses[0].ok) {
      console.log("Something Went Wrong");
      console.log(emotionRes, responses[0].statusText);
    }

    if (!responses[1].ok) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    console.log(emotionRes[0]);
    const filteredData = responses[0].ok
      ? emotionRes?.[0]
          .map((item) => ({
            label: item.label,
            score: (item.score * 100).toFixed(2),
            emoji: (emojiMapping as { [key: string]: string })[item.label],
            meaning:
              (labelMeanings as { [key: string]: string })[item.label] ||
              "No meaning available",
          }))
          .filter((item) => parseInt(item.score) >= 4)
      : undefined;

    console.log(filteredData);
    return NextResponse.json(
      { score: filteredData, positiveScore: results[1][0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
