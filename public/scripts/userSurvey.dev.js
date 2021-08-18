"use strict";

var returnPage = document.querySelector('.return');
var sendButton = document.querySelector('.send');
var form = document.querySelector('.sumbit');
form.addEventListener('submit', sendSurvey);
returnPage.addEventListener('click', loginOut);

function loginOut() {
  localStorage.setItem('isRedirect', JSON.stringify(1));
  window.location.href = 'surveyLogIn.html';
}

function getIdSurvey(ev) {
  var responseCookie, email, rootMessage, params, idSurvey, response, data;
  return regeneratorRuntime.async(function getIdSurvey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ev.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 3:
          responseCookie = _context.sent;
          email = responseCookie.data;
          rootMessage = document.querySelector('#nameCookie');
          if (email.length !== undefined) rootMessage.innerHTML = "<span>Hi \u270B ".concat(email, "</span>");
          params = new URLSearchParams(window.location.search);
          idSurvey = params.get('surveyId');
          _context.next = 11;
          return regeneratorRuntime.awrap(axios.get("/survey/getSurvey/".concat(idSurvey)));

        case 11:
          response = _context.sent;
          data = response.data;
          renderSurvey(data, idSurvey);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderSurvey(arrayToRender, idSurvey) {
  var root, responseCookie, email, response, isCreatedbyAdmin, html, count;
  return regeneratorRuntime.async(function renderSurvey$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          root = document.querySelector('#root');
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 3:
          responseCookie = _context2.sent;
          email = responseCookie.data;
          _context2.next = 7;
          return regeneratorRuntime.awrap(axios.get("/survey/getAsnwer/".concat(idSurvey, "/").concat(email)));

        case 7:
          response = _context2.sent;
          isCreatedbyAdmin = response.data;
          html = '';
          count = 1;
          html += "<p>Survey Title: ".concat(arrayToRender.title, "</p>");
          arrayToRender.question.forEach(function (question, index) {
            html += "\n        \n                <p>Question ".concat(count, ": ").concat(question.title, "</p> \n                <div style=\"display:flex\">\n                    \n                <div>\n                    <input type=\"radio\" id=\"one").concat(count, "\" name=\"").concat(index, "\" value=\"1\" checked>\n                    <label for=\"score").concat(index, "\">1</label>\n                </div>\n\n                <div>\n                    <input type=\"radio\" id=\"two").concat(count, "\" name=\"").concat(index, "\" value=\"2\" >\n                    <label for=\"score").concat(index, "\">2</label>\n                </div>\n\n                <div>\n                    <input type=\"radio\" id=\"three").concat(count, "\" name=\"").concat(index, "\" value=\"3\">\n                     <label for=\"score").concat(index, "\">3</label>\n                </div>\n                <div>\n                    <input type=\"radio\" id=\"four").concat(count, "\" name=\"").concat(index, "\" value=\"4\">\n                    <label for=\"score").concat(index, "\">4</label>\n                </div>\n                <div>\n                    <input type=\"radio\" id=\"five").concat(count, "\" name=\"").concat(index, "\" value=\"5\">\n                    <label for=\"score").concat(index, "\">5</label>\n                </div>\n            </div>  \n            ");
            count++;
          });
          root.innerHTML = html;

          if (isCreatedbyAdmin) {
            arrayToRender.question.forEach(function (element) {
              var voter = element.voters.filter(function (voter) {
                return voter.email === email;
              });
              voter.forEach(function (element, index) {
                switch (element.score) {
                  case 1:
                    document.getElementById("one".concat(index + 1)).checked = true;
                    break;

                  case 2:
                    console.log("two".concat(index + 1));
                    document.getElementById("two".concat(index + 1)).checked = true;
                    break;

                  case 3:
                    document.getElementById("three".concat(index + 1)).checked = true;
                    break;

                  case 4:
                    document.getElementById("four".concat(index + 1)).checked = true;
                    break;

                  case 5:
                    document.getElementById("five".concat(index + 1)).checked = true;
                    break;
                }
              });
            });
            sendButton.disabled = true;
            alert('Thanks for coming back, this was your answer');
          } else {
            sendButton.disabled = false;
          }

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function sendSurvey(ev) {
  var scoreList, responseSurvey, id, responseUser, email, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, params, idSurvey, responseAwait, ok;

  return regeneratorRuntime.async(function sendSurvey$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ev.preventDefault();
          scoreList = [];
          _context3.next = 4;
          return regeneratorRuntime.awrap(axios.get('/survey/surveys'));

        case 4:
          responseSurvey = _context3.sent;
          id = responseSurvey.data.id;
          _context3.next = 8;
          return regeneratorRuntime.awrap(axios.get('/user/getCookie'));

        case 8:
          responseUser = _context3.sent;
          email = responseUser.data.email;
          data = new FormData(form);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 14;

          for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            entry = _step.value;
            scoreList.push({
              id: id,
              score: +entry[1]
            });
          }

          _context3.next = 22;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](14);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 22:
          _context3.prev = 22;
          _context3.prev = 23;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 25:
          _context3.prev = 25;

          if (!_didIteratorError) {
            _context3.next = 28;
            break;
          }

          throw _iteratorError;

        case 28:
          return _context3.finish(25);

        case 29:
          return _context3.finish(22);

        case 30:
          ;
          params = new URLSearchParams(window.location.search);
          idSurvey = params.get('surveyId');
          _context3.next = 35;
          return regeneratorRuntime.awrap(addScorePromise(scoreList, idSurvey));

        case 35:
          responseAwait = _context3.sent;
          ok = responseAwait.ok;
          alert(ok);
          localStorage.setItem('isRedirect', JSON.stringify(1));
          setTimeout('redirectpage()', 500);

        case 40:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[14, 18, 22, 30], [23,, 25, 29]]);
}

function redirectpage() {
  window.location.replace("http://localhost:8000/surveyLogIn.html");
}