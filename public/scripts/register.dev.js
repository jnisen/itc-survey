"use strict";

//btn
var btnReturn = document.querySelector('.btn-return'); //form

var form = document.querySelector('.container__form'); //addEventListener

btnReturn.addEventListener('click', toHomePage);
form.addEventListener('submit', handleRegister);

function toHomePage() {
  window.location.href = 'index.html';
}

function handleRegister(ev) {
  var username, email, password, validEmail, emailReg, newUser, response, ok;
  return regeneratorRuntime.async(function handleRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          username = ev.target.elements.username.value;
          email = ev.target.elements.email.value;
          password = ev.target.elements.password.value;
          validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          emailReg = new RegExp(validEmail, 'gmi');

          if (emailReg.test(email)) {
            _context.next = 9;
            break;
          }

          throw new Error('Wrong email address');

        case 9:
          newUser = {
            username: username,
            email: email,
            password: password
          };
          _context.next = 12;
          return regeneratorRuntime.awrap(addRegisterPromise(newUser));

        case 12:
          response = _context.sent;
          ok = response.ok;
          alert(ok);
          window.location.href = "login.html";
          ev.target.reset();
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          alert(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}