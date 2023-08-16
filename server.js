const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session');
const cookieparser = require('cookie-parser');
// const jwt=require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 2100
const ApiRoute = require('./routes/apiRoute')
const AdminRoute = require('./routes/adminRouter')
// const auth=require('./middleware/userAuth')
const AdminAuth=require('./middleware/adminAuth')


const dbLink = "mongodb+srv://souvikdb:cSgmsmo8GCvTW05X@cluster0.bsndvpo.mongodb.net/ShopC";

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie: { maxAge: 5000 },
    secret: 'nodejs',
    resave: false,
    saveUninitialized: false
}))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("png") ||
        file.mimetype.includes("jpg") ||
        file.mimetype.includes("webp") ||
        file.mimetype.includes("jpeg")) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
app.use(multer({
    storage: fileStorage, fileFilter: fileFilter, limits: {
        fieldSize: 1024 * 1024 * 5
    }
}).single('image'))


app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(auth.veryfyToken)
app.use(ApiRoute)
app.use(AdminAuth.adminjwt)
app.use(AdminRoute)

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`Server Running http://localhost:${port}`);
            console.log("Database Connected");
        })
    })