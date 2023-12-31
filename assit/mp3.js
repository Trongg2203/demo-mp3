const song =document.getElementById('song');

const playBtn = document.querySelector('.player-inner');

const nextBtn =document.querySelector('.play-next');

const prevBtn =document.querySelector('.play-back');

const durationTime = document.querySelector('.duration');

const remainingTime = document.querySelector('.remaining');

const rangeBar = document.querySelector('.range');

let isPlaying = true;

let indexSong = 0;

const musics = ["SonTung.mp3.mp3","HoangSon.mp3.mp3","ManhQuynh.mp3.mp3"];

displayTimer();

let timer;

song.setAttribute("src",`./music/${musics[indexSong]}`);

nextBtn.addEventListener('click',function() {
    changeSong("1");
})

prevBtn.addEventListener('click',function() {
    changeSong(-1); 
})

song.addEventListener('ended',handleEndedSong);

function handleEndedSong(){
    changeSong(1);
}

function changeSong(dir){
    if(dir == 1){
        //next song
        indexSong++;
        if(indexSong >= musics.length){
            indexSong = 0;
        }
        isPlaying = true;  
    }else if(dir == -1){
        //prev song
        indexSong--;
        if(indexSong < 0 ){
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src",`./music/${musics[indexSong]}`);

    playPause();
}

playBtn.addEventListener('click',playPause);

function playPause(){
    if(isPlaying){
        song.play(); 
        // playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;  
        timer = setInterval(displayTimer,500)
    }else{
        song.pause();
        //     playBtn.innerHTML = ` <span class="material-symbols-outlined">
        //     play_circle
        // </span>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

// tạo thời gian bài nhạc
function displayTimer(){
    const{duration, currentTime} = song;
    
    rangeBar.max = duration;

    rangeBar.value = currentTime;

    remainingTime.textContent = formatTimer(currentTime);
    if(!duration){
        durationTime.textContent = '00:00'
    }else {
        durationTime.textContent = formatTimer(duration);
    }
};

// format timer để tạo thời gian cho bài nhạc

function formatTimer(number){
    const minutes = Math.floor(number / 60); 
    const seconds = Math.floor(number - minutes * 60 ); 
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds: seconds}`; 
}

rangeBar.addEventListener('change', handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}