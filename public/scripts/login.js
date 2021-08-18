//btn
const btnReturn = document.querySelector('.btn-return');
const form = document.querySelector('#form-login');


//addEventListener
btnReturn.addEventListener('click', toHomePage)
form.addEventListener('submit', loginUser)

async function loginUser(ev) {

    ev.preventDefault()

    const email = ev.target.elements.email.value
    const password = ev.target.elements.password.value

    const user = {
        email: email,
        password: password,
    }

    const response = await enterLoginPromise(user)

    alert(response.ok)
    window.location.href = 'historial.html'

}



//function
function toHomePage() {
    window.location.href = 'index.html'
}
