const Produits = require('../../models/produit.model');
const Users = require('../../models/user.model');

exports.getDashbord = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.message = {
                type: 'danger',
                message: 'Vous devez être connecté pour accéder à cette page.'
            };
            return res.redirect('/');
          }
        const produits = await Produits.find()
        const email = req.session.user.email;
        const users = await Users.find({email: email});
        return res.render("dashbord", {users, produits});
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'affichage de la page des utilisateur.');
    }
}

exports.updateDashbord = async(req, res) =>{
    try {
        const updatedUser = await Users.findByIdAndUpdate(
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
        return res.redirect("/admin/dashbord");
      } catch (err) {
        console.log(err);
        return res.redirect("/admin/dashbord")
      }
};