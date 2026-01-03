import { input, select, number } from "@inquirer/prompts";
import open from "open";

const startNeat = async (source: string, interval: number) => {
  const play = async () => {
    try {
      await open(source);
    } catch (error) {
      console.error("Error opening source:", error);
    }
  };

  await play();

  setInterval(async () => {
    await play();
  }, interval * 60000);
};

async function run() {
  const mode = await select({
    message: "Select notification mode:",
    choices: [
      { name: "YouTube Video (Opens Browser)", value: "youtube" as const },
      { name: "Local MP3 File (Opens Default Player)", value: "mp3" as const },
    ],
  });

  let source = "";
  if (mode === "youtube") {
    source = await input({
      message: "YouTube video URL",
      validate: (value) => {
        const isYoutubeURL = value.match(/^(https?:\/\/)?(?:www\.)?(youtube\.com|youtu\.be)\/.+$/);
        if (isYoutubeURL) return true;
        return "Please enter a valid YouTube URL";
      },
      default: "https://youtu.be/3SDBTVcBUVs?t=124",
    });
  } else {
    source = await input({
      message: "Path to MP3 file",
      default: "workout.mp3",
      validate: (value) => {
        if (value.toLowerCase().endsWith(".mp3")) return true;
        return "Please enter a valid .mp3 file path";
      },
    });
  }

  const intervalInput = await number({
    message: "Interval in minutes",
    default: 30,
    required: true,
  });

  const delayInput = await number({
    message: "Delay in minutes (before first run)",
    default: 0,
    required: true,
  });

  console.log(
    `\n🚀 Azia started! Mode: ${mode}, Interval: ${intervalInput}m, Delay: ${delayInput}m`,
  );

  setTimeout(() => {
    startNeat(source, intervalInput);
  }, delayInput * 60000);
}

run().catch((error) => {
  if (error.name !== "ExitPromptError") {
    console.error(error);
  }
});
