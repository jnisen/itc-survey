const express = require('express')
const router = express.Router()

import {usersRegister,loginUser,getCookie,getSurveys,endUserLogin,scoreAdd} from '../controllers/controllersUsers'



router.post('/user', usersRegister)
      .post('/userLogin', loginUser)
      .post('/endUserLogin/:id', endUserLogin)
      .get('/getCookie', getCookie)
      .get('/show/:email',getSurveys)
      .post('/add/:id',scoreAdd)

module.exports = router