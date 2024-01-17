/* eslint-disable no-restricted-globals */
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const ManageCarousel = () => {
    const id = localStorage.getItem('intervalId');
    if (id) clearInterval(id);
    clearPage();
    formulaire();
};

function formulaire() {
    const main = document.querySelector('main');
    main.innerHTML = `
    <form id="form">
        <div class="form-group">
            <label for="Timer">Timer</label>
            <input type="text" class="form-control" id="timer" placeholder="Ex: 5000">
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const timer = document.getElementById('timer').value;

        if (timer < 0 || timer === '' || isNaN(timer)) {
            alert('Le timer doit être un nombre positif');
            window.location.reload();
        } else {
            localStorage.setItem('timer', timer);
            Navigate('/quotecarousel');
        }
    });
}


  
export default ManageCarousel;
  