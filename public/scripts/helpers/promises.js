//register.js
function addRegisterPromise(newUser) {
    return new Promise((resolve, reject) => {
        fetch('/user/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { alert(user.error) })
            }
        })
    })
}


//survey.js
function addSurveysPromise(newSurvey) {
    return new Promise((resolve, reject) => {
        fetch('/survey/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSurvey)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(survey => {
                    resolve(survey)
                });
            } else {
                return res.json().then(survey => {
                    alert(survey.error)
                })
            }
        })
    })
}

//userSurvey.js
function addScorePromise(scoreList, idSurvey) {
    return new Promise((resolve, reject) => {
        fetch(`/user/add/${idSurvey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scoreList)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(survey => {
                    resolve(survey);
                });
            } else {
                return res.json().then(survey => {
                    alert(survey.survey)
                })
            }
        }).catch(error => console.error('Error: ', error));
    })
}


//endLoginUser.js
function enterEndUserLogIn(newUser, idSurvey) {
    return new Promise((resolve, reject) => {
        fetch(`/user/endUserLogin/${idSurvey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { alert(user.error) })
            }
        })
    })
}


//login.js
function enterLoginPromise(userLogin) {
    return new Promise((resolve, reject) => {
        fetch('/user/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { alert(user.error) })
            }
        })
    })
}

