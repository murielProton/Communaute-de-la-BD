import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class InscriptionMembre extends Component {

    constructor(props) {
        super(props);

        this.onChangePseudo = this.onChangePseudo.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onChangeMotDePasseConfirmation = this.onChangeMotDePasseConfirmation.bind(this);
        this.onChangeDateDeNaissance = this.onChangeDateDeNaissance.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            pseudo: "",
            email: "",
            mot_de_passe: "",
            mot_de_passe_confirmation: "",
            date_de_naissance: "",
            ville: "",
            admin: false, // Commenter cette ligne si on veut cérer un administrateur (à faire aussi dans le model membre du back et en ligne 119)
            mot_de_passe_correct: true,
            email_correct: true,
            membre_cree: false,
            pseudo_existe: false,
            redirection: false
        }
    }

    onChangePseudo(e) {
        this.setState({
            pseudo: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeMotDePasse(e) {
        this.setState({
            mot_de_passe: e.target.value
        });
    }

    onChangeMotDePasseConfirmation(e) {
        this.setState({
            mot_de_passe_confirmation: e.target.value
        });
    }

    onChangeDateDeNaissance(e) {
        this.setState({
            date_de_naissance: e.target.value
        });
    }

    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // Permet d'éviter l'envoi de champs vides

        console.log("Form submitted:");
        console.log('pseudo: ', this.state.pseudo);
        console.log('email: ', this.state.email);
        console.log('mot de passe: ', this.state.mot_de_passe);
        console.log('MotDePasse_confirmation: ', this.state.mot_de_passe_confirmation);
        console.log('admin: ', this.state.admin);
        console.log('email regex: ', RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email));
        console.log('pseudo longueur: ', this.state.pseudo.length)

        const pseudoMembre = {pseudo: this.state.pseudo};
        api.post('membre/pseudo', pseudoMembre) // Cette recherche permet de savoir si le pseudo est déjà utilisé
        // axios.post('http://localhost:4242/membre/pseudo', pseudoMembre) // Cette recherche permet de savoir si le pseudo est déjà utilisé
        .then(res => {
            console.log(res.data);
            const nouveauMembre ={ // Regroupe les informations à envoyer au backend pour la création de l'utilisateur
                pseudo: this.state.pseudo,
                email: this.state.email,
                mot_de_passe: this.state.mot_de_passe,
                mot_de_passe_confirmation: this.state.mot_de_passe_confirmation,
                date_de_naissance: this.state.date_de_naissance,
                ville: this.state.ville,
                admin: this.state.admin
            }

            const nouvelleCollection ={ // Regroupe les informations à envoyer au backend pour la création de la collection de bédés
                proprietaire: this.state.pseudo
            }
    
            if(this.state.mot_de_passe === this.state.mot_de_passe_confirmation
                && RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email)
                && this.state.pseudo.length > 4
                && this.state.pseudo.length < 21) {
                console.log('dans le if');
                this.setState({membre_cree: true});
                // axios.post('http://localhost:4242/membre/inscription', nouveauMembre) // Cette requête permet d'enregistrer le nouveau membre
                api.post('membre/inscription', nouveauMembre) // Cette requête permet d'enregistrer le nouveau membre
                    .then(res => console.log(res.data));
                
                    this.setState({ // to reinitialyse the form after being submitted
                    pseudo: "",
                    email: "",
                    mot_de_passe: "",
                    mot_de_passe_confirmation: "",
                    date_de_naissance: "",
                    ville: "",
                    admin: false, // Commenter cette ligne si on veut cérer un administrateur (à faire aussi dans le model membre du back et en ligne 26)
                    redirection: true
                    })

                    api.post('collection/creation', nouvelleCollection); // Cette requête permet de créer la collection dès l'inscription du nouveau membre

            } else if (this.state.mot_de_passe !== this.state.mot_de_passe_confirmation
                && RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email) === false){
                console.log('dans le else');
                this.setState({
                email_correct: false,
                mot_de_passe_correct: false
                });    
            } else if (this.state.mot_de_passe !== this.state.mot_de_passe_confirmation){
                this.setState({mot_de_passe_correct: false});
            } else if (RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email) === false){
                this.setState({email_correct: false})
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({pseudo_existe: true})
        });
    }

    render() {
        if (this.state.redirection) { // Redirige vers la page de connexion
         return <Redirect to="/connexion"/>;
        }
        return(
            <div style={{marginTop: 20}}>
                <h3>Inscription</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Pseudo: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Choisissez votre pseudonyme"
                                value={this.state.pseudo}
                                onChange={this.onChangePseudo}
                                />
                        {this.state.pseudo.length < 5 && this.state.pseudo.length !== 0 &&
                        <p style={{color: "red"}}>5 charactères minimum pour le pseudonyme !</p>
                        }
                        {this.state.pseudo.length > 20 &&
                        <p style={{color: "red"}}>20 charactères maximum pour le pseudonyme !</p>
                        }
                        {this.state.pseudo_existe === true &&
                        <p style={{color: "red"}}>Pseudonyme déjà utilisé !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Votre email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                        {this.state.email_correct === false &&
                        <p style={{color: "red"}}>Email non conforme !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Mot de passe: </label>
                        <input  type="password"
                                className="form-control"
                                placeholder="Votre mot de passe"
                                value={this.state.mot_de_passe}
                                onChange={this.onChangeMotDePasse}
                                />
                    </div>
                    <div className="form-group">
                        <label>Confirmation du mot de passe: </label>
                        <input  type="password"
                                className="form-control"
                                placeholder="Confirmez votre mot de passe"
                                value={this.state.mot_de_passe_confirmation}
                                onChange={this.onChangeMotDePasseConfirmation}
                                />
                        {this.state.mot_de_passe_correct === false &&
                        <p style={{color: "red"}}>Le mot de passe et sa confirmation doivent correspondre !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Date de naissance:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.date_de_naissance}
                                onChange={this.onChangeDateDeNaissance}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ville: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dans quelle ville vivez-vous ?"
                                value={this.state.ville}
                                onChange={this.onChangeVille}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Inscription" className="btn btn-primary" />
                    </div>
                    {this.state.membre_cree === true &&
                        <h4 style={{color: "green"}}>Nouvelle utilisateur crée !</h4>
                        }
                </form>
                
            </div>
        )
    }
}