/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const ManagePage = () => {
    clearPage();
    renderQuestion();
};

async function renderQuestion() {
    const main = document.querySelector('main');
    const response = await fetch('/api/queries');

    if (!response.ok) {
        main.innerHTML = `
        <div class="alert alert-danger" role="alert">
          An error occurred when fetching the questions
        </div>
        `;
    }

    const questions = await response.json();

    const html = `
    <div class="container">
        <h1>Manage queries Page</h1>
        <div class="" id="row">
        </div>
    </div>
    `;

    main.innerHTML = html; // Move this line up to create the 'row' element

    const row = document.querySelector('#row');

    questions.forEach((question) => {
        const questionHtml = `
        <div class="col-12 col-md-6 col-lg-4">
            <p>${question.subject}</p>
            <div class="status-dropdown">
                <label for="status-${question.id}">Status:</label>
                <select id="status-${question.id}" class="status-select" onchange="updateStatus(${question.id}, this.value)">
                    <option value="requested" ${question.status === 'requested' ? 'selected' : ''}>Requested</option>
                    <option value="accepted" ${question.status === 'accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="refused" ${question.status === 'refused' ? 'selected' : ''}>Refused</option>
                    <option value="done" ${question.status === 'done' ? 'selected' : ''}>Done</option>
                </select>
            </div>
        </div>
        `;
        row.innerHTML += questionHtml;
    });
}

export default ManagePage;
