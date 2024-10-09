const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const coverImage = document.getElementById('cover');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
// const song1 = './music/song1.mp3'

const songs = [
    {
        title: 'Song: Millionaire',
        artist: 'Artist Name: Yo Yo Honey Singh',
        src: 'music/song1.mp3',
        cover: 'cover image/pic1.jpg'
    },
    {
        title: 'Song: Husn Tera Tauba Taube',
        artist: 'Artist: Karan Aujla',
        src: 'music/song2.mp3',
        cover: 'cover image/pic2.jfif'
    },
    {
        title: 'Song: Brown Munde',
        artist: 'Artist Name: AP Dhillon, Gurinder Gill',
        src: 'music/song3.mp3',
        cover: 'cover image/pic3.jfif'  
    },
    {
        title: 'Song: We Rollin',
        artist: 'Artist Name: Shubh',
        src: 'music/song4.mp3',
        cover: 'cover image/pic4.jfif'  
    },
];

let songIndex = 0;

// Load the song
function loadSong(song) {
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    coverImage.src = song.cover;
    audio.src = song.src;
}

// Play song
function playSong() {
    audio.play();
    playBtn.textContent = '⏸️'; 
}

// Pause song
function pauseSong() {
    audio.pause();
    playBtn.textContent = '⏯️'; 
}

// Format time for display
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update progress and time displays
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Load initial song
loadSong(songs[songIndex]);
