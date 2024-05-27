const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Extraction du token du header Authorization
        const token = req.headers.authorization.split(' ')[1];
        
        // Vérification et décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        
        // Récupération de l'identifiant de l'utilisateur à partir du token
        const userId = decodedToken.userId;
        
        // Ajout des informations d'authentification à l'objet de requête (req)
        req.auth = {
            userId: userId
        };
        
        // Poursuite de la chaîne middleware
        next();
    } catch (error) {
        // Gestion des erreurs liées au token invalide
        res.status(401).json({ error: 'Token invalide' });
    }
};
