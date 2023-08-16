const express = require('express');
const Route = express.Router()

const AdminController = require('../controller/adminController');

Route.get('/admin/',AdminController.login)
Route.post('/admin/logincreate',AdminController.logincreate)

Route.get('/admin/dashboard',AdminController.adminauth,AdminController.dashboard)

Route.get('/admin/logout',AdminController.logout)

Route.get('/admin/users',AdminController.adminauth,AdminController.Users)

Route.get('/admin/deactiveuser/:id',AdminController.deactiveuser)
Route.get('/admin/activeuser/:id',AdminController.activeuser)

Route.get('/admin/contact',AdminController.adminauth,AdminController.contact)


Route.get('/admin/item',AdminController.adminauth,AdminController.item)
Route.post('/admin/itemCreate',AdminController.itemCreate)
Route.get('/admin/edit/:id',AdminController.itemEdit)
Route.post('/admin/itemUpdate',AdminController.itemUpdate)


Route.get('/admin/delete/:id', AdminController.deletee)



Route.get('/admin/activeitem/:id',AdminController.activeItem)
Route.get('/admin/deactiveitem/:id',AdminController.deactiveItem)

module.exports=Route;