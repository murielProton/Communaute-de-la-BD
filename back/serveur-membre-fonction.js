const crypto = require('crypto');
let Membre = require('./model_membre');

/* DEBUT des FONCTIONS UTILES MEMBERS--------------------------------------------------------------------*/
//login entre 5 et 20 char
function motDeLaBonneLongeure(req, longeureMinimum, longeureMax, mot) {
    let longeureDuMot = (mot).length;
    if (longeureDuMot < longeureMinimum || longeureDuMot > longeureMax) {
        return false;
    } else {
        return true;
    }
}
async function nouveauEmailEgalAncienEmail(req) {
    let emailListMember = await Member.find({ email: req.body.email });
    if (emailListMember.length == 1) {
        return true;
    } else {
        return false;
    }
}
//login unique in collection
async function cePseudoEstUniqueEnCollection(req) {
    let pseudoListeMember = await Membre.find({ pseudo: req.body.pseudo });
    if (pseudoListeMember.length > 0) {
        return false;
    } else {
        return true;
    }
}
// email unique in collection
async function cetEmailEstUniqueEnCollection(req) {
    let emailListeMembre = await Membre.find({ email: req.body.email });
    if (emailListeMembre.length > 0) {
        return false;
    } else {
        return true;
    }
}
// email = regex email
async function estEmailValide(req) {
    const regexMail = RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]{2,5}$');
    if (!regexMail.test(req.body.email)) {
        return false;
    } else {
        return true;
    }
}

exports.generateurErreursInscription = async function generateurErreursInscription(req) {
    console.log("je rentre dans la fonciton generateur d' Erreurs d'inscription.");
    let erreurs = [];
    /** DEBUT : On fait les contrôles */
    //tester si le pseudo est de la bonne longeure
    if (motDeLaBonneLongeure(req, 4, 20, req.body.pseudo) == false) {
        erreurs.push("votre pseudo doit comprendre entre 4 et 20 charactères.")
    }/*
    if (await cePseudoEstUniqueEnCollection(req) == false) {
        erreurs.push("Ce pseudo est déjà dans notre base de donnée, veuillez en entrer un nouveau.")
    }
    if (await cetEmailEstUniqueEnCollection(req) == false) {
        erreurs.push("Cet email est déjà dans notre base de donnée, veuillez en entrer un nouveau.")
    }
    if (await estEmailValide(req) == false) {
        erreurs.push("Cet email : " + req.body.email + ", n'est pas valide.");
    }
    var mot_de_passeCourrant = req.body.mot_de_passe;
    var tropPetit = mot_de_passeCourrant.length < 6;
    if (tropPetit) {
        erreurs.push("Pour des raisons de sécurité votre mot de passe doit plus long.");
    }
    var courentMot_de_passeConf = req.body.password_confirmation;
    if (courentMot_de_passe != courentMot_de_passeConf) {
        console.log("je passe dans le if le password est différent de password confirmation");
        erreurs.push("Invalide password  confirmation.");
    }*/
    /** FIN : On fait les contrôles **/
    return erreurs;
}
exports.toSha1 = function toSha1(password) {
    // On crée notre Hasher avec l'algo qu'on veux
    var shasum = crypto.createHash('sha1');
    // ce qu'on veux hasher
    shasum.update(password);
    // hex => Format de retour hex 012345679abcdef (base 16)
    return shasum.digest('hex');
}
async function passwordVerification(encryptedPassword, planPassword) {
    //vérifier si les deux mots de passe hacher sont identiques
    if (encryptedPassword == exports.toSha1(planPassword)) {
        return true
    } else {
        return false;
    }
}
//TODO Make it true n'importe quel champ doit pouvoir être testé
async function isFormFieldCompleted(req) {
    if (req.body.password == undefined || req.body.password == null) {
        return false;
    } else {
        return true;
    }
}
exports.generateErrorsForUpdate = async function generateErrorsForUpdate(req, member) {
    let errors = [];
    let login = req.body.login;
    console.log(login);
    if (await nouveauEmailEgalAncienEmail(req)) {
        errors.push("Not an Update !");
        console.log(errors);
    }
    if (await isEmailUniqueInCollection(req) == false) {
        errors.push("Your email is already in data base, please enter an other.")
        console.log(errors);
    }
    if (await isEmailValid(req) == false) {
        errors.push("This email : " + req.body.email + ", is not valid.");
        console.log(errors);
    }
    if (isFormFieldCompleted(req) == false) {
        error.push("please enter your password.");
        console.log(errors);
    }
    if (await passwordVerification(member.password, req.body.password) == false) {
        errors.push("Incorrect password.");
        console.log(errors);
    }
    return errors;
}

/* FIN des FONCTIONS UTILES MEMBERS--------------------------------------------------------------------*/
