
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



    html += `<h2>Survey Title: ${arrayToRender.title}</h2>`


    if (!isCreatedbyAdmin) {
        html += `<h3><strong>Pick the number. 1 is the lowest and 5 is the highest  </strong></h3>`
        arrayToRender.question.forEach((question, index) => {
            html += `
        
                <p>Question ${index+1}: ${question.title}</p> 
                <div style="display:flex">
                    
                <div>
                    <input type="radio" id="one${index}" name="${index}" value="1" checked>
                    <label for="score${index}">1</label>
                </div>

                <div>
                    <input type="radio" id="two${index}" name="${index}" value="2" >
                    <label for="score${index}">2</label>
                </div>

                <div>
                    <input type="radio" id="three${index}" name="${index}" value="3">
                     <label for="score${index}">3</label>
                </div>
                <div>
                    <input type="radio" id="four${index}" name="${index}" value="4">
                    <label for="score${index}">4</label>
                </div>
                <div>
                    <input type="radio" id="five${index}" name="${index}" value="5">
                    <label for="score${index}">5</label>
                </div>
            </div>  
            `
     
        });


        sendButton.disabled = false;
    } else {
        html += `<h3> <strong>Thanks for coming back, this was your answer </strong></h3>`
        arrayToRender.question.forEach((element, index) => {
           
            html += `<p style="font-weight:bold">Question ${index + 1}: <span>${element.title}</span></p>`
            const voter = element.voters.filter(voter => voter.email === email)
            voter.forEach((element, index) => {
                html += `<span>Score: ${element.score}</span>`


            });
        });
        sendButton.disabled = true;

    }

    root.innerHTML = html;
}



async function sendSurvey(ev) {
    ev.preventDefault();

    const scoreList = []

    const responseSurvey = await axios.get('/survey/surveys')
    const { id } = responseSurvey.data

    // const responseUser = await axios.get('/user/getCookie')
    // const { email } = responseUser.data

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

    console.log(responseAwait)

    const { ok } = responseAwait
     alert(ok)

    localStorage.setItem('isRedirect', JSON.stringify(1))

     setTimeout('redirectpage()', 500)

}

function redirectpage() {
    const location = window.location.origin
    window.location.replace(`${location}/surveyLogIn.html`)
}

