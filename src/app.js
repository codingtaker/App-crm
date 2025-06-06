require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
const path = require('path');

const app = express();


mongoose.connect('mongodb://localhost:27017/app-crm')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000
    }
  })
);
app.use(flash());

app.use((req, res, next)=>{
  res.locals.message =req.session.message;
  delete req.session.message;
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejsbodyParser");
app.use(.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(express.json());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.use("/", require('./routes/admin/login.route'));

app.use("/api/v1", require('./routes/api/v1/user.route'));
app.use("/api/v1", require('./routes/api/v1/produit.route'));
app.use("/api/v1/home", require('./routes/api/v1/home.route'));
app.use("/api/v1/profil", require('./routes/api/v1/profil.route'));
app.use("/api/v1/shop", require('./routes/api/v1/shop.route'));

app.use("/admin/dashbord", require('./routes/admin/dashbord'));
app.use("/admin/produits", require('./routes/admin/produitView.route'));
app.use("/admin/users", require('./routes/admin/userView.route'));

module.exports = app;