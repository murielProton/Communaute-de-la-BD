import React, { Component } from 'react';
import api from '../api';
// Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class GroupeCreation extends Component {

    constructor(props) {
        super(props);
        
        console.log("je suis dans constructor groupe creation.");
        this.onChangeNom_groupe = this.onChangeNom_groupe.bind(this);
        this.onChangeAdmin_groupe = this.onChangeAdmin_groupe.bind(this);
        this.onChangePrive = this.onChangePrive.bind(this);
        this.onChangeDate_c_g = this.onChangeDate_c_g.bind(this);
        this.onChangeMembres = this.onChangeMembres.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom_groupe: "",
            admin_groupe: "",
            prive: false,
            date_c_g: "",
            membres: [],
            redirect: false,
            err : []
        }
    }

    onChangeNom_groupe(e) {
        this.setState({
            nom_groupe: e.target.value,
        });
    }
    onChangeAdmin_groupe(e) {
        this.setState({
            admin_groupe: e.target.value
        });
    }
    onChangePrive(e) {
        this.setState({
            prive: e.target.value
        });
    }

    onChangeDate_c_g(e) {
        this.setState({
            date_c_g: e.target.value
        });
    }

    onChangeMembres(e) {
        this.setState({
            membres: e.target.value
        });
    }
    onSubmit(e) {
       e.preventDefault();
       //récupère toutes les fonctions(e) et les traites. Sans cette ligne on ne sait pas quel champ est rempli.
        console.log("On submit groupe création");
        //let admin_groupe = //récupérer le nom dans la session;
        let date_c_g = new Date();
        //let listeDeMembres = listeDeMembres.push(admin_groupe);
        var groupeACreer = {
            nom_groupe: this.state.nom_groupe,
            admin_groupe: this.state.admin_groupe,
            prive: this.state.prive,
            date_c_g: this.state.date_c_g,
            membres: this.state.membres
        };
        console.log("Form submitted:");
        console.log(groupeACreer);
        //axios l'application ne connait pas
        // api.post('http://localhost:4242/groupe/creation', pseudoMembre)
        //TODO sécurités front
        //TODO nom de groupe unique en collection
        //TODO 5 charactères minimum pour le nom de votre groupe
        //if (this.state.nom_groupe.length < 37) {
        // axios.post('http://localhost:4242/groupe/creation', nouveauMembre) 
        // Cette recherche permet d'enregistrer le nouveau membre
        api.post('/groupe/creation', groupeACreer)
            // cet envoi permet d'enregistrer des nouveaux groupes
            .then(res => {
                //if(){
                //réinitialiser le formulaire après soummission
                this.setState({
                    nom_groupe: "",
                    admin_groupe: "",
                    prive: false,
                    date_c_g: "",
                    //pour afficher les membres avec les _id : pseudo il faudra utiliser le populate + map dans map
                    membres: [],
                    redirect: true
                });
                //}else{this.setState({err:res.data.err});console.log(res.data.err)}
            }).catch(err => {
                console.log(err);
            });
    }
    render() {
        // if (This.state.redirection) {
        //  //Redirect to the page
        //  return <Redirect to="/groupe/listePersonelle"/>;
        // }
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Création d'un groupe de conversation</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nom du groupe: </label>
                        <input type="text"
                            className="form-control"
                            placeholder="Choisissez le nom de votre groupe."
                            value={this.state.nom_groupe}
                            onChange={this.onChangeNom_groupe}
                        />
                        {/* 
                        {this.state.nom_groupe.length < 37 &&
                            this.state.nom_groupe.length !== 0 &&
                            <p style={{ color: "red" }}>5 charactères minimum pour le nom de votre groupe !</p>
                        }
                        {this.state.nom_groupe.length > 37 &&
                            <p style={{ color: "red" }}>37 charactères maximum pour le nom de votre groupe !</p>
                        }*/}
                        {/*this.state.nom_groupe_existe === true &&
                            <p style={{ color: "red" }}>Ce nom de groupe est déjà utilisé !</p>
                        */}
                    </div>
{/*
                    <tbody>
                        <tr>
                            <td><input type="radio" name="privé"
                                value="prive"
                                checked={this.state.prive === "prive"}
                                onChange={this.onChangeBoolean} />{"prive"}
                            </td>
                        </tr>
                    </tbody>
*/}
                    {/*TODO boucle for avec liste des membres et un radio à côté */}
                    <div className="form-group">
                        <input type="submit" value="Création" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}