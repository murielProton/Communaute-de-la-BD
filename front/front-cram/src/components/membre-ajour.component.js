import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export default class UpdateUser extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDateDeNaissance = this.onChangeDateDeNaissance.bind(this);
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onChangeConfirmMotDePasse = this.onChangeConfirmMotDePasse.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            email: "",
            date_de_naissance:"",
            mot_de_passe: "",
            confirm_mot_de_passe: "",
            date_inscription:"",
            derniere_connexion:"",
            ville:"",
            groupes:"",
            admin: false,
            redirection:true
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

    onChangeConfirmMotDePasse(e) {
        this.setState({
            confirm_mot_de_passe: e.target.value
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
     console.log('login: ', this.state.pseudo);
     console.log('email: ', this.state.email);
     console.log('ville: ', this.state.ville);
     console.log('password: ', this.state.mot_de_passe);
     console.log('confirmPassword: ', this.state.confirm_mot_de_passe);
     console.log('date de naissance: ', this.state.date_de_naissance);
     console.log('type: ', this.state.admin);
    
    
     const membre = {
        pseudo: this.state.pseudo,
        email: this.state.email,
        date_de_naissance:this.state.date_de_naissance,
        mot_de_passe: this.state.mot_de_passe,
        confirm_mot_de_passe: this.state.confirm_mot_de_passe,
        ville: this.state.ville,
        date_inscription:this.state.date_inscription,
        derniere_connexion:this.state.derniere_connexion,
        ville:this.state.ville,
        groupes:this.state.groupes,
        admin: this.state.admin
    };
const id= this.props.match.params.id
    axios.post('http://localhost:4242/membre/ajour/'+id, membre)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            pseudo: "",
            email: "",
            date_de_naissance:"",
            mot_de_passe: "",
            confirm_mot_de_passe: "",
            date_inscription:"",
            derniere_connexion:"",
            ville:"",
            groupes:"",
            admin: false,
            redirection:true
        })
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
                 </div>
                    <div className="form-group">
                        <label>Votre email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                               
                                value={this.state.email}
                                onChange={this.onChangeEmail} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Votre date de naissance: </label>
                        <input 
                                type="date" 
                                className="form-control"
                               
                                value={this.state.date_de_naissance}
                                onChange={this.onChangeDateDeNaissance} required
                                />
                     </div>
                    <div className="form-group">
                        <label>Votre mot de passe: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.mot_de_passe}
                                onChange={this.onChangeMotDePasse} required
                                />
                    </div>
                    <div className="form-group">
                        <label>Confirmez votre mot de passe: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.confirm_mot_de_passe}
                                onChange={this.onChangeConfirmMotDePasse} required
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
                </form>
            </div>
        )
    }
}