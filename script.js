const API_KEY = "4d1b1662d761ccb3158e0623eaa43313";
const URL = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1";

const container = document.getElementById("movies-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let allMovies = [];

async function fetchMovies() {
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(URL);
    const data = await res.json();

    allMovies = data.results;
    renderMovies(allMovies);

  } catch (err) {
    container.innerHTML = "Error loading movies";
  }
}

function renderMovies(movies) {
  container.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];

    const card = document.createElement("div");
    card.className = "movie";

    card.innerHTML =
      '<img src="https://image.tmdb.org/t/p/w500' + m.poster_path + '">' +
      "<h3>" + m.title + "</h3>" +
      "<p>⭐ " + m.vote_average + "</p>";

    container.appendChild(card);
  }
}

function applyFilters() {
  let result = allMovies;

  // search
  const searchValue = searchInput.value.toLowerCase();
  result = result.filter(function (m) {
    return m.title.toLowerCase().includes(searchValue);
  });

  // filter
  const ratingValue = filterSelect.value;
  if (ratingValue !== "all") {
    result = result.filter(function (m) {
      return m.vote_average >= ratingValue;
    });
  }

  // sort
  const sortValue = sortSelect.value;

  if (sortValue === "rating") {
    result = result.sort(function (a, b) {
      return b.vote_average - a.vote_average;
    });
  } else if (sortValue === "date") {
    result = result.sort(function (a, b) {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  }

  renderMovies(result);
}

// events
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

fetchMovies();
