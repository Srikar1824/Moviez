const API_KEY = "YOUR_API_KEY";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const container = document.getElementById("movies-container");

async function fetchMovies() {
  // loading
  container.innerHTML = "<h2>Loading...</h2>";

  try {
    const response = await fetch(URL);   // wait for API
    const data = await response.json();  // convert to JSON

    const movies = data.results;

    container.innerHTML = ""; // clear loading

    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];

      const div = document.createElement("div");
      div.classList.add("movie");

      div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      `;

      container.appendChild(div);
    }

  } catch (error) {
    container.innerHTML = "<h2>Error loading movies</h2>";
  }
}

fetchMovies();