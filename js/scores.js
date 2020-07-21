const SCORES_KEY = "tryhardship_score_v1.0";
const SCORES = getScores();

function getScores() {
  const score = JSON.parse(localStorage.getItem(SCORES_KEY)) || {};
  MODES.forEach(mode => {
    if (!score[mode.key]) {
      score[mode.key] =
        { timer: 0, life: 0, medals: []};
    } else {
      score[mode.key] =
        { ...score[mode.key], medals: calculateMedals({ ...score[mode.key] }) }
    }
  });
  return score;
}

function setScore(mode, timer, life) {
  SCORES[mode.key] = { timer, life };
  localStorage.setItem(SCORES_KEY, JSON.stringify(SCORES));
  SCORES[mode.key].medals = calculateMedals({ timer, life });
}

function calculateMedals({ timer, life = 0 }) {
  console.log("calculateMedals", timer, life);
  const medals = [];
  if (timer > 120000) {
    medals.push("bronze");
  }
  if (timer > 180000) {
    medals.push("silver");
  }
  if (timer >= 225000) {
    medals.push("gold");
  }
  if (timer >= 225000 && life === 100) {
    medals.push("platinium");
  }

  return medals;
}