class Timer {
  constructor() {
    this.timerWorker = new Worker('js/timer-worker.js');
    this.messageHandlers = {};

    this.timerWorker.addEventListener('message', this._receiveMessage);
  }

  start() {
    this.timerWorker.postMessage({action: "start"});
  }

  setTime(time) {
    this.timerWorker.postMessage({action: "setTime", parameters: { time }});
  }

  stop(eventBack = true) {
    this.timerWorker.postMessage({action: "stop", parameters: { eventBack }});
  }

  updateTimer(updateTimerString) {
    document.getElementById("timer").innerHTML = updateTimerString;
  }

  addMessageHandler(messageAction, callback) {
    this.messageHandlers[messageAction] = callback;
  }

  _receiveMessage = (e) => {
    const action = e.data.action;
    const value = e.data.value;
    if (this.messageHandlers[action]) {
      return this.messageHandlers[action](value);
    }

    if (action === "updateTimer") {
      this.updateTimer(value);
    }
  }
}