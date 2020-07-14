const SCORES_KEY = "tryhardship_score_v1.0";
const SCORES = getScores();

function getScores() {
  const score = JSON.parse(localStorage.getItem(SCORES_KEY)) || {};
  MODES.forEach(mode => {
    if (!score[mode.key]) {
      score[mode.key] = 0;
    }
  });
  return score;
}

function setScore(mode, timer) {
  SCORES[mode.key] = timer;
  localStorage.setItem(SCORES_KEY, JSON.stringify(SCORES));
}