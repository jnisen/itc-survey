export { };

const fs = require("fs");

export class User {
    username: string;
    email: string;
    password: string;
    surveys: Array<string>;
    answersSurveys: Array<string>;

    constructor(username, email, password, surveys, answersSurveys) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.surveys = surveys;
        this.answersSurveys = answersSurveys;
    }

}
