import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import api from '../api';
// import LoginProfile from './user-session.component';

export default class ConnexionMembre extends Component {

    constructor(props) {
        super(props);

        this.onChangePseudo = this.onChangePseudo.bind(this); // To make sure the connection will make with setState
        this.onChangeMotDePasse = this.onChangeMotDePasse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            pseudo: "",
            mot_de_passe: "",
            type: false,
            connection_fail: false,
            redirection: false,
            cookies: new Cookies(),
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
        e.preventDefault(); // to prevent default submit behaviour

        console.log("Form submitted:");

        const Membre ={
            pseudo: this.state.pseudo,
            mot_de_passe: this.state.mot_de_passe,
        }

        // axios.post('http://localhost:4242/membre/connexion', Membre)
        api.post('membre/connexion', Membre)
            .then(res => {
                let membreConnecte = res.data.membre;
                console.log(membreConnecte);
                console.log("Connexion réussie !!");
                 // Le cookie a une vie de 24h (86400 secondes)

                let dureeVieCookie= {path: '/', maxAge: 86400, sameSite:'Strict'};

                this.state.cookies.set('Session', membreConnecte.pseudo, dureeVieCookie);
                this.state.cookies.set('Session_id', membreConnecte._id, dureeVieCookie);
                this.state.cookies.set('Session_admin', membreConnecte.admin, dureeVieCookie);
                this.state.cookies.set('Session_membre', membreConnecte, dureeVieCookie);
                this.setState({ redirection: true });
                // On affecte ce qu'il faut pour la partie App
                this.props.setPseudo(this.state.pseudo);
    
            })
            .catch(err => {
                console.log(err);   
                console.log("Echec de la connexion !!");
                this.setState({connection_fail: true})
            });
    }

    render() {
        const redirection = this.state.redirection;
               if (redirection==true) {
          return <Redirect to="/liste/bede" />
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
                    <div className="form-group">
                        <input type="submit" value="Connexion" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}