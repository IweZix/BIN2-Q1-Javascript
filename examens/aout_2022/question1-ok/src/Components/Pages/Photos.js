import tab from '../../utils/places';
import { clearPage } from '../../utils/render';

const Photos = () => {
  clearPage();
  carousel();
};

function carousel() {
  const main = document.querySelector('main');
  let id = 2;

  function render() {
      main.innerHTML = `
        <div style="text-align: center;">
          <img src="${tab[id].image}" alt="${tab[id].name}" style="width:75%">
          <h3>${tab[id].name}</h3>
          <button class="btn btn-primary" id="previous">Précédent</button>
          <button class="btn btn-primary" id="next">Suivant</button>
        </div>
      `;

  }

  render();

  main.addEventListener('click', (e) => {
    if (e.target.id === 'previous') {
      e.preventDefault();
      id = (id === 0) ? tab.length-1 : id - 1;
      render();
    } else if (e.target.id === 'next') {
      e.preventDefault();
      id = (id === 4) ? 0 : id + 1;
      render();
    }
  });
}

export default Photos;
