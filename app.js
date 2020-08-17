const form = document.querySelector("#form");
const search = document.querySelector("#search");
const result = document.querySelector("#result");
const lyricsResult = document.querySelector("#lyricsResult");
const submitBaton = document.querySelector("#submitBaton");

const apiURL = "https://api.lyrics.ovh";

// Search by Songs or Artist

const searchSongs = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);

  showData(data);
};

// Search Results (10)

const showData = (data) => {
  result.innerHTML = `

      ${data.data
        .slice(0, 10)
        .map(
          (song) => `
          <div  class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center" >
              <button class="btn btn-success"data-artist="${song.artist.name}" data-songTitle="${song.title}" >Get Lyrics</button>
          </div>
         
          </div>
          `
        )
        .join("")}
        
        `;
  // https://cdn-preview-9.deezer.com/stream/c-9932954858edfb53714ab5d1d9677b28-6.mp3
  // https://cdn-preview-4.deezer.com/stream/c-4aec008ea277bade72bb31f331301b0c-7.mp3
  // http://cdn-preview-4.deezer.com/stream/c-4aec008ea277bade72bb31f331301b0c-7.mp3
};

// Get Lyrics button click

result.addEventListener("click", (e) => {
  const clicked = e.target;

  if (clicked.tagName === "BUTTON") {
    const artist = clicked.getAttribute("data-artist");
    const songTitle = clicked.getAttribute("data-songTitle");

    getLyrics(artist, songTitle);
  }
});

// Get lyrics for song

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  console.log(res);
  const data = await res.json();

  const lyrics = data.lyrics;

  if (lyrics === undefined) {
    lyricsResult.innerHTML = `
  
    <h1 class="mb-4 font-weight-bold text-danger"> Opp! </h1>
  
  
  
      <h1 class="text-info mb-4 font-weight-bold">This Lyrics is unavailable</h1>
  
    `;

    result.innerHTML = "";
  } else {
    lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    console.log(lyrics);

    lyricsResult.innerHTML = `
  
    <h1 class="text-success mb-4 font-weight-bold"> ${songTitle} - ${artist}</h1>
      ${lyrics};
  
  
      <h1 class="text-success mb-4 font-weight-bold">Happy Singing</h1>
  
    `;

    result.innerHTML = "";
  }
}

submitBaton.addEventListener("click", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
