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
  var root, responseCookie, email, response, isCreatedbyAdmin, html;
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
          html += "<h2>Survey Title: ".concat(arrayToRender.title, "</h2>");

          if (!isCreatedbyAdmin) {
            html += "<h3><strong>Pick the number. 1 is the lowest and 5 is the highest  </strong></h3>";
            arrayToRender.question.forEach(function (question, index) {
              html += "\n        \n                <p>Question ".concat(index + 1, ": ").concat(question.title, "</p> \n                <div style=\"display:flex\">\n                    \n                <div>\n                    <input type=\"radio\" id=\"one").concat(index, "\" name=\"").concat(index, "\" value=\"1\" checked>\n                    <label for=\"score").concat(index, "\">1</label>\n                </div>\n\n                <div>\n                    <input type=\"radio\" id=\"two").concat(index, "\" name=\"").concat(index, "\" value=\"2\" >\n                    <label for=\"score").concat(index, "\">2</label>\n                </div>\n\n                <div>\n                    <input type=\"radio\" id=\"three").concat(index, "\" name=\"").concat(index, "\" value=\"3\">\n                     <label for=\"score").concat(index, "\">3</label>\n                </div>\n                <div>\n                    <input type=\"radio\" id=\"four").concat(index, "\" name=\"").concat(index, "\" value=\"4\">\n                    <label for=\"score").concat(index, "\">4</label>\n                </div>\n                <div>\n                    <input type=\"radio\" id=\"five").concat(index, "\" name=\"").concat(index, "\" value=\"5\">\n                    <label for=\"score").concat(index, "\">5</label>\n                </div>\n            </div>  \n            ");
            });
            sendButton.disabled = false;
          } else {
            html += "<h3> <strong>Thanks for coming back, this was your answer </strong></h3>";
            arrayToRender.question.forEach(function (element, index) {
              html += "<p style=\"font-weight:bold\">Question ".concat(index + 1, ": <span>").concat(element.title, "</span></p>");
              var voter = element.voters.filter(function (voter) {
                return voter.email === email;
              });
              voter.forEach(function (element, index) {
                html += "<span>Score: ".concat(element.score, "</span>");
              });
            });
            sendButton.disabled = true;
          }

          root.innerHTML = html;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function sendSurvey(ev) {
  var scoreList, responseSurvey, id, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, params, idSurvey, responseAwait, ok;

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
          id = responseSurvey.data.id; // const responseUser = await axios.get('/user/getCookie')
          // const { email } = responseUser.data

          data = new FormData(form);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 10;

          for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            entry = _step.value;
            scoreList.push({
              id: id,
              score: +entry[1]
            });
          }

          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 18:
          _context3.prev = 18;
          _context3.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 21:
          _context3.prev = 21;

          if (!_didIteratorError) {
            _context3.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context3.finish(21);

        case 25:
          return _context3.finish(18);

        case 26:
          ;
          params = new URLSearchParams(window.location.search);
          idSurvey = params.get('surveyId');
          _context3.next = 31;
          return regeneratorRuntime.awrap(addScorePromise(scoreList, idSurvey));

        case 31:
          responseAwait = _context3.sent;
          console.log(responseAwait);
          ok = responseAwait.ok;
          alert(ok);
          localStorage.setItem('isRedirect', JSON.stringify(1));
          setTimeout('redirectpage()', 500);

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 14, 18, 26], [19,, 21, 25]]);
}

function redirectpage() {
  var location = window.location.origin;
  window.location.replace("".concat(location, "/surveyLogIn.html"));
}