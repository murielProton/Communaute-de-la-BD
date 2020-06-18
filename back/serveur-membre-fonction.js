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
    console.log("je rentre dans la fonction estEmailValide");
    const regexMail = RegExp('^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]{2,5}$');
    if (!regexMail.test(req.body.email)) {
        console.log("estEmailValide == false");
        return false;
    } else {
        console.log("estEmailValide == true");
        return true;
    }
}
function estMotDePasseEgaleAuMDPConfirmation(req) {
    let mot_de_passe = req.body.mot_de_passe;
    let mot_de_passe_confirmation = req.body.mot_de_passe_confirmation;
    if (mot_de_passe != mot_de_passe_confirmation) {
        console.log("Mot de Passe = " + req.body.mot_de_passe + " & confirmation = " + req.body.mot_de_passe_confirmation);
        console.log("Mot de Passe différent de sa confirmation.");
        return false;
    } else {
        console.log("Mot de Passe identique à sa confirmation.");
        return true;
    }
}
function estLaDateNaissanceValide(req) {
    if (req.body.date_de_naissance < "1900-01-01" ||
        req.body.date_de_naissance > Date.now()) {
        console.log("erreur sur la date de naissance");
        return false;
    } else {
        return true;
    }
}
function estLaDateInscriptionValide(req) {
    console.log("date now " +Date.now());
    if (req.body.date_inscription != Date.now()) {
        console.log("erreur sur la date d'inscription.");
        return false;
    } else {
        return true;
    }
}

exports.generateurErreursInscription = async function generateurErreursInscription(req) {
    let err = [];
    console.log("je rentre dans la fonciton generateur d' Erreurs d'inscription.");
    console.log("email" + req.body.email);
    /** DEBUT : On fait les contrôles */
    //tester si la longueur du pseudo est entre 4 et 21
    if (motDeLaBonneLongeure(req, 4, 21, req.body.pseudo) == false) {
        err.push("votre pseudo doit comprendre entre 4 et 20 charactères.")
    }
    //tester si le pseudo éxiste déjà
    if (await cePseudoEstUniqueEnCollection(req) == false) {
        err.push("Ce pseudo est déjà dans notre base de donnée, veuillez en entrer un nouveau.")
    }
    if (await estEmailValide(req) == false) {
        err.push("Cet email : " + req.body.email + ", n'est pas valide.");
        console.log("generateur d'erreur email regex test.");
    }
    //tester si la longueur du mot de passe est entre 4 et 21
    if (motDeLaBonneLongeure(req, 4, 21, req.body.mot_de_passe) == false) {
        err.push("votre mot de passe doit comprendre entre 4 et 20 charactères.")
    }
    // tester si le mot de passe est équivalant au mot de passe confirmé.
    if (estMotDePasseEgaleAuMDPConfirmation(req) == false) {
        err.push("Mot de passe incorrecte.");
        console.log("mot de passe différent de mot de passe confirmation.");
    }
    /*TODO tester la date de naissance à date actuelle -120ans
    if (estLaDateNaissanceValide(req) == false ){
        err.push("Date de naissance impossible.");
        console.log("Date de naissance impossible.");
    }*/
    //tester date d'inscription == aujourd'hui
    // if (estLaDateInscriptionValide(req) == false) {
    //     err.push("Date d'inscription impossible.");
    //     console.log("Date d'inscription impossible.");
    // }
    return err;
}
// Fonction qui converti les mots de passes en sha1
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