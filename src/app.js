require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();

mongoose.connect('mongodb://localhost:27017/app-crm')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(express.json());

app.use("/", require('./routes/admin/login.route'));
app.use("/api/v1", require('./routes/api/v1/user.route'));
app.use("/api/v1", require('./routes/api/v1/produit.route'));

app.use("/admin/dashbord", require('./routes/admin/home'));
app.use("/admin/produits", require('./routes/admin/produitView.route'));
app.use("/admin/users", require('./routes/admin/userView.route'));


module.exports = app;