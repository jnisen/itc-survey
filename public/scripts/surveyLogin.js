const form = document.querySelector('.sign-in-form');

form.addEventListener('submit', handelLogInUser)

async function handelLogInUser(ev) {

    try {
        ev.preventDefault();

        const email = ev.target.elements.userEmail.value;
        const password = ev.target.elements.userPassword.value;

        const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const emailReg = new RegExp(validEmail, 'gmi');
        if (!emailReg.test(email)) {
            throw new Error('Wrong email address');
        }

        const newUser = {
            email: email,
            password: password
        }

        const idSurvey = JSON.parse(localStorage.getItem('id'))

        const response = await enterEndUserLogIn(newUser, idSurvey);

        alert(response.ok);


        window.location.href = `./userSurvey.html?surveyId=${idSurvey}`;
        localStorage.setItem('isRedirect', JSON.stringify(0))
    } catch (e) {
        alert(e)
    }
}


