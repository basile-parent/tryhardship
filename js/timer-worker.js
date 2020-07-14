let TIMER = null;
let TIMER_START = 0;
let TIMER_INTERVAL = null;

self.addEventListener('message', e => {
  switch(e.data.action) {
    case "start":
      start();
      break;
    case "stop":
      stop(e.data.parameters);
      break;
    case "setTime":
      setTime(e.data.parameters);
      break;
  }
});

const start = () => {
  TIMER_INTERVAL = setInterval(() => {
    TIMER = new Date() - TIMER_START;
    updateTimer();
  }, 10);
};

const stop = ({ eventBack }) => {
  clearInterval(TIMER_INTERVAL);
  eventBack && self.postMessage({ action: "stopTimer", value: TIMER });
};

const setTime = ({ time }) => {
  TIMER_START = new Date(new Date().getTime() - (time || 0));
  TIMER = new Date() - TIMER_START;
  updateTimer();
};

const updateTimer = () => {
  self.postMessage({ action: "updateTimer", value: formatTime(TIMER)});
};

const formatTime = time => {
  const minutes = (Math.floor(time / 60000) + "").padStart(2, "0");
  const seconds = (Math.floor((time % 60000) / 1000) + "").padStart(2, "0");
  const milliseconds = (Math.floor(time % 1000) + "").padStart(3, "0");
  return minutes + ":" + seconds + "." + milliseconds;
}