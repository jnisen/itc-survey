
const returnPage = document.querySelector('.return')
const sendButton = document.querySelector('.send')
const form = document.querySelector('.sumbit');

form.addEventListener('submit', sendSurvey)
returnPage.addEventListener('click', loginOut)

function loginOut() {
    localStorage.setItem('isRedirect', JSON.stringify(1))
    window.location.href = 'surveyLogIn.html'
}

async function getIdSurvey(ev) {

    ev.preventDefault()
    const responseCookie = await axios.get('/user/getCookie')
    const email = responseCookie.data

    const rootMessage = document.querySelector('#nameCookie')

    if (email.length !== undefined) rootMessage.innerHTML = `<span>Hi ✋ ${email}</span>`

    const params = new URLSearchParams(window.location.search);
    const idSurvey = params.get('surveyId');

    const response = await axios.get(`/survey/getSurvey/${idSurvey}`)
    const data = response.data


    renderSurvey(data, idSurvey)
}

async function renderSurvey(arrayToRender, idSurvey) {
    const root = document.querySelector('#root');

    const responseCookie = await axios.get('/user/getCookie')
    const email = responseCookie.data

    const response = await axios.get(`/survey/getAsnwer/${idSurvey}/${email}`)
    const isCreatedbyAdmin = response.data

    let html = ''

    let count = 1;

    html += `<p>Survey Title: ${arrayToRender.title}</p>`

    arrayToRender.question.forEach((question, index) => {
        html += `
        
                <p>Question ${count}: ${question.title}</p> 
                <div style="display:flex">
                    
                <div>
                    <input type="radio" id="one${count}" name="${index}" value="1">
                    <label for="score${index}">1</label>
                </div>

                <div>
                    <input type="radio" id="two${count}" name="${index}" value="2" >
                    <label for="score${index}">2</label>
                </div>

                <div>
                    <input type="radio" id="three${count}" name="${index}" value="3">
                     <label for="score${index}">3</label>
                </div>
                <div>
                    <input type="radio" id="four${count}" name="${index}" value="4">
                    <label for="score${index}">4</label>
                </div>
                <div>
                    <input type="radio" id="five${count}" name="${index}" value="5">
                    <label for="score${index}">5</label>
                </div>
            </div>  
            `
        count++;

    });

    root.innerHTML = html;

    if (isCreatedbyAdmin) {
        arrayToRender.question.forEach(element => {
            const voter = element.voters.filter(voter => voter.email === email)
            voter.forEach((element, index) => {
                switch (element.score) {
                    case 1:
                        document.getElementById(`one${index + 1}`).checked = true;
                        break;
                    case 2:
                        console.log(`two${index + 1}`)
                        document.getElementById(`two${index + 1}`).checked = true;
                        break;
                    case 3:
                        document.getElementById(`three${index + 1}`).checked = true;
                        break;
                    case 4:
                        document.getElementById(`four${index + 1}`).checked = true;
                        break;
                    case 5:
                        document.getElementById(`five${index + 1}`).checked = true;
                        break;

                }


            });
        });
        sendButton.disabled = true;
        alert('Thanks for coming back, this was your answer')
    } else {
        sendButton.disabled = false;
    }
}


async function sendSurvey(ev) {
    ev.preventDefault();

    const scoreList = []

    const responseSurvey = await axios.get('/survey/surveys')
    const { id } = responseSurvey.data

    const responseUser = await axios.get('/user/getCookie')
    const { email } = responseUser.data

    const data = new FormData(form)

    for (const entry of data) {
        scoreList.push({
            id: id,
            score: +entry[1]
        })
    };


    const params = new URLSearchParams(window.location.search);
    const idSurvey = params.get('surveyId');

    const responseAwait = await addScorePromise(scoreList, idSurvey)

    const { ok } = responseAwait
    alert(ok)

    localStorage.setItem('isRedirect', JSON.stringify(1))

    setTimeout('redirectpage()', 500)

}

function redirectpage() {
    const location =  window.location.origin
    window.location.replace(`${location}/surveyLogIn.html`)
}

