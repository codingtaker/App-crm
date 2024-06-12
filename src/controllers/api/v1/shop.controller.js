const Produits = require('../../../models/produit.model');
const Users = require('../../../models/user.model');

exports.getShop = async (req, res) => {
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
        return res.render("shop", {users, produits});
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'affichage de la page des utilisateur.');
    }
};
exports.updateShop = async (req, res) => {
    try {
        const updateProduit = await Produits.findByIdAndUpdate(req.params.id,
            { $set: req.body, update_on: new Date() },
            { new: true });
          if (!updateProduit) {
            return res.status(404).json({ message: "Produit non trouvé", type:"danger" });
          }
          req.session.message = {
            type:"info",
            message: "Mise à jour réussi 👍"
          };
        return res.redirect("/api/v1/shop");
    } catch (error) {
        console.error(error);
        res.redirect("/api/v1/shop");
    }
};

exports.deleteShop = async (req, res) => {
    try {
        //ToDo: delete Produit
        await Produits.findByIdAndDelete(req.params.id);
        req.session.message = {
            type:"info",
            message: "Produit supprimé avec succès😁"
        };
        return res.status(200).json({message:"COOL"})
    } catch (error) {
        console.error(error);
        res.redirect('/api/v1/shop')
    }
};

exports.getElementById = async (req, res) => {
    try {
        const searchKey = req.query.key;
        const produits = await Produits.find({
            title: { $regex: searchKey, $options: 'i' }
        });
        console.log("produits:", produits)
        return res.render("shop", {produits});
    } catch (error) {
        console.error(error);
        res.redirect('/api/v1/shop')
    }
};

exports.getElementByKey = async (req, res) => {
    try {
        const searchKey = req.body.search;
        const produits = await Produits.find({
            title: { $regex: searchKey, $options: 'i' }
        });
        return res.render("shop", {produits});
    } catch (error) {
        console.error(error);
        res.redirect('/api/v1/shop')
    }
}
