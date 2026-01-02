const audio = document.getElementById("audio");
const songName = document.getElementById("songName");
const songList = document.getElementById("songList");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const lyricsBox = document.getElementById("lyrics");
const languageSelect = document.getElementById("language");

let currentMood = "";
let currentIndex = 0;
let currentLanguage = "telugu";

/* ✅ FULL ORIGINAL SONG DATA (ONLY FIXED STRUCTURE & PATHS) */
const songs = {
  telugu: {
    happy: [
      {
        name: "Butta Bomma💃",
        src: "songs/butta_bomma.mp3",
        genre: "romantic",
        lyrics: [
          { time: 0, text: "Butta bomma butta bomma..." },
          { time: 5, text: "Nee kosame nenu..." }
        ]
      },
      {
        name: "Ee Hridayam💘",
        src: "songs/ee_hridayam.mp3",
        genre: "romantic",
        lyrics: [
          { time: 0, text: "Ee hrudayam kariginchi vellake..." }
        ]
      },
      {
        name: "Pretty Baby🐥",
        src: "songs/pretty_baby.mp3",
        genre: "romantic",
        lyrics: [
          { time: 0, text: "Pretty Baby Hey Pretty Baby..." }
        ]
      },
      {
        name: "Samajavaragamana🎼",
        src: "songs/samajavaragamana.mp3",
        genre: "melody",
        lyrics: [
          { time: 0, text: "Samajavaragamana..." }
        ]
      }
    ],

    sad: [
      {
        name: "Karige Loga🫠",
        src: "songs/karige_loga.mp3",
        genre: "sad",
        lyrics: [
          { time: 0, text: "Karige loga e kshanam..." }
        ]
      },
      {
        name: "Life of Ram😔",
        src: "songs/life_of_ram.mp3",
        genre: "sad",
        lyrics: [
          { time: 0, text: "Yedhallo oka mounam..." }
        ]
      }
    ],

    angry: [
      {
        name: "Daakko Daakko🐯",
        src: "songs/daakko_daakko.mp3",
        genre: "mass",
        lyrics: [
          { time: 0, text: "Daakko daakko meka..." }
        ]
      },
      {
        name: "Fear😨",
        src: "songs/fear.mp3",
        genre: "mass",
        lyrics: [
          { time: 0, text: "Aakattukundhi santhram..." }
        ]
      },
      {
        name: "Ragile Ragile🔥",
        src: "songs/ragile.mp3",
        genre: "mass",
        lyrics: [
          { time: 0, text: "Mrutyuvu jadisela..." }
        ]
      }
    ],

    relaxed: [
      {
        name: "Enduko Emo💗",
        src: "songs/enduko_emo.mp3",
        genre: "peace",
        lyrics: [
          { time: 0, text: "Enduko emo ee vela..." }
        ]
      },
      {
        name: "Vintunnava🙉",
        src: "songs/vintunnava.mp3",
        genre: "peace",
        lyrics: [
          { time: 0, text: "Palukulu nee pere..." }
        ]
      },
      {
        name: "Violin🎻",
        src: "songs/violin.mp3",
        genre: "peace",
        lyrics: [
          { time: 0, text: "Instrumental..." }
        ]
      }
    ]
  },

  hindi: {
    happy: [
      {
        name: "Kesariya🌚",
        src: "songs/kesariya.mp3",
        genre: "romantic",
        lyrics: [
          { time: 0, text: "Kesariya tera ishq..." }
        ]
      },
      {
        name: "Tere Vaste💃🕺",
        src: "songs/tere_vaste.mp3",
        genre: "happy",
        lyrics: [
          { time: 0, text: "Tere vaaste falak se..." }
        ]
      }
    ],

    sad: [
      {
        name: "Channa Mereya😣",
        src: "songs/channa_mereya.mp3",
        genre: "sad",
        lyrics: [
          { time: 0, text: "Channa mereya..." }
        ]
      },
      {
        name: "Finding Her🧚‍♀️",
        src: "songs/finding_her.mp3",
        genre: "sad",
        lyrics: [
          { time: 0, text: "Jaana tu aata nahin..." }
        ]
      }
    ],

    angry: [
      {
        name: "Malang🎵",
        src: "songs/malang.mp3",
        genre: "mass",
        lyrics: [
          { time: 0, text: "Malang malang..." }
        ]
      }
    ],

    relaxed: [
      {
        name: "Raabta💆‍♀️",
        src: "songs/raabta.mp3",
        genre: "peace",
        lyrics: [
          { time: 0, text: "Raabta kehte hain..." }
        ]
      }
    ]
  },

  english: {
    happy: [
      {
        name: "Perfect✨",
        src: "songs/perfect.mp3",
        genre: "romantic",
        lyrics: [
          { time: 0, text: "Baby I'm dancing in the dark..." }
        ]
      },
      {
        name: "Wanna Be Yours🎀",
        src: "songs/wanna_be.mp3",
        genre: "happy",
        lyrics: [
          { time: 0, text: "I wanna be your vacuum cleaner..." }
        ]
      }
    ],

    sad: [
      {
        name: "Love Me Like You Do🫶",
        src: "songs/love_me.mp3",
        genre: "sad",
        lyrics: [
          { time: 0, text: "You're the light..." }
        ]
      }
    ],

    angry: [
      {
        name: "Believer⚡",
        src: "songs/believer.mp3",
        genre: "mass",
        lyrics: [
          { time: 0, text: "You made me a believer..." }
        ]
      }
    ],

    relaxed: [
      {
        name: "Dandelions🌼",
        src: "songs/dandelions.mp3",
        genre: "peace",
        lyrics: [
          { time: 0, text: "Maybe it's the way you say my name..." }
        ]
      }
    ]
  }
};

/* ===== FUNCTIONS ===== */

function selectMood(mood) {
  currentMood = mood;
  currentIndex = 0;

  document.body.classList.remove("happy","sad","angry","relaxed");
  document.body.classList.add(mood);

  loadSongList();
  playSong();
}

function loadSongList() {
  songList.innerHTML = "";
  const genre = document.getElementById("genre").value;

  let list = songs[currentLanguage][currentMood] || [];
  if (genre !== "all") {
    list = list.filter(s => s.genre === genre);
  }

  list.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => {
      currentIndex = i;
      playSong();
    };
    songList.appendChild(li);
  });
}

function playSong() {
  const song = songs[currentLanguage][currentMood][currentIndex];
  if (!song) return;

  audio.src = song.src;
  songName.textContent = song.name;
  lyricsBox.textContent = "🎵 Playing...";
  audio.play();
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}
function nextSong() {
  currentIndex = (currentIndex + 1) % songs[currentLanguage][currentMood].length;
  playSong();
}
function prevSong() {
  currentIndex =
    (currentIndex - 1 + songs[currentLanguage][currentMood].length) %
    songs[currentLanguage][currentMood].length;
  playSong();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  const song = songs[currentLanguage][currentMood][currentIndex];
  if (!song || !song.lyrics) return;

  for (let i = song.lyrics.length - 1; i >= 0; i--) {
    if (audio.currentTime >= song.lyrics[i].time) {
      lyricsBox.textContent = song.lyrics[i].text;
      break;
    }
  }
});

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

volume.oninput = () => {
  audio.volume = volume.value;
};

function changeLanguage() {
  currentLanguage = languageSelect.value;
  songList.innerHTML = "";
  songName.textContent = "Select a mood";
  lyricsBox.textContent = "Select a song to view lyrics";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}