const express = require('express');
const Route = express.Router()
// const multer = require('multer');
const path = require('path')
// const jwt=require('jsonwebtoken')
const ApiController = require('../controller/ApiController')
// const auth = require('../middleware/userAuth')


//============users Reg and Login===========
Route.post('/reg', ApiController.addUser)
Route.post('/login', ApiController.login)

//============Get Users===========
Route.get('/getUsers',ApiController.getUsers)
Route.get('/getItem',ApiController.item)
Route.get('/single/:id',ApiController.single)
Route.get('/profile/:id',ApiController.profile)

//============Contact===========
Route.post('/contact',ApiController.contact)

// Route.get('/test',auth,ApiController.test);

//============ADD TO CARD===========
// Route.post('/addcart',ApiController.postAddToCart)
// Route.get('/getcart',ApiController.getCART)

//============BuyNow===========
Route.post('/buynow',ApiController.BuyNow)

module.exports = Route;