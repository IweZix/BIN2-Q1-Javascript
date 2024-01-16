/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();
  listener();
  recommended();
};

/**
 * Render the Home Page with the list of places
 */
async function listener() {
  const main = document.querySelector('main');
  const response = await fetch('https://places-exam-api.azurewebsites.net/places');

  if (!response.ok) {
    main.innerHTML = '<p>Something went wrong</p>';
  } else {
    const data = await response.json();
    let html = `
    <section class="text-center">
      <h1>Home</h1>
      <ul>
      </ul>
    `;
    data.forEach((place) => {
      html += `
        <li>
          <p>${place.name}</p>
        </li>
      `;
    });
    html += `</section>`;
    main.innerHTML = html;
  }
}

/**
 * Render the Home Page with the recommended place
 */
async function recommended() {
  const main = document.querySelector('main');
  const response = await fetch('https://places-exam-api.azurewebsites.net/recommended');

  if (!response.ok) {
    main.innerHTML = '<p>Something went wrong</p>';
  } else {
    const data = await response.json();
    let html = `
    <section class="text-center">
      <h1>Recommended</h1>
      <p>${data.name}</p>
    `;
    html += `</section>`;
    main.innerHTML += html;
  }
}

export default HomePage;
