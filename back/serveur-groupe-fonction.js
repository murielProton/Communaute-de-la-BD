const crypto = require('crypto');
let Groupe = require('./model_groupe');
let Membre = require('./model_membre');

/* DEBUT des FONCTIONS UTILES GROUPES--------------------------------------------------------------------*/
exports.transformerListePseudoEnListe_id = async function transformerListePseudoEnListe_id(liste_membre_groupe_pseudo) {
    let liste_membre_groupe_object_id = [];
    for (let index = 0; index < liste_membre_groupe_pseudo.length; index++) {
        let pseudoMembre = liste_membre_groupe_pseudo[index];
        let membre = await Membre.findOne({ pseudo: pseudoMembre }).populate();
        liste_membre_groupe_object_id.push(membre._id);
    }
    return liste_membre_groupe_object_id;
}

exports.transformerListeGroupeNomEnListe_id = async function transformerListeGroupeNomEnListe_id(liste_groupe_nom) {
    let liste_groupe_object_id = [];
    for (let index = 0; index < liste_groupe_nom.length; index++) {
        let nom_groupe = liste_groupe_nom[index];
        let groupe = await Membre.findOne({ nom_groupe: nom_groupe }).populate();
        console.log("groupe dans serveur groupe fonction"+groupe);
        liste_groupe_object_id.push(groupe._id);
    }
    return liste_groupe_object_id;
}

/* FIN des FONCTIONS UTILES MEMBERS--------------------------------------------------------------------*/
