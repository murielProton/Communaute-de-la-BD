import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class CreationPartenaire extends Component {

    constructor(props) {
        super(props);
        
        this.onChangeNom = this.onChangeNom.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onChangeAdresse = this.onChangeAdresse.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeEmailContact = this.onChangeEmailContact.bind(this);
        this.onChangeTelContact = this.onChangeTelContact.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);
        this.onChangeDateDebutPub = this.onChangeDateDebutPub.bind(this);
        this.onChangeDateFinPub = this.onChangeDateFinPub.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            nom: "",
           adresse: "",
            ville: "",
            secteur:"",
            contact:"",
            email_contact:"",
            tel_contact:"",
            debut_pub: "",
            fin_pub:"",
            mot_de_passe_correct: true,
            email_correct: true,
            membre_cree: false,
            redirection: false
        }
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        });
    }

    onChangeAdresse(e) {
        this.setState({
            adresse: e.target.value
        });
    }

    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }  

    onChangeSecteur(e) {
        this.setState({
            secteur: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    } 
    onChangeEmailContact(e) {
        this.setState({
            email_contact: e.target.value
        });
    }
    onChangeTelContact(e) {
        this.setState({
            tel_contact: e.target.value
        });
    }

    onChangeDateDebutPub(e) {
        this.setState({
            debut_pub: e.target.value
        });
    }
    onChangeDateFinPub(e) {
        this.setState({
            fin_pub: e.target.value
        });
    } 

    onSubmit(e) {
        e.preventDefault(); // Permet d'éviter l'envoi de champs vides

        console.log("Form submitted:");
        console.log('nom: ', this.state.nom);
        console.log('dadresse: ', this.state.adresse);
        console.log('ville: ', this.state.ville);
             
    
            const  partenaire= {
                nom: this.state.nom,
                adresse: this.state.adresse,
                ville: this.state.ville,
                secteur: this.state.secteur,
                contact: this.state.contact,
                email_contact:this.state.email_contact,
                tel_contact:this.state.tel_contact,
                debut_pub:this.state.debut_pub,
                fin_pub:this.state.fin_pub,
            };
            api.post('partenaire/creer', partenaire)
                .then(res => console.log(res.data));
                
                this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
                nom: "",
                adresse: "",
                 ville: "",
                 secteur:"",
                 contact: "",
                email_contact:"",
                tel_contact:"",
                 debut_pub: "",
                 fin_pub:"",
                    redirection:true
                })
            }
        
    render() {
        if (this.state.redirection) {
         //Redirect to the page
         return <Redirect to="/admin/liste/partenaire"/>;
        }
        return(
            <div style={{marginTop: 20}}>
                <h3>Creer un Partenaire</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nom du partenaire: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Nom du partenaire"
                                value={this.state.nom}
                                onChange={this.onChangeNom}
                                />
                    </div>
                    <div className="form-group">
                        <label>Adresse: </label>
                        <input  type="textarea"
                                className="form-control"
                                placeholder="Rue , Avenue, Code Postal"
                                value={this.state.adresse}
                                onChange={this.onChangeAdresse}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ville: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dans quelle ville est le partenaire ?"
                                value={this.state.ville}
                                onChange={this.onChangeVille}
                                />
                    </div>
                    <div className="form-group">
                        <label>Secteur: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Bd , manga,... ?"
                                value={this.state.secteur}
                                onChange={this.onChangeSecteur}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Mme , Mr ..."
                                value={this.state.contact}
                                onChange={this.onChangeContact}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email du contact: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder=" ....@...;"
                                value={this.state.email_contact}
                                onChange={this.onChangeEmailContact}
                                />
                    </div>
                    <div className="form-group">
                        <label>Telephone du contact: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="06 07 05 ..."
                                value={this.state.tel_contact}
                                onChange={this.onChangeTelContact}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date de début la pub:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.debut_pub}
                                onChange={this.onChangeDateDebutPub}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date de fin la pub:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.fin_pub}
                                onChange={this.onChangeDateFinPub}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Enregistrer" className="btn btn-primary" />
                    </div>
                   
                </form>
                
            </div>
        )
    }
}