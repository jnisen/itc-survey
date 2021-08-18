//btn
const btnCreateSurveys = document.querySelector('.survey--btn')
const returnPage = document.querySelector('.return')


//addEventListener
btnCreateSurveys.addEventListener('click', createSurveys)
returnPage.addEventListener('click', loginOut)


function loginOut(){
    window.location.href = 'login.html'
} 

async function createSurveys(ev) {
    ev.preventDefault()

    const response = await axios.get('/survey/surveys')
     const {id} = response.data
     window.location.href = `./survey.html?surveyId=${id}`;
     localStorage.setItem('isCreated', JSON.stringify(0)) 
}

async function getCookiesAndSurveys(ev) {

    ev.preventDefault()
    const response = await axios.get('/user/getCookie')
    const { username, email } = response.data

    const rootMessage = document.querySelector('#nameCookie')
    rootMessage.innerHTML = `<span>Hi ✋ ${username.charAt(0).toUpperCase() + username.slice(1)}</span>`


    const responseSurveys = await axios.get(`/user/show/${email}`)
    const data = responseSurveys.data

   renderAllSurveys(data)

}

async function deleteSurveys(id,email) {
    if (confirm("Do you want to delete this surveys?")) {
        alert('Delete surveys')
        const response = await axios.delete(`/survey/user/${id}/${email}`)
        const surveys = response.data
        renderAllSurveys(surveys)
        
    } else {
        alert('Delete Cancelled!')
    }
}

function renderAllSurveys(arrayToRender) {

    let html = '';


    const createSurveys = document.querySelector('#rootSurveys')


    arrayToRender.forEach(element => {
        html += `<div class="boxes">
                    <div class="surveys__box" onclick='moveToSurvey("${element.id}")'>
                        <span class="title">Title: ${element.title}</span>
                        <span class="answers">Asnwers: ${element.questions[0].voters.length}</span>
                  </div>
                  <i class="fas fa-trash boxquestion--trash" onclick='deleteSurveys("${element.id}","${element.email}")'></i>
                </div>`
                  
    });

    createSurveys.innerHTML = html
}

function moveToSurvey(id) {
    window.location.href = `./survey.html?surveyId=${id}`;
    localStorage.setItem('isCreated', JSON.stringify(1)) 
}

