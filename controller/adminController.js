const UserModel = require('../model/user');
const ContactModel = require('../model/contact');
const itemModel = require('../model/coffeeItem');
const BuyNow = require('../model/buynow')
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const flash = require('connect-flash')

exports.login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('./admin/login', {
        title: "admin || login",
        message: req.flash('message'),
        data1: loginData,
        data: req.admin,

    })
}

exports.logincreate = (req, res) => {
    UserModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            if (data.isAdmin == true) {
                const haspassword = data.password
                if (bcrypt.compareSync(req.body.password, haspassword)) {
                    const token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        image: data.image
                    }, 'coffeeshop@2023', { expiresIn: '1h' })
                    res.cookie('AdminToken', token)
                    if (req.body.rememberme) {
                        res.cookie('email', req.body.email)
                        res.cookie('password', req.body.password)
                    }
                    console.log(data);
                    req.flash('message', "You are Login Successfully")
                    res.redirect('/admin/dashboard')
                } else {
                    console.log("Incorrect password");
                    res.redirect('/admin/')
                }
            } else {
                req.flash('message', "You are not an Admin")
                res.redirect('/admin/')
            }

        } else {
            console.log("Incorrect email");
            res.redirect('/admin/')
        }
    })
}






exports.adminauth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin, "aa");
        next();
    } else {
        console.log(req.admin, "bb");
        req.flash('message', "can not access this page ..please login first")
        res.redirect('/admin/')
    }
}


exports.logout = (req, res) => {
    res.clearCookie('AdminToken')
    res.redirect('/admin/')
}



exports.dashboard = (req, res) => {
    UserModel.find().then(result => {
        ContactModel.find().then(result1 => {
            itemModel.find().then(result2 => {
                BuyNow.find().then(result3 => {
                    res.render('admin/dashboard', {
                        title: 'Admin || Dashboard',
                        data: req.admin,
                        Users: result,
                        contact: result1,
                        item: result2,
                        buynow: result3,
                    })
                })
            })
        })
    })

}

exports.Users = (req, res) => {
    UserModel.find().then(result => {
        // console.log("all user:",result);
        res.render('admin/users', {
            title: 'Users',
            data: req.admin,
            displayData: result
        })
    })
}



exports.activeuser = (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate(id, { status: true }).then(result => {
        console.log(result, "actived Users");
        res.redirect('/admin/users')
    }).catch(err => {
        console.log(err);
    })
}
exports.deactiveuser = (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate(id, { status: false }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/users')
    }).catch(err => {
        console.log(err);
    })
}


exports.contact = (req, res) => {
    ContactModel.find().then(result => {
        res.render('admin/contact', {
            title: 'Contact Page',
            data: req.admin,
            displayData: result
        })
    })
}

exports.item = (req, res) => {
    itemModel.find().then(result => {
        // console.log("all items:",result);
        res.render('admin/item', {
            title: 'Item Page',
            displayData: result,
            message: req.flash('message'),
            error: req.flash('error'),
            data: req.admin

        })
    })
}

exports.itemCreate = (req, res) => {
    // const image = req.file
    itemModel({
        itemName: req.body.itemName,
        // image: image.path,
        image: req.file.filename,
        itemDetails: req.body.itemDetails,
        price: req.body.price
    }).save().then(result => {
        console.log(result);
        // console.log("Item added successfull..")
        req.flash('message', "Item added successfull..")

        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
        req.flash('error', "item not added ..")
        res.redirect('/admin/item')

    })
}

exports.itemEdit = (req, res) => {
    itemId = req.params.id;
    itemModel.findById(itemId).then(result => {
        res.render('admin/itemEdit', {
            title: 'Item Page',
            itemEditData: result,
            message: req.flash('message'),
            data: req.admin,
            

        })
    }).catch((err) => {
        console.log(err);
    })
}

exports.itemUpdate = (req, res) => {
    const st_id = req.body.itemId
    const itemName = req.body.itemName
    const itemDetails = req.body.itemDetails
    const price = req.body.price

    itemModel.findById(st_id).then((result) => {
        result.itemName = itemName
        result.itemDetails = itemDetails
        result.price = price
        result.image = req.file.filename
        result.save().then(data => {
            res.redirect('/admin/item')
            // console.log(data, "Item Update Successfully");
            res.flash(data, "Item Update Successfully");
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.activeItem = (req, res) => {
    const id = req.params.id
    itemModel.findByIdAndUpdate(id, { status: true }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
    })
}

exports.deactiveItem = (req, res) => {
    const id = req.params.id
    itemModel.findByIdAndUpdate(id, { status: false }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
    })
}



exports.deletee = (req, res) => {
    const sid = req.params.id
    UserModel.deleteOne({ _id: sid }).then(del => {
        res.redirect('/admin/users')
        console.log(del, "data deleted successfully")
    }).catch(err => {
        console.log(err)
    })
}