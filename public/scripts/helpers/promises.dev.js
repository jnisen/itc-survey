"use strict";

//register.js
function addRegisterPromise(newUser) {
  return new Promise(function (resolve, reject) {
    fetch('/user/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(function (res) {
      if (res.status === 200 && res.ok) {
        return res.json().then(function (user) {
          resolve(user);
        });
      } else {
        return res.json().then(function (user) {
          alert(user.error);
        });
      }
    });
  });
} //survey.js


function addSurveysPromise(newSurvey) {
  return new Promise(function (resolve, reject) {
    fetch('/survey/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSurvey)
    }).then(function (res) {
      if (res.status === 200 && res.ok) {
        return res.json().then(function (survey) {
          resolve(survey);
        });
      } else {
        return res.json().then(function (survey) {
          alert(survey.error);
        });
      }
    });
  });
} //userSurvey.js


function addScorePromise(scoreList, idSurvey) {
  return new Promise(function (resolve, reject) {
    fetch("/user/add/".concat(idSurvey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreList)
    }).then(function (res) {
      if (res.status === 200 && res.ok) {
        return res.json().then(function (survey) {
          resolve(survey);
        });
      } else {
        return res.json().then(function (survey) {
          alert(survey.survey);
        });
      }
    })["catch"](function (error) {
      return console.error('Error: ', error);
    });
  });
} //endLoginUser.js


function enterEndUserLogIn(newUser, idSurvey) {
  return new Promise(function (resolve, reject) {
    fetch("/user/endUserLogin/".concat(idSurvey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(function (res) {
      if (res.status === 200 && res.ok) {
        return res.json().then(function (user) {
          resolve(user);
        });
      } else {
        return res.json().then(function (user) {
          alert(user.error);
        });
      }
    });
  });
} //login.js


function enterLoginPromise(userLogin) {
  return new Promise(function (resolve, reject) {
    fetch('/user/userLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    }).then(function (res) {
      if (res.status === 200 && res.ok) {
        return res.json().then(function (user) {
          resolve(user);
        });
      } else {
        return res.json().then(function (user) {
          alert(user.error);
        });
      }
    });
  });
}