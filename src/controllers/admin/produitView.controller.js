const Produits = require('../../models/produit.model');
const user = require('../../models/user.model');
const User = require('../../models/user.model');

exports.getProduitsPage = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.message = {
                type: 'danger',
                message: 'Vous devez être connecté pour accéder à cette page.'
            };
            return res.redirect('/');
        }
        const email = req.session.user.email
        const users = await User.find({email: email});
        const produits = await Produits.find()
        return res.render("produit", {produits, users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'affichage de la page des produits.');
    }
};

exports.createProduit = async (req, res) => {
    try {
        //ToDo: Save produit
        const { title, description, imageUrl, userId, price, quantite, active } = req.body;
        if (!title || !description || !imageUrl || !price || !quantite || !active) {
            throw new Error("Veuillez remplir tous les champs") 
          }
        const newProduit = new Produits({
        title,
        description,
        imageUrl,
        price,
        quantite,
        active,
        created_at: new Date()
        });
        try {
            await newProduit.save();
            req.session.message = {
                type: 'success',
                message: 'Un produit à été créer avec succès!'
            }
            return res.redirect("/admin/produits");
        } catch (error) {
            console.log(error)
            return res.redirect("/admin/produits")
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/admin/produits')
    }
};

exports.updateProduit = async (req, res) => {
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
        return res.redirect("/admin/produits");
    } catch (error) {
        console.error(error);
        res.redirect("/admin/produits");
    }
};

exports.deleteProduit = async (req, res) => {
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
        res.redirect('/admin/produits')
    }
};

exports.getElementById = async (req, res) => {
    try {
        const searchKey = req.query.key;
        const produits = await Produits.find({
            title: { $regex: searchKey, $options: 'i' }
        });
        console.log("produits:", produits)
        return res.render("produits", {produits});
    } catch (error) {
        console.error(error);
        res.redirect('/admin/produits')
    }
};

exports.getElementByKey = async (req, res) => {
    try {
        const searchKey = req.body.search;
        const produits = await Produits.find({
            title: { $regex: searchKey, $options: 'i' }
        });
        return res.render("produits", {produits});
    } catch (error) {
        console.error(error);
        res.redirect('/admin/produits')
    }
}
