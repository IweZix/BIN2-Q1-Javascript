/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { clearPage } from '../../utils/render';
import image from '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';

const QuotesCarrousel = () => {
  clearPage();
  afficherCitation();
};

async function afficherCitation() {
  const main = document.querySelector('main');
  const response = await fetch('/api/quotes');

  if (!response.ok) {
    main.innerHTML = `
        <div class="alert alert-danger" role="alert">
          An error occurred when fetching the questions
        </div>
        `;
  }

  const quotes = await response.json();

  let index = 0;
  let max = quotes.length;
  let affichage = false;
  let timer = localStorage.getItem('timer') ? localStorage.getItem('timer') : 5000;
  
  // toutes les 5000ms, on change la citation dans le main, si il n'y en a pas encore on affiche la première citation
  let intervalId = setInterval(() => {
    // si affichage == false
    const updateQuote = async () => {
      localStorage.setItem('intervalId', intervalId);
      if (affichage === false) {
        main.innerHTML = `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <p class="card-text">${quotes[index].thinker}</p>
            <p class="card-text">${quotes[index].quote}</p>
            <img src="${quotes[index].image}" class="card-img-top" alt="...">
          </div>
        </div>
        `;
        affichage = true
      } else {
        index += 1;
        if (index === max) {
          main.innerHTML = `
            <p>Veillez patienter, recharger la page</p>
          `;
          clearInterval(intervalId);
        } else {
          let imageExist = await imageExists(quotes[index].image);
          let imageUrl = imageExist ? quotes[index].image : image;
  
          main.innerHTML = `
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <p class="card-text">${quotes[index].thinker}</p>
              <p class="card-text">${quotes[index].quote}</p>
              <img src="${imageUrl}" class="card-img-top" alt="...">
            </div>
          </div>
          `;
        }
      }
    }
    updateQuote();
  }, timer);
}

async function imageExists(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD', 
      mode: 'no-cors' 
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default QuotesCarrousel;
