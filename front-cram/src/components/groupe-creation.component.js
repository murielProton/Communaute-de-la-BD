import React, { Component } from 'react';
import api from '../api';
import Cookies from 'universal-cookie';
// Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class GroupeCreation extends Component {

    constructor(props) {
        super(props);

        console.log("je suis dans constructor groupe creation.");
        this.onChangeNom_groupe = this.onChangeNom_groupe.bind(this);
        this.onChangeAdmin_groupe = this.onChangeAdmin_groupe.bind(this);
        this.handleChangePrive = this.handleChangePrive.bind(this);
        this.onChangeDate_c_g = this.onChangeDate_c_g.bind(this);
        this.handleChangeMembresGroupe = this.handleChangeMembresGroupe .bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            nom_groupe: "",
            admin_groupe: "",
            prive: true,
            date_c_g: "",
            membres_groupe: [],
            redirect: false,
            cookies: new Cookies(),
            listeMembres: [],
            err: []
        }
    }

    //componentDidMount permet de recharcher la liste à chaque fois qu'on vient sur cette page.
    componentDidMount() {
        this.getListeMembres();
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
    handleChangePrive(e) {
        const target = e.target;
        const value = target.name === 'prive' ?
            target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onChangeDate_c_g(e) {
        this.setState({
            date_c_g: e.target.value
        });
    }

    handleChangeMembresGroupe(e) {
        const target = e.target;
        const value = target.name === 'membres_groupe' ?
        target.checked : target.value;
        const name = target.name;
        console.log("handleChangeMembresGroupe"+target.name);
        this.setState({
            [name]: value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        //récupère toutes les fonctions(e) et les traites. Sans cette ligne on ne sait pas quel champ est rempli.
        console.log("On submit groupe création");
        if (!this.state.cookies.get('Session')) {
            let newError = ["Vous n'etes pas connecté."];
            this.setState({ err: newError });
            return;
        }
        let admin_groupe = this.state.cookies.get('Session');
        let date_c_g = new Date();

        var groupeACreer = {
            nom_groupe: this.state.nom_groupe,
            admin_groupe: admin_groupe,
            prive: this.state.prive,
            date_c_g: date_c_g,
            membres_groupe: this.state.membres_groupe
        };
        console.log("Form submitted:");
        console.log(groupeACreer);
        //axios l'application ne connait pas
        // api.post('http://localhost:4242/groupe/creation', pseudoMembre)
        //TODO sécurités front
        //TODO nom de groupe unique en collection
        //TODO 5 charactères minimum pour le nom de votre groupe
        //if (this.state.nom_groupe.length < 37) {
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
                    //pour afficher les membres_groupe avec les _id : pseudo il faudra utiliser le populate + map dans map
                    membres_groupe: [],
                    redirect: true
                });
                //}else{this.setState({err:res.data.err});console.log(res.data.err)}
            }).catch(err => {
                console.log(err);
            });
    }
    getListeMembres(){
        console.log("getListeMembres");
        let url = 'http://localhost:4242/membre/liste';
        api.get(url)
            .then(response => {
                this.setState({listeMembres: response.data});
            }).catch(err => {
                console.log(err);
                this.setState({listeMembres: [] });
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
                    {this.state.err.map((item) =>
                        <h4>{item}</h4>
                    )}
                    <div className="form-group">
                        <label><h4>Nom du groupe:</h4> </label>
                        <input type="text"
                            className="form-control"
                            placeholder="Choisissez le nom de votre groupe."
                            value={this.state.nom_groupe}
                            onChange={this.onChangeNom_groupe}
                        />
                        <div><h4>Privé</h4>
          Décochez la case si vous voulez un groupe privé.
          <p>Toutes vos conversations seront ainsi marqués comme tel.</p></div>
                        <label>
                            privé
          <input
                                name="prive" type="checkbox"
                                checked={this.state.prive}
                                onChange={this.handleChangePrive} />
                        </label>
                    </div>
                    <div>
                        <h3>Choisissez vos membres parmi la liste des membres du site</h3>
                        <table className="table table-striped" style={{ marginTop: 20 }} >
                            <thead>
                                <tr>
                                    <th>Pseudo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listeMembres.map((membre) =>
                                    <tr>
                                        <td> {membre.pseudo}</td>
                                        <td>
                                            <label>
                                            ajouté à la liste des membres de ce groupe.
                                                <input
                                                    name= "membres_groupe" type="checkbox"
                                                    checked={this.state.membres_groupe}
                                                    onChange={this.handleChangeMembresGroupe}
                                                />
                                            </label>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Création" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}