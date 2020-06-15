import React, { Component } from 'react';
import { Redirect } from 'react-router'
import api from '../api';

export default class MajMembre extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDateDeNaissance = this.onChangeDateDeNaissance.bind(this);
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onChangeMotDePasseConfirmation = this.onChangeMotDePasseConfirmation.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
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
    componentDidMount(){
        api.get('membre/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver ses paramètres:",this.props.match.params.id);
            this.setState({
                pseudo: response.data.pseudo,
                email: response.data.email,
                date_de_naissance:response.data.date_de_naissance,
                mot_de_passe: response.data.mot_de_passe,
                mot_de_passe_confirmation: response.data.mot_de_passe_confirmation,
                date_inscription:response.data.date_inscription,
                derniere_connexion:response.data.derniere_connexion,
                ville:response.data.ville,
                groupes:response.data.groupes,
                admin: response.data.admin,
                redirection:false
            })
            console.log("admin", this.state.admin)
        })
        .catch(function(err){
            console.log(err);
        })
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
    onChangeDateDeNaissance(e) {
        this.setState({
            date_de_naissance: e.target.value
        });
    }

    onChangeMotDePasse(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeMotDePasseConfirmation(e) {
        this.setState({
            mot_de_passe_confirmation: e.target.value
        });
    }
    
    onChangeVille(e) {
        this.setState({
            ville: e.target.value
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
if( RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email)
    && this.state.pseudo.length > 4
    && this.state.pseudo.length < 21) {
    console.log('dans le if');
    this.setState({membre_maj: true});
    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('membre/maj/'+id, membre)
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
    }else if (!RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(this.state.email) ){
        this.setState({email_correct: false})
    }
}

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour de mon profil</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Votre pseudo: </label>
                        <input 
                                type="texte" 
                                className="form-control"
                               
                                value={this.state.pseudo}
                                onChange={this.onChangePseudo} required
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
                        <label>Votre email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                               
                                value={this.state.email}
                                onChange={this.onChangeEmail} required
                                />
                                {this.state.email_correct === false &&
                        <p style={{color: "red"}}>Email non conforme !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Votre date de naissance: </label>
                        <input 
                                type="text" 
                                className="form-control"
                               
                                value={this.state.date_de_naissance}
                                onChange={this.onChangeDateDeNaissance} required
                                />
                     </div>
                    <div className="form-group">
                        <label>Votre ville: </label>
                        <input 
                                type="text" 
                                className="form-control"
                               
                                value={this.state.ville}
                                onChange={this.onChangeVille} required
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modifier mon compte" className="btn btn-primary" />
                    </div>
                    {this.state.membre_maj === true &&
                        <h4 style={{color: "green"}}>Nouvelle utilisateur crée !</h4>
                        }
                </form>
            </div>
        )
    }
}