import { input } from '@inquirer/prompts';
import open from 'open';

const isValidNumber = (val: string): boolean | string => {
  const parsed = parseFloat(val);
  const isValid = Number.isInteger(parsed);
  if (isValid && parsed >= 0) return true;
  return 'Please enter a valid number (e.g., 3)';
};

const startNeat = (url: string, interval: number) => {
  open(url);
  setInterval(() => {
    open(url);
  }, interval * 60000);
};

async function run() {
  const url = await input({
    message: 'Youtube video URL',
    validate: (value) => {
      const isYoutubeURL = value.match(
        /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      );
      if (isYoutubeURL) return true;
      return 'Please enter a valid Youtube URL';
    },
    default: 'https://youtu.be/3SDBTVcBUVs?t=124',
  });

  const intervalInput = await input({
    message: 'Interval in minutes for the video to be opened',
    validate: isValidNumber,
    default: '30',
  });

  const delayInput = await input({
    message: 'Delay in minutes for the video to be opened',
    validate: isValidNumber,
    default: '0',
  });

  const interval = Number(intervalInput);
  const delay = Number(delayInput);

  setTimeout(() => {
    startNeat(url, interval);
  }, delay * 60000);
}

run().catch((error) => {
  if (error.name !== 'ExitPromptError') {
    console.error(error);
  }
});
