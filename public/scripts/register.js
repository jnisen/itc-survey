
//btn
const btnReturn = document.querySelector('.btn-return');

//form
const form = document.querySelector('.container__form');

//addEventListener
btnReturn.addEventListener('click', toHomePage)
form.addEventListener('submit', handleRegister)


function toHomePage() {
    window.location.href = 'index.html'
}

async function handleRegister(ev) {
    try {
        ev.preventDefault()

        const username = ev.target.elements.username.value
        const email = ev.target.elements.email.value
        const password = ev.target.elements.password.value

        const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const emailReg = new RegExp(validEmail, 'gmi');
        if (!emailReg.test(email)) {
            throw new Error('Wrong email address');
        }

        const newUser = {
            username: username,
            email: email,
            password: password,
        }


        const response = await addRegisterPromise(newUser)
        const { ok } = response
        alert(ok)
        window.location.href = "login.html"

        ev.target.reset()

    } catch (e) {
        alert(e)
    }
}

