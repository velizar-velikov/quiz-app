import { questions } from "./create.js";

let currentQuestion = 0;
let correctAnswersCount = 0;

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', changeQuestion);

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const questionEl = document.getElementById('question');
const quizContainer = document.getElementById('quiz-container');

loadQuestion();

function changeQuestion() {
    if (currentQuestion >= questions.length - 1) {
        getScore();
        showScore();
        return;
    }

    if (currentQuestion <= questions.length - 1) {
        const optionInputs = [
            document.getElementById('a'),
            document.getElementById('b'),
            document.getElementById('c'),
            document.getElementById('d')
        ];

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
            loadQuestion();
        }
    }
}

function loadQuestion() {

    questionEl.textContent = questions[currentQuestion].question;
    a_text.textContent = questions[currentQuestion].options.a;
    b_text.textContent = questions[currentQuestion].options.b;
    c_text.textContent = questions[currentQuestion].options.c;
    d_text.textContent = questions[currentQuestion].options.d;
}

function getScore() {
    return correctAnswersCount / questions.length * 100;
}

function showScore() {
    quizContainer.style.display = 'none';
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.style.display = 'flex';

    const passEl = document.getElementById('pass');
    const score = document.getElementById('score');

    if (getScore() >= 70) {
        passEl.textContent = 'Congratulations! You passed!';
        score.classList.add('correct');
    } else {
        passEl.textContent = 'You failed :(';
        score.textContent = `${correctAnswersCount} / ${questions.length}`;
        score.classList.add('incorrect');
    }

}