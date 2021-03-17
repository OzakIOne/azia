const inquirer = require('inquirer');
const open = require('open');

const isValidNumber = (val) => {
  const isValid = Number.isInteger(parseFloat(val));
  if (isValid && val >= 0) return true;
  return 'Please enter a valid number eg: 3';
};

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Youtube video URL',
    validate: (value) => {
      const isYoutubeURL = value.match(
        /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      );
      if (isYoutubeURL) return true;
      return 'Please enter a valid youtube URL';
    },
    default: () => {
      return 'https://youtu.be/yVyMjCErcaE?t=83';
    },
  },
  {
    type: 'input',
    name: 'interval',
    message: 'Interval in minutes for the video to be opened',
    validate: (value) => isValidNumber(value),
    default: () => {
      return 30;
    },
  },
  {
    type: 'input',
    name: 'delay',
    message: 'Delay in minutes for the video to be opened',
    validate: (value) => isValidNumber(value),
    default: () => {
      return 0;
    },
  },
];

const startNeat = (url, interval) => {
  open(url);
  setInterval(() => {
    open(url);
  }, interval * 60000);
};

inquirer.prompt(questions).then(({ url, delay, interval }) => {
  if (delay === 0) startNeat(url, interval);
  else if (delay !== 0) {
    setTimeout(() => {
      startNeat(url, interval);
    }, delay * 60000);
  } else console.log('There was a problem');
});
