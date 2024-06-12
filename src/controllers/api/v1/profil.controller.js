const User = require('../../../models/user.model');

exports.getProfil = async (req, res) => {
  try {
      if (!req.session.user) {
          req.session.message = {
              type: 'danger',
              message: 'Vous devez être connecté pour accéder à cette page.'
          };
          return res.redirect('/');
      }
      const email = req.session.user.email;
      const user = await User.findOne({ email: email });
      const name = req.session.user.name
      const userName = await User.find({name: name});

      const users = user ? [user] : [];
      if (user.role === 'admin') {
        return res.redirect('/admin/dashbord');
      }

      return res.render("profil", { users, userName });
  } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'affichage de la page de profil.');
  }
};

exports.updateProfil = async(req, res) =>{
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
    return res.redirect("/api/v1/profil");
  } catch (err) {
    console.log(err);
    return res.redirect("/api/v1/profil")
  }
}