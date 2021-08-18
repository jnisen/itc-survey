"use strict";

//btn
var btnReturn = document.querySelector('.btn-return');
var form = document.querySelector('#form-login'); //addEventListener

btnReturn.addEventListener('click', toHomePage);
form.addEventListener('submit', loginUser);

function loginUser(ev) {
  var email, password, user, response;
  return regeneratorRuntime.async(function loginUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ev.preventDefault();
          email = ev.target.elements.email.value;
          password = ev.target.elements.password.value;
          user = {
            email: email,
            password: password
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(enterLoginPromise(user));

        case 6:
          response = _context.sent;
          alert(response.ok);
          window.location.href = 'historial.html';

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
} //function


function toHomePage() {
  window.location.href = 'index.html';
}