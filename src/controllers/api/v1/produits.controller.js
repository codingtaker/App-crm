const Produit = require('../../../models/produit.model');

exports.createProduit = async (req, res) => {
  try {
    const { title, description, imageUrl, price, quantite, active } = req.body;
    const produit = new Produit({
      title,
      description,
      imageUrl,
      price,
      quantite,
      active,
      created_at: new Date()
    });
    await produit.save();
    return res.status(201).json({ message: 'Produit créé avec succès', produit });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du produit', error });
  }
};

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    return res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    return res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id,
      {$set: req.body, update_on: new Date()},
      {new: true}
      );
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    return res.status(200).json({ message: 'Produit mis à jour avec succès', produit });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
     return res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
};