//home page

//btn
const btnLogin = document.querySelector('.container__login');
const btnRegister = document.querySelector('.container__register');


//addEventListener
btnRegister.addEventListener('click', toRegisterPage)
btnLogin.addEventListener('click', toLoginPage)



//function
function toRegisterPage() {
    window.location.href = 'register.html'
}

function toLoginPage() {
    window.location.href = 'login.html'
}