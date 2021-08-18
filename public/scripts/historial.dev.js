"use strict";

//btn
var btnCreateSurveys = document.querySelector('.survey--btn');
var returnPage = document.querySelector('.return'); //addEventListener

btnCreateSurveys.addEventListener('click', createSurveys);
returnPage.addEventListener('click', loginOut);

function loginOut() {
  window.location.href = 'login.html';
}

function createSurveys(ev) {
  var response, id;
  return regeneratorRuntime.async(function createSurveys$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ev.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get('/survey/surveys'));

        case 3:
          response = _context.sent;
          id = response.data.id;
          window.location.href = "./survey.html?surveyId=".concat(id);
          localStorage.setItem('isCreated', JSON.stringify(0));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCookiesAndSurveys(ev) {
  var response, _response$data, username, email, rootMessage, responseSurveys, data;

  return regeneratorRuntime.async(function getCookiesAndSurveys$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ev.preventDefault();
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 3:
          response = _context2.sent;
          _response$data = response.data, username = _response$data.username, email = _response$data.email;
          rootMessage = document.querySelector('#nameCookie');
          rootMessage.innerHTML = "<span>Hi \u270B ".concat(username.charAt(0).toUpperCase() + username.slice(1), "</span>");
          _context2.next = 9;
          return regeneratorRuntime.awrap(axios.get("/user/show/".concat(email)));

        case 9:
          responseSurveys = _context2.sent;
          data = responseSurveys.data;
          renderAllSurveys(data);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteSurveys(id, email) {
  var response, surveys;
  return regeneratorRuntime.async(function deleteSurveys$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!confirm("Do you want to delete this surveys?")) {
            _context3.next = 9;
            break;
          }

          alert('Delete surveys');
          _context3.next = 4;
          return regeneratorRuntime.awrap(axios["delete"]("/survey/user/".concat(id, "/").concat(email)));

        case 4:
          response = _context3.sent;
          surveys = response.data;
          renderAllSurveys(surveys);
          _context3.next = 10;
          break;

        case 9:
          alert('Delete Cancelled!');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function renderAllSurveys(arrayToRender) {
  var html = '';
  var createSurveys = document.querySelector('#rootSurveys');
  arrayToRender.forEach(function (element) {
    html += "<div class=\"boxes\">\n                    <div class=\"surveys__box\" onclick='moveToSurvey(\"".concat(element.id, "\")'>\n                        <span class=\"title\">Title: ").concat(element.title, "</span>\n                        <span class=\"answers\">Asnwers: ").concat(element.questions[0].voters.length, "</span>\n                  </div>\n                  <i class=\"fas fa-trash boxquestion--trash\" onclick='deleteSurveys(\"").concat(element.id, "\",\"").concat(element.email, "\")'></i>\n                </div>");
  });
  createSurveys.innerHTML = html;
}

function moveToSurvey(id) {
  window.location.href = "./survey.html?surveyId=".concat(id);
  localStorage.setItem('isCreated', JSON.stringify(1));
}