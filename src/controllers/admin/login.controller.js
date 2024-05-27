const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

exports.getSignup = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'affichage de la page des utilisateur.');
  }
};

exports.postSignup = async (req, res) => {
    const { name, email, password} = req.body;
    try {
        if (!name || !email || !password) {
            throw new Error("Veuillez remplir tous les champs") 
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "L'utilisateur existe déjà. Veuillez choisir un autre courriel." });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ name, email, password: hashedPassword });
          await newUser.save();
          req.session.user = newUser;
          return res.redirect("/");
      } catch (error) {
        console.error(error);
        return res.redirect("/");
      }
};

exports.getLogin = (req, res, next) => {
  try {
    User.find()
    .then(result => {
      res.render("login", {data: result})
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'affichage de la page des produits.');
  }
};

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.redirect("/");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    
    if (isPasswordMatch) {
      req.session.user = user
      return res.redirect("/admin/dashbord");
    } else {
      return res.send("Identifiant/mot de passe incorrect");
    }
  } catch(err) {
    console.error(err);
    return res.redirect("/");
  }
}