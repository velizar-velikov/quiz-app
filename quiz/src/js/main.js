import { questions } from "./create.js";

let currentQuestion = 0;
let correctAnswersCount = 0;

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', changeQuestion);

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const texts = [a_text, b_text, c_text, d_text];

const optionInputs = [
    document.getElementById('a'),
    document.getElementById('b'),
    document.getElementById('c'),
    document.getElementById('d')
];
const questionEl = document.getElementById('question');
const quizContainer = document.getElementById('quiz-container');

const scoreContainer = document.getElementById('score-container');
const passEl = document.getElementById('pass');
const score = document.getElementById('score');

loadQuestion();

function changeQuestion() {

    if (currentQuestion <= questions.length - 1) {

        if (optionInputs.some(option => option.checked === true)) {
            const answer = questions[currentQuestion].answer;
            const answerInput = document.getElementById(`${answer}`);

            if (answerInput.checked) {
                if (currentQuestion < questions.length - 1) {
                    correctAnswersCount++;
                } else if (currentQuestion == questions.length - 1) {
                    correctAnswersCount++;
                    currentQuestion++;
                }
            }
            if (currentQuestion <= questions.length - 1) {
                currentQuestion++;
            }
            optionInputs.find(option => option.checked === true).checked = false;

            if (currentQuestion > questions.length - 1) {
                getScore();
                showScore();
                return;
            }
            loadQuestion();
        }
    }
}

function loadQuestion() {

    questionEl.textContent = questions[currentQuestion].question;
    texts.forEach(text => {
        text.textContent = questions[currentQuestion].options[`${text.getAttribute('for')}`];
    })
}

function getScore() {
    return correctAnswersCount / questions.length * 100;
}

function showScore() {
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'flex';

    if (getScore() >= 70) {
        passEl.textContent = 'Congratulations! You passed!';
        score.classList.add('correct');
    } else {
        passEl.textContent = 'You failed :(';
        score.classList.add('incorrect');
    }
    score.textContent = `${correctAnswersCount} / ${questions.length}`;
    addReloadButton();

    function addReloadButton() {
        const reloadBtn = document.createElement('button');
        reloadBtn.setAttribute('class', 'submit-btn');
        reloadBtn.textContent = 'Reload quiz';
        reloadBtn.addEventListener('click', () => {
            location.reload();
        })
        scoreContainer.appendChild(reloadBtn);
    }
}