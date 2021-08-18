const express = require('express')
const router = express.Router()

import {addSurveys,deleteSurveys,getUniqueId,getPreviousSurvey,getAnswer} from '../controllers/controllersSurvey'


router.post('/add', addSurveys)
       .get('/surveys', getUniqueId)
       .get('/questions', getUniqueId)
       .get('/getSurvey/:id',getPreviousSurvey)
       .get('/getAsnwer/:id/:email',getAnswer)
       .delete('/user/:id/:email', deleteSurveys)



module.exports = router