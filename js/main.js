const elMovieList = document.querySelector(".movie-list");
const elMovieTemplate = document.querySelector("#movie__template").content;
const elInputName = document.querySelector(".form-name");
const elSubmitBtn = document.querySelector(".submit-btn");
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
const elFirstPage = document.querySelector(".firstPage");
const elAllPages = document.querySelector(".allPages");

page = 1;
nameOfMovie = "shazam"
elSubmitBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameOfMovie = elInputName.value;
  fetchMovies();
})

function renderMovies(arr, element) {
  element.innerHTML = null;

  const movieFragment = document.createDocumentFragment();

  arr.forEach((row) => {
    const movieTemplate = elMovieTemplate.cloneNode(true);

    movieTemplate.querySelector(".movie-img").src = row.Poster;
    movieTemplate.querySelector(".movie-img").alt = row.Title + " cover";
    movieTemplate.querySelector(".movie-img").onError = (evt) => {
      evt.target.src = "https://via.placeholder.com/200x200"
    }
    movieTemplate.querySelector(".movie-name").textContent = row.Title;
    movieTemplate.querySelector(".movie-time").textContent = textContent = "Year: " + row.Year;
    movieTemplate.querySelector(".movie__imdbId").textContent = textContent = "imdbID: " + row.imdbID;

    movieFragment.appendChild(movieTemplate);
  });
  element.appendChild(movieFragment);
}


async function fetchMovies() {
  try {
    elMovieList.innerHTML = "<img src='./images/Loading.svg' alt = 'spinner' />";

    const response = await fetch(
      "http://www.omdbapi.com/?apikey=d83224c7&s=" + nameOfMovie + "&page=" + page
    );

    const data = await response.json();
    if (data.Search.length) {
      renderMovies(data.Search, elMovieList)
    };

    if (page <= 1) {
      elPrevBtn.disabled = true;
    } else {
      elPrevBtn.disabled = false;
    };

    const lastPage = Math.ceil(data.totalResults / 10);
    if (page === lastPage) {
      elNextBtn.disabled = true;
    } else {
      elNextBtn.disabled = false;
    };
    elAllPages.textContent = Math.ceil(data.totalResults / 10);

  } catch (error) {
    console.error("Error", error);
  }
} 

elNextBtn.addEventListener("click", () => {
  page++;
  elFirstPage.textContent = page;
  fetchMovies();
})
elPrevBtn.addEventListener("click", () => {
  page--;
  elFirstPage.textContent = page;
  fetchMovies();
})
fetchMovies();







// Poster: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
// Title: "Spider-Man"
// Type: "movie"
// Year: "2002"
// imdbID: "tt0145487"