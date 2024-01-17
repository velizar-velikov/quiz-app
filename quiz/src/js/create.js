import { data } from './data.js';
import { Question } from "./question.js";

function createQuestions(data) {
    const questions = [];
    data.forEach(info => {
        const question = new Question(...info);
        questions.push(question);
    })
    return questions;
}

export const questions = createQuestions(data);