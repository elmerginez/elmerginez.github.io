
// Autor de este codigo chafa pero funcional xd: Elmer Fredy Ginez Maquera
//ARRAY DE VIDEOS
var myVideoArray = [];
var currentVideo = 0
var videoPlaying = document.getElementById('video-main');
var titlePlaying = document.getElementById('title-main');
var labelFile = document.getElementById("label-file");
var inputFile = document.getElementById("input-file");
var containerBox = document.getElementById("container-box")
var videoPlaying = document.getElementById("video-main");
var videoControls = document.getElementById("video-controls");
var lastVideoButton = document.getElementById("last-video-button");
var playPauseVideoButton = document.getElementById("play-pause-video-button");
var nextVideoButton = document.getElementById("next-video-button");
var muteUnmuteAudioButton = document.getElementById("mute-unmute-audio-button");
var progressBar = document.getElementById("progress-bar");
var progressBarBox = document.getElementById("progress-bar-box");
var progressBall = document.getElementById("progress-ball");
var fullscreenVideoButton = document.getElementById("fullscreen-video-button");

var timeCurrent = document.getElementById("time-current");
var timeComplete = document.getElementById("time-complete");

videoPlaying.onended = nextVideoPlay;
inputFile.onchange = getSongs;
videoPlaying.onclick = showControls;
lastVideoButton.onclick = lastVideoPlay;
playPauseVideoButton.onclick = playPauseVideo;
nextVideoButton.onclick = nextVideoPlay;
muteUnmuteAudioButton.onclick = muteUnmuteAudio;
// fullscreenVideoButton.onclick = toggleFullScreen;
// videoPlaying.onchange = time;

videoPlaying.addEventListener("loadedmetadata", function () {
    let durationInMinutes = parseInt(videoPlaying.duration / 60);
    let durationInSeconds = parseInt(videoPlaying.duration % 60);
    timeComplete.textContent = `${(durationInMinutes < 10 ? "0" : "")}${durationInMinutes}:${(durationInSeconds < 10 ? "0" : "")}${durationInSeconds}`;
});

videoPlaying.addEventListener("timeupdate", function () {
    let currentTimeInSeconds = parseInt(videoPlaying.currentTime % 60);
    let currentTimeInMinutes = parseInt(videoPlaying.currentTime / 60);

    let formattedTime = `${(currentTimeInMinutes < 10 ? "0" : "")}${currentTimeInMinutes}:${(currentTimeInSeconds < 10 ? "0" : "")}${currentTimeInSeconds}`;
    timeCurrent.textContent = formattedTime;
});

function getSongs(event) {
    myVideoArray = event.target.files;
    playSong()
    console.log(myVideoArray)
    labelFile.style.display = "none"
    containerBox.classList.remove("container-box")
    addVideoToList()
}
function playSong() {
    const videot = URL.createObjectURL(myVideoArray[currentVideo])
    const titlet = myVideoArray[currentVideo].name.slice(0, -4)
    titlePlaying.innerHTML = titlet
    videoPlaying.src = videot
    videoPlaying.play()
    playPauseVideoButton.src = "icons/pause.svg";
    
}
function showControls() {
    videoControls.style.display = videoControls.style.display === "none" ? "inline-flex" : "none";
}
// Ocultar los controles automáticamente después de 5 segundos
/*
videoPlaying.addEventListener("mousemove", function() {
  clearTimeout(timer);
  videoControls.style.display = "inline-flex";
  var timer = setTimeout(function() {
  videoControls.style.display = "none";
  }, 5000);
});*/
function playPauseVideo() {
    if (videoPlaying.paused) {
        videoPlaying.play();
        playPauseVideoButton.src = "icons/pause.svg";
    } else {
        videoPlaying.pause();
        playPauseVideoButton.src = "icons/play.svg";
    }
}
function nextVideoPlay() {
    if (currentVideo != myVideoArray.length - 1) {
        currentVideo++;
        addSrcAndTitle();
    } else {
        currentVideo = 0;
        addSrcAndTitle();
    }
    videoPlaying.play();
    addClassListAndRemove();
}
function lastVideoPlay() {
    if (currentVideo != 0) {
        currentVideo--;
        addSrcAndTitle();
    } else {
        currentVideo = myVideoArray.length - 1;
        addSrcAndTitle();
    }
    videoPlaying.play();
    addClassListAndRemove();
}
function muteUnmuteAudio() {
    if (videoPlaying.muted) {
        videoPlaying.muted = false;
        muteUnmuteAudioButton.src = "icons/volume-max.svg";
    } else {
        videoPlaying.muted = true;
        muteUnmuteAudioButton.src = "icons/volume-none.svg";
    }
}

const toggleFullScreen = async () => {
    const container = document.getElementById('videofx');
    const fullscreenApi = container.requestFullscreen
        || container.webkitRequestFullScreen
        || container.mozRequestFullScreen
        || container.msRequestFullscreen;
    if (!document.fullscreenElement) {
        fullscreenApi.call(container);
        fullscreenVideoButton.src = "icons/quit-fullscreen.svg"
    }
    else {
        document.exitFullscreen();
        fullscreenVideoButton.src = "icons/fullscreen.svg"
    }
};


// Barra de progreso del video
videoPlaying.addEventListener("timeupdate", function () {
    var percentage = (videoPlaying.currentTime / videoPlaying.duration) * 100;
    progressBar.value = percentage;
});
progressBar.addEventListener("mousedown", function (event) {
    var position = (event.clientX - progressBar.getBoundingClientRect().left) / progressBar.getBoundingClientRect().width;
    videoPlaying.currentTime = position * videoPlaying.duration;
});
videoPlaying.addEventListener("timeupdate", function () {
    var position = videoPlaying.currentTime / videoPlaying.duration;
    progressBar.style.width = position * 100 + "%";
});
progressBarBox.addEventListener("mousemove", function (event) {
    if (event.buttons === 1) {
        var position = (event.clientX - progressBarBox.getBoundingClientRect().left) / progressBarBox.getBoundingClientRect().width;
        videoPlaying.currentTime = position * videoPlaying.duration;
    }
});
progressBarBox.addEventListener("mouseup", function (event) {
    var position = (event.clientX - progressBarBox.getBoundingClientRect().left) / progressBarBox.getBoundingClientRect().width;
    videoPlaying.currentTime = position * videoPlaying.duration;
});
progressBarBox.addEventListener("mouseover", function () {
    progressBall.style.display = "block";
});
progressBarBox.addEventListener("mouseout", function () {
    progressBall.style.display = "none";
});
// Fin barra de progreso del video
function addClassListAndRemove() {
    const listVideo = document.querySelectorAll('.video-list .list-video');
    for (const video of listVideo) {
        video.classList.remove('active');
    }
    listVideo[currentVideo].classList.add('active');
}
function addSrcAndTitle() {
    videoPlaying.src = URL.createObjectURL(myVideoArray[currentVideo]);
    titlePlaying.innerHTML = myVideoArray[currentVideo].name.slice(0, -4);
}
function addVideoToList() {
    const videoList = document.querySelector('.video-list');
    for (let i = 0; i < myVideoArray.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add("list-video");
        const video = document.createElement('video');
        video.src = URL.createObjectURL(myVideoArray[i]);
        const h3 = document.createElement('h3');
        h3.classList.add('list-video-title');
        h3.textContent = myVideoArray[i].name.slice(0, -4);
        newDiv.appendChild(video);
        newDiv.appendChild(h3);
        videoList.appendChild(newDiv);
    }
    const listVideo = document.querySelectorAll(".video-list .list-video")
    for (const video of listVideo) {
        video.onclick = () => {
            for (const video of listVideo) {
                video.classList.remove('active');
            }
            if (video) {
                video.classList.add('active');
                let src = video.children[0].getAttribute('src');
                videoPlaying.src = src;
                let text1 = document.querySelector('.list-video.active .list-video-title');
                titlePlaying.innerHTML = text1.textContent;
                videoPlaying.play();
                playPauseVideoButton.src = "iconos/pause.svg";
                let i
                for (i = 0; i < myVideoArray.length; i++) {
                    if (myVideoArray[i].name.slice(0, -4) == titlePlaying.textContent) {
                        console.log(`El video actual se encuentra en la posición ${i} de la lista`);
                        currentVideo = i;
                    }
                }
            }
        };
    }
}

videoPlaying.addEventListener("mousemove", function () {
    clearTimeout(timer);
    videoPlaying.style.cursor = "default";
    var timer = setTimeout(function () {
        videoPlaying.style.cursor = "none";
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fullscreen-video-button').addEventListener('click', toggleFullScreen);
});

