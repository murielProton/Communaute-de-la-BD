import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import api from '../api';
// import LoginProfile from './user-session.component';

export default class ValidMajMembre extends Component {

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
        console.log('pseudo: ', this.state.pseudo);
        console.log('mot de passe: ', this.state.mot_de_passe);

        const Membre ={
            pseudo: this.state.pseudo,
            mot_de_passe: this.state.mot_de_passe,
        }
        const id= this.props.match.params.id
        // axios.post('http://localhost:4242/membre/connexion', Membre)
        api.post('membre/validmaj/'+id, Membre)
            .then(res => {
                console.log(res.data);
                console.log("Connexion validMaj réussie !!");
               // this.state.cookies.set('Session', this.state.pseudo, {path: '/', maxAge: 300, sameSite:'Strict'});
               // console.log("cookie", this.state.cookies.get('Session'));
                // LoginProfile.setName(this.state.login);
                // localStorage.setItem('username', this.state.login);
                this.setState({ redirection: true })
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
         return <Redirect to={`/choixmaj/${this.props.match.params.id}`}/>;
         }
        return(
            <div style={{marginTop: 20}}>
                <h3>Indiquez à nouveaux vos identifiants pour pouvoir modifier votre compte</h3>
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
                    <div className="form-group">
                        <input type="submit" value="Valider" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}