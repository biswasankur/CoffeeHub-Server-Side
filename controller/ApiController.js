const UserModel = require('../model/user');
const itemModel = require('../model/coffeeItem');
const ContactModel = require('../model/contact');
const BuyNowModel = require('../model/buynow');
// const AddModel=require('../model/add')
const config = require('../config/config')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');





//====================================Users Registation======================================================

const SecurePassword = async (password) => {
    try {
        const HashPassword = await bcryptjs.hash(password, 10);
        return HashPassword;
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const CreateToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secrect_key, { expiresIn: "5m" });
        return token;
    } catch (error) {
        res.status(400).json(error.message)
    }
}
exports.addUser = async (req, res) => {
    try {
        const Passwordhash = await SecurePassword(req.body.password)
        // const image=req.file;
        const user = await new UserModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            // image:image.path,
            image: req.file.filename,
            password: Passwordhash,
        })
        const duplicateEmail = await UserModel.findOne({ email: req.body.email })
        if (duplicateEmail) {
            res.status(400).json({ success: false, message: "email already exist" });
        } else {
            const result = await user.save()
            const token = await CreateToken(result._id);
            res.status(200).json({ success: true, msg: "User Registered Successfully", data: result, status: 200, 'token': token })
        }
    } catch (error) {
        console.log(error);
        res.status(201).json({ success: false, msg: "User Not Registered" })
    }
}

//====================================Users Login===========================================================

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(401).json({ success: false, message: "All input are required", status: 401 })
        }
        const users = await UserModel.findOne({ email })
        if (users && (await bcryptjs.compare(password, users.password))) {
            const token = await CreateToken(users._id)
            return res.status(200).json({ success: true, msg: "Login....", "user": users, status: 200, token: token });
        }
        return res.status(401).json({ success: false, message: "Invalid Credentials", status: 401 });
    }
    catch (error) {
        console.log(error);
    }

}

//====================================Api auth==========================================================

// exports.test=(req,res)=>{
//     res.send({message:"you are Authenticated User"});
//     console.log(test);
// }

//====================================Get Users==========================================================

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({ success: true, msg: "Users fetch Successfully", data: users, status: true })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Users Not fetch" })

    }
}
//====================================Contact============================================================
exports.contact = async (req, res) => {
    try {
        const phone = await new ContactModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message: req.body.message
        })
        const contactresult = await phone.save()
        res.status(200).json({ success: true, msg: "Item Added Successfully", data: contactresult, status: 200 })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Item Not Added" })

    }
}
//====================================Get Item============================================================

exports.item = async (req, res) => {
    try {

        const item = await itemModel.find()
        // const item = await itemModel.find(req.params._id)
        res.status(200).json({ success: true, msg: "Item fetch Successfully", data: item, status: 200 })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Item Not fetch" })

    }
}



//====================================single data fatch============================================================

exports.single = async (req, res) => {
    try {
        const single_id = await itemModel.findById(req.params.id)
        console.log(single_id);
        res.status(200).json({ success: true, msg: 'single data fetch successfilly..!', data: single_id, status: 200 })

    } catch (error) {
        res.status(201).json({ success: false, msg: 'data not fetched..!' })

    }
}

//====================================profile============================================================

exports.profile = async (req, res) => {
    try {
        const users_Profile = await UserModel.findById(req.params.id)
        console.log(users_Profile);
        res.status(200).json({ success: true, msg: 'profile fetch successfilly..!', data: users_Profile, status: 200 })

    } catch (error) {
        console.log(error);
        res.status(201).json({ success: false, msg: 'profile not fetched..!' })

    }
}
//====================================ADD TO CARD============================================================

// exports.Cart = async (req, res) => {
//     try {
//         const AddTo = await new AddModel({
//             customer_id: req.body.customer_id,
//             item_id:req.body.item_id,
//             quenty: req.body.quenty,
//             // image: req.body.image,
//         })
//         const AddToresult = await AddTo.save()
//         res.status(200).json({ success: true, msg: "Item Added Successfully", data: AddToresult, status: 200 })
//     } catch (error) {
//         console.log(error);
//         res.status(201).json({ success: false, msg: "Item Not Added" })

//     }
// }
// exports.postAddToCart=async(req,res)=>{            
//     try {
//         const userId=req.body.user._id;
//         const pId=req.body.productId;
//         const quantity=req.body.quantity;
//         console.log("after add to cart: Item:",pId, "Q:",quantity,"Id:",userId);
//         const cartValue=[];
//       const AddTo=await AddModel.find({userId:userId,productId:pId})
//       .then(cartData=>{
//         console.log("cartdata:",cartData);
//         if (cartData=='') {
//             itemModel.findById(pId).then(itemforcart=>{
//                 console.log("product For cart:",itemforcart);
//                 cartValue.push(itemforcart)
//                 const cartitem=new AddModel({productId:pId,quantity:quantity,userId:userId,cart:cartValue})
//                   cartitem.save()

//             })
//         }
//       })
//     } catch (error) {
//         console.log(error);
//     }


// }
//====================================Add to cart Get============================================================

// exports.getCART = async (req, res) => {
//     try {
//         const  getcart= await AddModel.find()
//         res.status(200).json({ success: true, msg: "Item fetch Successfully", data: getcart, status: true })
//     } catch (error) {
//         res.status(201).json({ success: false, msg: "Item Not fetch" })

//     }
// }

//====================================BuyNow============================================================

exports.BuyNow = async (req, res) => {
    try {
        const buy = await new BuyNowModel({
            name: req.body.name,
            contact: req.body.contact,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            cardholdername: req.body.cardholdername,
            card: req.body.card,
            expmonth: req.body.expmonth,
            expyear: req.body.expyear,
            cvv: req.body.cvv,
            cod: req.body.cod,
            UPI: req.body.UPI,

        })
        const result = await buy.save()
        res.status(200).json({ success: true, msg: "sucessfully Order",Alldata:result ,status:200})

    } catch (error) {
        console.log(error);
        res.status(201).json({ success: false, msg: "sucessfully not order" })
    }
}