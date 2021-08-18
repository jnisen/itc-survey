"use strict";

//btn
var btnAddQuestion = document.querySelector('.boxquestion--circle');
var btnCreateSurveys = document.querySelector('.btncreate');
var sendLink = document.querySelector('.sendlink');
var returnPage = document.querySelector('.return'); //init

var count = 0; //addEventListener

btnAddQuestion.addEventListener('click', addQuestion);
btnCreateSurveys.addEventListener('click', createSurvey);
sendLink.addEventListener('click', sendLinkToUser);
returnPage.addEventListener('click', returnPageToHistorial);

function returnPageToHistorial() {
  window.location.href = 'historial.html';
}

function sendLinkToUser() {
  var params = new URLSearchParams(window.location.search);
  var idSurvey = params.get('surveyId');
  var whatsapp = document.querySelector('.whatsapp');
  var sendLink = 'whatsapp://send?text=' + window.location.origin + '/userSurvey.html?surveyId=' + idSurvey;
  whatsapp.setAttribute('href', sendLink);
}

function addQuestion(ev) {
  var rootQuestion, html, btnCreate;
  return regeneratorRuntime.async(function addQuestion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ev.preventDefault();
          rootQuestion = document.querySelector('.main');
          html = '';
          html += "\n                    <div class=\"boxquestion\" id=\"boxquestion".concat(count, "\" >\n                            <div class=\"boxquestion__question\">\n                                <label for=\"question\">\n                                    <input type=\"text\" name=\"question").concat(count, "\" class=\"boxquestion__question--title\" size=\"53\" id=\"").concat(count, "\" onchange='blockQuestion(\"").concat(count, "\")'>\n                                </label>\n                            </div>\n                            <i class=\"fas fa-user-edit boxquestion--edit\" onclick='editQuestion(\"").concat(count, "\")'></i>\n                            <i class=\"fas fa-trash boxquestion--trash\" onclick='deleteQuestion(\"").concat(count, "\")'></i> \n                    </div>");
          rootQuestion.insertAdjacentHTML("beforeend", html);
          count++;
          btnCreate = document.querySelector('.btncreate');
          btnCreate.disabled = false;
          btnCreate.style.cursor = 'pointer';

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function blockQuestion(id) {
  document.getElementById(id).disabled = true;
}

function editQuestion(id) {
  document.getElementById(id).disabled = false;
}

function deleteQuestion(id) {
  document.getElementById("boxquestion".concat(id)).remove();
}

function getCookies(ev) {
  var response, username, rootMessage, params, idSurvey, isCreated, responseSurvey, html, inputTitle, _responseSurvey$data, title, question, rootQuestion, avg, cantidad, i, _i;

  return regeneratorRuntime.async(function getCookies$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ev.preventDefault();
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 3:
          response = _context2.sent;
          username = response.data.username;
          rootMessage = document.querySelector('#nameCookie');
          rootMessage.innerHTML = "<span>Hi \u270B ".concat(username.charAt(0).toUpperCase() + username.slice(1), "</span>");
          params = new URLSearchParams(window.location.search);
          idSurvey = params.get('surveyId');
          isCreated = JSON.parse(localStorage.getItem("isCreated"));

          if (!(isCreated === 1)) {
            _context2.next = 18;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(axios.get("/survey/getSurvey/".concat(idSurvey)));

        case 13:
          responseSurvey = _context2.sent;
          html = '';

          if (responseSurvey.data) {
            inputTitle = document.querySelector('.container__title--title');
            _responseSurvey$data = responseSurvey.data, title = _responseSurvey$data.title, question = _responseSurvey$data.question;
            inputTitle.value = title;
            inputTitle.disabled = true;
            rootQuestion = document.querySelector('.main');
            avg = [];
            cantidad = question[0].voters.length;
            html += "<span style=\"display:flex;justify-content:center; font-weight:bold;\">VOTERS: ".concat(cantidad, "</span>");

            for (i = 0; i < question.length; i++) {
              avg.push(parseFloat(question[i].voters.reduce(function (sum, value) {
                return typeof value.score == "number" ? sum + value.score : sum;
              }, 0) / cantidad).toFixed(2));
            }

            for (_i = 0; _i < question.length; _i++) {
              html += "\n                    <div class=\"boxquestion\" id=\"boxquestion".concat(_i, "\" >\n                            <div class=\"boxquestion__question\">\n                                <label for=\"question\">\n                                    <input type=\"text\" name=\"question").concat(_i, "\" class=\"boxquestion__question--title\" value=\"").concat(question[_i].title, "\" size=\"53\" id=\"").concat(_i, "\" onchange='blockQuestion(\"").concat(_i, "\")' disabled>\n                                    \n                                </label>");

              if (avg[0] === 'NaN') {
                html += "<span>Avg: 0;</span>";
              } else {
                html += "<span>Avg: ".concat(avg[_i], "</span>");
              }

              html += "\n                            </div>\n                    </div>";
            }

            rootQuestion.insertAdjacentHTML("beforeend", html);
            count++;
            btnCreateSurveys.hidden = true;
            btnAddQuestion.style.display = "none";
          }

          _context2.next = 20;
          break;

        case 18:
          btnCreateSurveys.hidden = false;
          btnAddQuestion.style.display = "visible";

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function createSurvey(ev) {
  var rootQuestion, length, arrayQuestion, i, inputTitle, responseCookie, email, params, id, newSurvey, responseAwait, ok;
  return regeneratorRuntime.async(function createSurvey$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ev.preventDefault();
          rootQuestion = document.querySelector('.main');
          length = rootQuestion.children.length;
          arrayQuestion = [];

          for (i = 1; i < length; i++) {
            arrayQuestion.push({
              title: rootQuestion.children[i].children[0].children[0].children[0].value,
              id: i - 1,
              voters: []
            });
          }

          inputTitle = document.querySelector('.container__title--title').value;
          _context3.next = 8;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 8:
          responseCookie = _context3.sent;
          email = responseCookie.data.email;
          params = new URLSearchParams(window.location.search);
          id = params.get('surveyId');
          newSurvey = {
            id: id,
            title: inputTitle,
            email: email,
            questions: arrayQuestion
          };
          _context3.next = 15;
          return regeneratorRuntime.awrap(addSurveysPromise(newSurvey));

        case 15:
          responseAwait = _context3.sent;
          ok = responseAwait.ok;
          alert(ok);
          localStorage.setItem('isRedirect', JSON.stringify(1));

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  });
}