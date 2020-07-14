function round(number, decimals = 2) {
  let coeff = 1;
  for (let i = 0; i < decimals; i++) {
    coeff *= 10;
  }

  return Math.round((number + Number.EPSILON) * coeff) / coeff;
}

function between(number, min, max) {
  return Math.min(max, Math.max(min, number));
}

const formatTime = time => {
  const minutes = (Math.floor(time / 60000) + "").padStart(2, "0");
  const seconds = (Math.floor((time % 60000) / 1000) + "").padStart(2, "0");
  const milliseconds = (Math.floor(time % 1000) + "").padStart(3, "0");
  return minutes + ":" + seconds + "." + milliseconds;
}