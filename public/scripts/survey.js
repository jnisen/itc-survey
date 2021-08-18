
//btn
const btnAddQuestion = document.querySelector('.boxquestion--circle')
const btnCreateSurveys = document.querySelector('.btncreate')
const sendLink = document.querySelector('.sendlink');
const returnPage = document.querySelector('.return')


//init
let count = 0;

//addEventListener
btnAddQuestion.addEventListener('click', addQuestion)
btnCreateSurveys.addEventListener('click', createSurvey)
sendLink.addEventListener('click', sendLinkToUser)
returnPage.addEventListener('click', returnPageToHistorial)



function returnPageToHistorial() {
    window.location.href = 'historial.html'
}

function sendLinkToUser() {

    const params = new URLSearchParams(window.location.search);
    const idSurvey = params.get('surveyId');

    const whatsapp = document.querySelector('.whatsapp')

    const sendLink = 'whatsapp://send?text=' + window.location.origin + '/userSurvey.html?surveyId=' + idSurvey

    whatsapp.setAttribute('href', sendLink)



}

async function addQuestion(ev) {

    ev.preventDefault()


    const rootQuestion = document.querySelector('.main')

    let html = ''
    html += `
                    <div class="boxquestion" id="boxquestion${count}" >
                            <div class="boxquestion__question">
                                <label for="question">
                                    <input type="text" name="question${count}" class="boxquestion__question--title" size="53" id="${count}" onchange='blockQuestion("${count}")'>
                                </label>
                            </div>
                            <i class="fas fa-user-edit boxquestion--edit" onclick='editQuestion("${count}")'></i>
                            <i class="fas fa-trash boxquestion--trash" onclick='deleteQuestion("${count}")'></i> 
                    </div>`


    rootQuestion.insertAdjacentHTML("beforeend", html)
    count++;
    const btnCreate = document.querySelector('.btncreate');
    btnCreate.disabled = false;
    btnCreate.style.cursor = 'pointer';

}

function blockQuestion(id) {
    document.getElementById(id).disabled = true;
}


function editQuestion(id) {
    document.getElementById(id).disabled = false;
}

function deleteQuestion(id) {
    document.getElementById(`boxquestion${id}`).remove()

}

async function getCookies(ev) {

    ev.preventDefault()
    const response = await axios.get('/user/getCookie')
    const {
        username
    } = response.data

    const rootMessage = document.querySelector('#nameCookie')
    rootMessage.innerHTML = `<span>Hi ✋ ${username.charAt(0).toUpperCase() + username.slice(1)}</span>`



    const params = new URLSearchParams(window.location.search);
    const idSurvey = params.get('surveyId');


    const isCreated = JSON.parse(localStorage.getItem("isCreated"))

    if (isCreated === 1) {
        const responseSurvey = await axios.get(`/survey/getSurvey/${idSurvey}`)

        let html = '';
        if (responseSurvey.data) {
            const inputTitle = document.querySelector('.container__title--title')

            const { title, question } = responseSurvey.data;



            inputTitle.value = title;
            inputTitle.disabled = true;

            const rootQuestion = document.querySelector('.main')

            let avg = []

            const cantidad = question[0].voters.length

            html += `<span style="display:flex;justify-content:center; font-weight:bold;">VOTERS: ${cantidad}</span>`

            for (let i = 0; i < question.length; i++) {


                avg.push(parseFloat((question[i].voters.reduce((sum, value) => (typeof value.score == "number" ? sum + value.score : sum), 0)) / cantidad).toFixed(2));

            }


            for (let i = 0; i < question.length; i++) {



                html += `
                    <div class="boxquestion" id="boxquestion${i}" >
                            <div class="boxquestion__question">
                                <label for="question">
                                    <input type="text" name="question${i}" class="boxquestion__question--title" value="${question[i].title}" size="53" id="${i}" onchange='blockQuestion("${i}")' disabled>
                                    
                                </label>`

                if (avg[0] === 'NaN') {
                    html += `<span>Avg: 0;</span>`
                } else {
                    html += `<span>Avg: ${avg[i]}</span>`
                }


                html += `
                            </div>
                    </div>`

            }

            rootQuestion.insertAdjacentHTML("beforeend", html)
            count++;
            btnCreateSurveys.hidden = true;
            btnAddQuestion.style.display = "none"

        }

    } else {
        btnCreateSurveys.hidden = false;
        btnAddQuestion.style.display = "visible"
    }
}




async function createSurvey(ev) {
    ev.preventDefault()
    const rootQuestion = document.querySelector('.main')
    const length = rootQuestion.children.length
    let arrayQuestion = []

    for (let i = 1; i < length; i++) {
        arrayQuestion.push({
            title: rootQuestion.children[i].children[0].children[0].children[0].value,
            id: i - 1,
            voters: [],
        })

    }

    const inputTitle = document.querySelector('.container__title--title').value

    const responseCookie = await axios.get('/user/getCookie')

    const {
        email
    } = responseCookie.data

    const params = new URLSearchParams(window.location.search);
    const id = params.get('surveyId');


    const newSurvey = {
        id: id,
        title: inputTitle,
        email: email,
        questions: arrayQuestion,
    }


    const responseAwait = await addSurveysPromise(newSurvey)

    const { ok } = responseAwait
    alert(ok)

    localStorage.setItem('isRedirect', JSON.stringify(1))

}

