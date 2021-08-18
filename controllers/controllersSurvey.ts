export { }

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


import { Survey} from '../models/survey'


const readAllSurveys = () => {
    const allSurveys = fs.readFileSync("./models/data/survey.json");
    return JSON.parse(allSurveys);
}

export function getUniqueId(req, res) {
    const id = uuidv4()
    res.send({ id: id })
}

export function getPreviousSurvey(req, res) {

    const { id } = req.params
    const allSurveys = readAllSurveys();
    const survey = allSurveys.find(survey => survey.id === id)
    res.send(survey)
}


export function addSurveys(req, res) {
    try {
        const allSurveys = readAllSurveys();

        const survey = new Survey(req.body.id, req.body.title, req.body.email, req.body.questions)
        allSurveys.push(survey)
        fs.writeFileSync("./models/data/survey.json", JSON.stringify(allSurveys));

        const allUsers = JSON.parse(fs.readFileSync("./models/data/user.json"));

        const surveyUser = allUsers.find(user => user.email === req.body.email)

        surveyUser.surveys.push(req.body)

        fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));

        res.send({ ok: "Surveys Created" });

    } catch (e) {
        res.status(500).send({ error: `${e}` });
    }
}


export function deleteSurveys(req, res) {
    try {
        const { id, email } = req.params
        let allSurveys = readAllSurveys();
        let allUsers = JSON.parse(fs.readFileSync("./models/data/user.json"));

        const user = allUsers.filter(user => user.email === email)
        user[0].surveys = user[0].surveys.filter(survey => survey.id !== id)
        fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));


        //eliminar de json surveys
        allSurveys = allSurveys.filter(survey => survey.id !== id)
        fs.writeFileSync("./models/data/survey.json", JSON.stringify(allSurveys));

        let allUsersUser = JSON.parse(fs.readFileSync("./models/data/user.json"));
        const find = allUsersUser.find(user => user.email === email)
        res.send(find.surveys);



    } catch (e) {
        res.status(500).send({ error: `${e}` });
    }
}

export function getAnswer(req, res) {

    const { id, email } = req.params
    const allSurveys = readAllSurveys();
    const findSurvey = allSurveys.find(survey => survey.id === id)
    const isAdminCreateSurvey = findSurvey.question[0].voters.some(voter=>voter.email === email)
    res.send(isAdminCreateSurvey)
}
