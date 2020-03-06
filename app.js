const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play-button");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  //duration
  let fakeDuration = 1500;
  //pick differnt sound/video change
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });
  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });
  //play and pause
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.innerHTML = "Pause";
    } else {
      song.pause();
      video.pause();
      play.innerHTML = "Play";
    }
  };
  //select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    //change audio vid at end
    if (currentTime >= fakeDuration) {
      song.pause();
      video.pause();
      song.currentTime = 0;
    }
  };
};

app();
