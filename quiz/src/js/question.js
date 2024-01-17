export class Question {
    constructor(question, a, b, c, d, answer = 'a') {
        this.question = question;
        this.options = { a, b, c, d };
        this.answer = answer;
    }
}