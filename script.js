const API_KEY = "6476163418146f2a54bb24346ddb82fe";
const URL = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;

const container = document.getElementById("movies-container");

async function fetchMovies() {
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(URL);
    const data = await res.json();

    const movies = data.results;

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
  } catch (err) {
    container.innerHTML = "Error loading movies";
  }
}

fetchMovies();
