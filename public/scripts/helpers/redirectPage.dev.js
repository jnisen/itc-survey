"use strict";

var isRedirect = JSON.parse(localStorage.getItem("isRedirect"));
var params = new URLSearchParams(window.location.search);
var idSurvey = params.get('surveyId');
localStorage.setItem('id', JSON.stringify(idSurvey));

if (isRedirect !== 0) {
  var redirectpage = function redirectpage() {
    window.location.replace("http://localhost:8000/surveyLogIn.html");
  };

  localStorage.setItem('isRedirect', JSON.stringify(1));
  setTimeout('redirectpage()', 500);
}