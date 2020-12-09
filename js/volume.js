let MOUSE_VOLUME_FOCUS = false;
const bindVolume = () => {
  document.getElementById("volume_picker").addEventListener("mousedown", changeVolumeClickDown);
  document.getElementById("volume_picker").addEventListener("mouseup", changeVolumeClickUp);
  document.getElementById("volume_picker").addEventListener("mousemove", changeVolume);
};

const changeVolumeClickDown = (e) => {
  MOUSE_VOLUME_FOCUS = true;
  changeVolume(e);
}
const changeVolumeClickUp = (e) => {
  MOUSE_VOLUME_FOCUS = false;
  changeVolume(e);
}

const changeVolume = (e) => {
  if (!MOUSE_VOLUME_FOCUS) {
    return;
  }
  const containerDiv = document.getElementById("volume_picker");
  const { top: containerDivTop, height: containerDivHeight } = containerDiv.getBoundingClientRect();
  const clickY = e.y

  const newHeight = containerDivHeight - (clickY - containerDivTop) - 5;
  document.getElementById("volume_picker_level").style.height = newHeight + "px";

  const newVolume = Math.round(newHeight / containerDivHeight * 10) / 10;
  CURRENT_AUDIO_VOLUME = newVolume;
  game.scene.scenes.forEach(scene => {
    if (scene.audio) {
      scene.audio.setVolume(newVolume);
    }
  });
}

bindVolume();