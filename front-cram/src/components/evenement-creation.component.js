import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

export default class CreationEvenement extends Component {

    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            nom: "",
            description: "",
            ville: "",
            date: "",
            mot_de_passe_correct: true,
            email_correct: true,
            membre_cree: false,
            redirection: false,
            cookies: new Cookies(),
        }
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }  

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }  
    onSubmit(e) {
        e.preventDefault(); // Permet d'éviter l'envoi de champs vides

        console.log("Form submitted:");
        console.log('pseudo: ', this.state.nom);
        console.log('descriptl: ', this.state.description);
        console.log('ville: ', this.state.ville);
            
    
            const  evenement= {
                nom: this.state.nom,
                description: this.state.description,
                ville: this.state.ville,
                date:this.state.date,
                cree_par: this.state.cookies.get('Session')
            };
            api.post('evenement/creer', evenement)
                .then(res => console.log(res.data));
                
                this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
                    nom: "",
                    description: "",
                    ville:'',
                    date:"",
                    redirection:true
                })
            }
        
    render() {
        if (this.state.redirection) {
         //Redirect to the page
         return <Redirect to="/liste/evenement"/>;
        }
        return(
            <div style={{marginTop: 20}}>
                <h3>Creer un Evênement</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nom: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Nom de l'évênement"
                                value={this.state.nom}
                                onChange={this.onChangeNom}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="textarea"
                                className="form-control"
                                placeholder="Quel type, lieu,.."
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date de l'évênement:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ville: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dans quelle ville est l'évenement ?"
                                value={this.state.ville}
                                onChange={this.onChangeVille}
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