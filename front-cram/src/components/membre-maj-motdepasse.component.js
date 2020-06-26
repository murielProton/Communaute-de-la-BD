import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../api';

export default class MajMotDePasseMembre extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onChangeMotDePasseConfirmation = this.onChangeMotDePasseConfirmation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            email: "",
            mot_de_passe: "",
            mot_de_passe_confirmation: "",
            date_de_naissance:"",
            ville:"",
            date_inscription:"",
            derniere_connexion:"",
            groupes:"",
            admin: false,
            mot_de_passe_correct: true,
            email_correct: true,
            membre_maj: false,
            pseudo_existe: false,
            redirection:false
        }
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
    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('pseudo: ', this.state.pseudo);
     console.log('email: ', this.state.email);
     console.log('ville: ', this.state.ville);
     console.log('confirmPassword: ', this.state.mot_de_passe_confirmation);
     console.log('date de naissance: ', this.state.date_de_naissance);
     console.log('type: ', this.state.admin);
    
     const membre = {
        pseudo: this.state.pseudo,
        email: this.state.email,
        date_de_naissance:this.state.date_de_naissance,
        mot_de_passe: this.state.mot_de_passe,
        mot_de_passe_confirmation: this.state.mot_de_passe_confirmation,
        ville: this.state.ville,
        date_inscription:this.state.date_inscription,
        derniere_connexion:this.state.derniere_connexion,
        ville:this.state.ville,
        groupes:this.state.groupes,
        admin: this.state.admin
    };

const id= this.props.match.params.id
if( this.state.mot_de_passe === this.state.mot_de_passe_confirmation) {
    console.log('dans le if du mot de passe');
    this.setState({membre_maj: true});
    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('membre/majmotdepasse/'+id, membre)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            pseudo: "",
            email: "",
            date_de_naissance:"",
            mot_de_passe: "",
            mot_de_passe_confirmation: "",
            date_inscription:"",
            derniere_connexion:"",
            ville:"",
            groupes:"",
            admin: false,
            redirection:true
        })
    
}
else if (this.state.mot_de_passe !== this.state.mot_de_passe_confirmation){
    this.setState({mot_de_passe_correct: false});}
    }

    render() {
        // if (this.state.redirection)
        // {
        //     return <Redirect to='/liste/membres'/>;
        // } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour mon mot de passe</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Valider le changement de mot de passe" className="btn btn-primary" />
                    </div>
                    {this.state.membre_maj === true &&
                        <h4 style={{color: "green"}}>Mot de passe modifié !</h4>
                        }
                </form>
                <Link to={"/profil/"+ this.props.match.params.id} className="btn btn-primary"> Retour à mon profil</Link>
            </div>
        )
    }
}