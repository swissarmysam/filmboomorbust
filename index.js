import Reveal from 'reveal.js';
import data from './data/films.json';

const deck = new Reveal({
  plugins: [],
});
deck.initialize();

// get elements
const filmsSection = document.querySelector('#films');
const megaMoneyEl = document.querySelector('#megaMoney');

/** Get JSON data */
for (const [key, val] of Object.entries(data)) {
  createHTML(key, val);
}

/** */
const htmlArr = [];
async function createHTML(key, val) {
  const html = `
  <section>
  <div class="films">
    <div class="best">
      <div class="posterContainer">
        <img src="http://image.tmdb.org/t/p/w500/${await getPoster(
          val.best.title
        )}">
        <div class="overlay">
          <div class="text">${val.best.plot}</div>
        </div>
      </div>
    </div>
    <div class="worst">
      <div class="posterContainer">
        <img src="http://image.tmdb.org/t/p/w500/${await getPoster(
          val.worst.title
        )}">
        <div class="overlay">
          <div class="text">${val.worst.plot}</div>
        </div>
      </div>
    </div>
    <div class="versus">
      <div class="yearContainer">
        <div class="year">${key}</div>
      </div>
    </div>
    <div class="filmDetails">
      <table>
        <tr>
          <td class="info">${val.best.title}</td>
          <td class="label">Title</td>
          <td class="info">${val.worst.title}</td>
        </tr>
        <tr>
          <td class="info">${val.best.genre}</td>
          <td class="label">Genres</td>
          <td class="info">${val.worst.genre}</td>
        </tr>
        <tr>
          <td class="info">${val.best.rating}</td>
          <td class="label">Age Certificate</td>
          <td class="info">${val.worst.rating}</td>
        </tr>
        <tr>
          <td class="info ${
            val.best.runTime > val.worst.runTime ? 'winner' : 'loser'
          }">${val.best.runTime}</td>
          <td class="label">Run Time</td>
          <td class="info ${
            val.best.runTime < val.worst.runTime ? 'winner' : 'loser'
          }">${val.worst.runTime}</td>
        </tr>
        <tr>
          <td class="info ${
            val.best.budget > val.worst.budget ? 'winner' : 'loser'
          }">USD$${val.best.budget}</td>
          <td class="label">Budget</td>
          <td class="info ${
            val.best.budget < val.worst.budget ? 'winner' : 'loser'
          }">USD$${val.worst.budget}</budget>
        </tr>
        <tr>
          <td class="info ${
            val.best.revenue - val.best.budget > 0 ? 'winner' : 'loser'
          }">USD$${val.best.revenue}</td>
          <td class="label">Revenue</td>
          <td class="info ${
            val.worst.revenue - val.worst.budget > 0 ? 'winner' : 'loser'
          }">USD$${val.worst.revenue}</td>
        </tr>
        <tr>
          <td class="info score ${
            val.best.score > val.worst.score ? 'winner' : 'loser'
          }">${(val.best.score * 10).toFixed(1)}</td>
          <td class="label">Viewer Rating</td>
          <td class="info score ${
            val.best.score < val.worst.score ? 'winner' : 'loser'
          }">${(val.worst.score * 10).toFixed(1)}</td>
        </tr>
      </table>
    </div>
  </div>
  </section>
  `;
  filmsSection.insertAdjacentHTML('beforeend', html);
}

async function getPoster(name) {
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=3353746b7b44a5d27c9c4ac3f27f3350&query=${name}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results[0].poster_path;
}
