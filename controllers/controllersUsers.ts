export { }

const fs = require("fs");
const jwt = require('jwt-simple');

import { User} from '../models/users'
import { secret } from './secrets/secret';

export const readAllUsers = () => {
    const allUsers = fs.readFileSync("./models/data/user.json");
    return JSON.parse(allUsers);
}

export function usersRegister(req, res) {
    try {

        const allUsers = readAllUsers();
        const isFound = allUsers.some(elem => (elem.email === req.body.email) || elem.username === req.body.username)
        if (!isFound) {
            const user = new User(req.body.username, req.body.email, req.body.password, [], [])
            allUsers.push(user)
            fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
            res.send({ ok: `Hi ${req.body.username}, now you can create surveys after login`, allUsers: allUsers });
        } else {
            const hasUsername = allUsers.some(elem => (elem.username === req.body.username))

            if (!hasUsername) {
                const foundUser = allUsers.find(elem => (elem.email === req.body.email))
                foundUser.username = req.body.username;
                foundUser.surveys = [];
                fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
                res.send({ ok: `Hi ${req.body.username}, now you can create surveys after login`, allUsers: allUsers });
            } else {
                throw new Error("this is user is on database")
            }

        }
    } catch (e) {

        res.status(500).send({ error: `${e}` });
    }
}

export function loginUser(req, res) {


    try {
        const { email, password } = (req.body)

        const allUsers = readAllUsers();

        const isUserExist = allUsers.some(elem => (elem.email === email))
        const isPasswordOk = allUsers.some(elem => (elem.password === password))
        
        if (isUserExist && isPasswordOk) {

            const userLogin = allUsers.find(elem => (elem.email === email) && (elem.password === password))

            if(userLogin.username){

                const tokenUser = jwt.encode(userLogin,secret)

                res.cookie('cookieName', tokenUser, { maxAge: 30000000, httpOnly: true });
                res.send({ ok: `Welcome ${userLogin.username}`});
            }else{
                throw new Error("You're on the database but without username, please go to register")
            }
        } else if (isUserExist){
            throw new Error("Is incorrect your email or password Try Again")
        } else{
            throw new Error("Go Register, no user")
        }

    } catch (e) {
        res.status(500).send({ error: `${e.message}` });
    }

};



export function endUserLogin(req, res) {
    try {
        const { email, password } = (req.body)
        const { id } = req.params

        const allUsers = readAllUsers();
        const allSurveys = JSON.parse(fs.readFileSync("./models/data/survey.json"));

        const isUserOk = allUsers.some(elem => (elem.email === email) && (elem.password === password))
        const isEmailOrPasswordWrong = allUsers.some(elem => (elem.email === email) || (elem.password === password))

       

        const tokenUser = jwt.encode(email,secret)


        res.cookie('cookieName', tokenUser, { maxAge: 30000000, httpOnly: true });



        if (isUserOk) {
            const isAdminSurvey = allSurveys.find(survey => (survey.id === id) && (email === survey.admin))
            if (isAdminSurvey) {
                throw new Error("You cannot vote your own survey")
            } else {
                res.send({ ok: `Welcome back ${email}, thank you for voting` });
            }
        } else if (isEmailOrPasswordWrong) {
            throw new Error("Something is wrong, your email or password")

        } else {

            const user = new User(null, req.body.email, req.body.password, null, [])
            allUsers.push(user)
            fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
            res.send({ ok: `Hello ${email}, thank you for voting`, allUsers: allUsers });
        }
    } catch (e) {
        res.status(500).send({ error: `${e.message}` });
    }
}

 


export function getCookie(req, res) {
    try {
        
        const { cookieName } = req.cookies
        if (!cookieName) throw new Error("Nothing is on the cookie")
        const decoded = jwt.decode(cookieName, secret);
        res.send(decoded);

    } catch (e) {
        res.status(500).send({ error: `${e.message}` });
    }
};


export function getSurveys(req, res) {
    try {
        const { email } = req.params
        const allUsers = readAllUsers();
        if (allUsers.length !== 0) {
            const find = allUsers.find(user => user.email === email)

            res.send(find.surveys);
        }
    } catch (e) {
        res.status(500).send({ error: `${e}` });
    }
}

export function scoreAdd(req, res) {
    try {
        const { id } = req.params
        const { cookieName } = req.cookies
        const email = JSON.parse(cookieName)

        const allUsers = readAllUsers();
        const allSurveys = JSON.parse(fs.readFileSync("./models/data/survey.json"));

        //admin

        const admin = allSurveys.find(survey => survey.id === id).admin
        const findAdmin = allUsers.find(user => user.email === admin)
        const findSurveyQuestions = findAdmin.surveys.find(survey => survey.id === id).questions
        const findSurveyinSurveyJSON = allSurveys.find(survey => survey.id === id).question
        for (let i = 0; i < findSurveyQuestions.length; i++) {
            findSurveyQuestions[i].voters.push({ ...req.body[i], 'email': email })
            findSurveyinSurveyJSON[i].voters.push({ ...req.body[i], 'email': email })
        }

        //voter
        const findVoter = allUsers.find(voter => voter.email === email)
        const findSurvey = allSurveys.find(survey => survey.id === id)

        let responds = []

        findSurvey.question.forEach((survey, index) => {
            responds.push({ 'title': survey.title, ...req.body[index] })
        });


        
        const newResponse = {
            'id': id,
            'title': findSurvey.title,
            'admin': findSurvey.admin,
            'questions': responds
        }

        findVoter.answersSurveys.push(newResponse)

        fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
        fs.writeFileSync("./models/data/survey.json", JSON.stringify(allSurveys));

        res.send({ ok: "Answer Sended" });


    } catch (e) {
        res.status(500).send({ error: `${e}` });
    }
}

