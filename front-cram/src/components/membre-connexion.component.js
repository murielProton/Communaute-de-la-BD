import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import api from '../api';
// import LoginProfile from './user-session.component';

export default class ConnexionMembre extends Component {

    constructor(props) {
        super(props);

        this.onChangePseudo = this.onChangePseudo.bind(this); // Pour être sûr que la connexion se fera avec setState
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            pseudo: "",
            mot_de_passe: "",
            id: "",
            type: false,
            connection_fail: false,
            redirection: false,
            cookies: new Cookies(),
            membre_banni: "",
        }
    }

    onChangePseudo(e) {
        this.setState({
            pseudo: e.target.value
        });
    }

    onChangeMotDePasse(e) {
        this.setState({
            mot_de_passe: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // pour éviter d'envoyer des formulaires vides

        console.log("Formulaire envoyé:");
        console.log('pseudo: ', this.state.pseudo);
        console.log('mot de passe: ', this.state.mot_de_passe);

        const Membre ={
            pseudo: this.state.pseudo,
            mot_de_passe: this.state.mot_de_passe,
        }

        // axios.post('http://localhost:4242/membre/connexion', Membre)
        api.post('membre/connexion', Membre)
            .then(res => {
                console.log(res.data);
                console.log("Connexion réussie !!");

                this.state.cookies.set('Session', this.state.pseudo, {path: '/', maxAge: 86400, sameSite:'Strict'}); // Le cookie a une vie de 24h (86400 secondes)
                this.state.cookies.set('Session_id', res.data._id, {path: '/', maxAge: 86400, sameSite:'Strict'}); // Le cookie a une vie de 24h (86400 secondes)
                this.state.cookies.set('Session_admin', res.data.admin, {path: '/', maxAge: 86400, sameSite:'Strict'}); // Le cookie a une vie de 24h (86400 secondes)
                console.log("cookie", this.state.cookies.get('Session'));

                this.setState({ 
                    redirection: true,
                    membre_banni: res.data,
                 })
                this.props.setPseudo(this.state.pseudo); // Permet de récupérer dans les autres fichiers ce que l'on mets dans le constructeur
            })
            .catch(err => {
                console.log(err);   
                console.log("Echec de la connexion !!");
                this.setState({connection_fail: true})
            });
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
         //Redirect to the page
         return <Redirect to="/"/>;
        }
        return(
            <div style={{marginTop: 20}}>
                <h3>Connexion</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Pseudo: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Votre pseudo"
                                value={this.state.pseudo}
                                onChange={this.onChangePseudo}
                                />
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
                    {this.state.connection_fail === true &&
                        <p style={{color: "red"}}>Pseudonyme ou mot de passe incorrect !</p>
                        }
                        {this.state.membre_banni === "Le membre est banni" &&
                        <h5 style={{color: "red"}}>Vous ne pouvez plus vous connecter ! votre compte est banni</h5>
                        }
                    <div className="form-group">
                        <input type="submit" value="Connexion" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}