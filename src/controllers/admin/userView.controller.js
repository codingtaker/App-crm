const User = require('../../models/user.model');

exports.getUserPage = async(req, res )=>{
    try {
      if (!req.session.user) {
        req.session.message = {
            type: 'danger',
            message: 'Vous devez être connecté pour accéder à cette page.'
        };
        return res.redirect('/');
      }
      const name = req.session.user.name
      const user = await User.find({name: name});
      const users = await User.find();
      return res.render('user', {users, user})
    } catch (error) {
      console.log(error);
      res.status(500).send('Erreur lors de l\'affichage de la page utilisateurs !');
    }
  };

exports.createUser = async (req, res) => {
    try {
        //ToDo: Save User
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.session.message = {
          type: 'danger',
          message: 'Un utilisateur avec cet email existe déjà.'
            };
            return res.redirect("/admin/users");
        }
        const { name, email, password} = req.body;
        if(!name ||!email || !password){
          throw new Error("Veuillez remplir tous les champs")
        }
        const newUser = new User({
            name,
            email,
            password,
            role: req.body.role || 'customers'
        });
        try {
            await newUser.save();
            req.session.message = {
              type: 'success',
              message: 'Utilisateur créer avec succès!'
          }
          return res.redirect("/admin/users");
        } catch (error) {
            console.log(error);
            return res.redirect("/admin/users");
        }
    } catch (error) {
        return res.redirect('/admin/users', {message : error.message})
    }
};

exports.updateUser = async(req, res) =>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "Utilisateur non trouvé", type:"danger" });
        }
        req.session.message = {
          type:"info",
          message: "Mise à jour réussi 👍"
        };
        return res.redirect("admin/users");
      } catch (err) {
        console.log(err);
        return res.redirect("admin/users")
      }
};

exports.deleteUser = async(req, res) =>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        req.session.message = {
          type:"info",
          message: "Utilisateur supprimé avec succès"
        };
        return res.redirect("admin/users");
      } catch (err) {
        console.log(err)
        return res.redirect("admin/users");
      }
};

exports.getUserById = async (req, res) => {
    try {
        const searchKey = req.query.key;
        const users = await User.find({
            name: { $regex: searchKey, $options: 'i' }
        });
        return res.render("users", {users});
    } catch (error) {
        console.error(error);
        res.redirect('/admin/users')
    }
  };
  
exports.getUserByKey = async (req, res) => {
    try {
        const searchKey = req.body.search;
        const users = await User.find({
            name: { $regex: searchKey, $options: 'i' }
        });
        return res.render("users", {users});
    } catch (error) {
        console.error(error);
        res.redirect('/admin/users')
    }
}