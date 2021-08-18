"use strict";

var form = document.querySelector('.sign-in-form');
form.addEventListener('submit', handelLogInUser);

function handelLogInUser(ev) {
  var email, password, validEmail, emailReg, newUser, idSurvey, response;
  return regeneratorRuntime.async(function handelLogInUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          email = ev.target.elements.userEmail.value;
          password = ev.target.elements.userPassword.value;
          validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          emailReg = new RegExp(validEmail, 'gmi');

          if (emailReg.test(email)) {
            _context.next = 8;
            break;
          }

          throw new Error('Wrong email address');

        case 8:
          newUser = {
            email: email,
            password: password
          };
          idSurvey = JSON.parse(localStorage.getItem('id'));
          _context.next = 12;
          return regeneratorRuntime.awrap(enterEndUserLogIn(newUser, idSurvey));

        case 12:
          response = _context.sent;
          alert(response.ok);
          window.location.href = "./userSurvey.html?surveyId=".concat(idSurvey);
          localStorage.setItem('isRedirect', JSON.stringify(0));
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          alert(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}