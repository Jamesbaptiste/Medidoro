const app = () => {
  const audio = document.querySelector(".audio");
  const video = document.querySelector(".video-container video");
  const play = document.querySelector(".play-button");

  //Sounds
  const sounds = document.querySelectorAll(".sounds button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  //choose minutes
  const chooseMinutes = document.querySelectorAll(".minutes button");

  //duration
  let Duration = 1500;
  //pick different sound/video change
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      audio.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      Playing(audio);
    });
  });
  //play audio
  play.addEventListener("click", () => {
    Playing(audio);
  });
  //play and pause
  const Playing = audio => {
    if (audio.paused) {
      audio.play();
      video.play();
      play.innerHTML = "Pause";
    } else {
      audio.pause();
      video.pause();
      play.innerHTML = "Play";
    }
  };
  //select sound
  chooseMinutes.forEach(option => {
    option.addEventListener("click", function() {
      Duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(Duration / 60)}:${Math.floor(
        Duration % 60
      )}`;
    });
  });
  audio.ontimeupdate = () => {
    let currentTime = audio.currentTime;
    let elapsed = Duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    //change audio vid at end
    if (currentTime >= Duration) {
      audio.pause();
      video.pause();
      audio.currentTime = 0;
    }
  };
};

app();
