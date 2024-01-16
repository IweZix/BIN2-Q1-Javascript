/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import questions from './utils/questions';

const main = document.querySelector('main');
let score = 0;

function choisirQuestion() {
    const question = questions[Math.floor(Math.random() * questions.length)];
    return question;
}

function afficherQuestion() {
    const question1 = choisirQuestion();
    let question2;
    let question3;
    do {
        question2 = choisirQuestion();
        question3 = choisirQuestion();
    } while (question1 === question2 || question1 === question3 || question2 === question3);

    const html = `
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Question 1</h1>
                <p>${question1.question}</p>
                <form id="form1">
                    <input type="radio" id="q1a1" name="q1" value="q1a1">
                    <label for="q1a1"> ${question1.answers[0].text} </label><br>
                    <input type="radio" id="q1a2" name="q1" value="q1a2">
                    <label for="q1a2"> ${question1.answers[1].text} </label><br>
                    <input type="radio" id="q1a3" name="q1" value="q1a3">
                    <label for="q1a3"> ${question1.answers[2].text} </label>
                </form>
            </div>
            <br>
            <div class="col-12">
                <h1>Question 2</h1>
                <p>${question2.question}</p>
                <form id="form2">
                    <input type="radio" id="q2a1" name="q2" value="q2a1">
                    <label for="q2a1"> ${question2.answers[0].text} </label><br>
                    <input type="radio" id="q2a2" name="q2" value="q2a2">
                    <label for="q2a2"> ${question2.answers[1].text} </label><br>
                    <input type="radio" id="q2a3" name="q2" value="q2a3">
                    <label for="q2a3"> ${question2.answers[2].text} </label>
                </form>
            </div>
            <br>
            <div class="col-12">
                <h1>Question 3</h1>
                <p>${question3.question}</p>
                <form id="form3">
                    <input type="radio" id="q3a1" name="q3" value="q3a1">
                    <label for="q3a1"> ${question3.answers[0].text} </label><br>
                    <input type="radio" id="q3a2" name="q3" value="q3a2">
                    <label for="q3a2"> ${question3.answers[1].text} </label><br>
                    <input type="radio" id="q3a3" name="q3" value="q3a3">
                    <label for="q3a3"> ${question3.answers[2].text} </label>
                </form>
            </div>
        </div>
        <br>
        <button type="button" class="btn btn-primary" id="valider">Valider</button>
    </div>
    `;
    main.innerHTML = html;
    const btn = document.querySelector('#valider');
    btn.addEventListener('click', validerReponses);
}

function validerReponses() {
    let scoreQuestion1 = 0;
    let scoreQuestion2 = 0;
    let scoreQuestion3 = 0;

    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');

    // Vérifier les réponses de la question 1
    const selectedResponse1 = document.querySelector('input[name="q1"]:checked');
    if (selectedResponse1 && questions[0].answers[selectedResponse1.value.slice(-1) - 1].isCorrect) {
        scoreQuestion1 = 1;
    }

    // Vérifier les réponses de la question 2
    const selectedResponse2 = document.querySelector('input[name="q2"]:checked');
    if (selectedResponse2 && questions[1].answers[selectedResponse2.value.slice(-1) - 1].isCorrect) {
        scoreQuestion2 = 1;
    }

    // Vérifier les réponses de la question 3
    const selectedResponse3 = document.querySelector('input[name="q3"]:checked');
    if (selectedResponse3 && questions[2].answers[selectedResponse3.value.slice(-1) - 1].isCorrect) {
        scoreQuestion3 = 1;
    }

    // Calculer le score total
    score = scoreQuestion1 + scoreQuestion2 + scoreQuestion3;

    // Vous pouvez ajouter d'autres actions ici, par exemple, afficher le score à l'utilisateur.
    const html = `
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Score</h1>
                <p>${score}</p>
            </div>
        </div>
        <button type="button" class="btn btn-primary" id="rejouer">Rejouer</button>
    </div>
    `;
    
    main.innerHTML = html;

    const replay = document.querySelector('#rejouer');
    replay.addEventListener('click', () => {
        window.location.reload();
    });
}

const App = () => {
    main.innerHTML = '';
    afficherQuestion();
}

App();


