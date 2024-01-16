import tab from '../../utils/places';

const listener = () => {
  const main = document.querySelector('main');
  let mainHTML = '';
  tab.forEach((place) => {
    mainHTML += `<div class="place" style="text-align: center;">
      <button class="btn btn-primary" id="${place.id}">${place.name}</button>
    </div>
    <br>`;
  });
  main.className = 'home';
  main.innerHTML = mainHTML;

};

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';
  listener();
};

export default HomePage;
