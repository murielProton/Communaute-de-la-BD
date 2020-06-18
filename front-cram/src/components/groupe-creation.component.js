import React, { Component } from 'react';
import api from '../api';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import checkboxes from './checkboxes.component';
import Checkbox from './Checkbox.component';
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
        this.handleChangeMembresGroupe = this.handleChangeMembresGroupe.bind(this);
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
            checkedMembres: new Map(),
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
        const membre = e.target.name;
        const isChecked = e.target.checked;
        console.log(membre, isChecked);
        this.setState(prevState => ({
            checkedMembres: prevState.checkedMembres.set(membre, isChecked)
        }));
        
        /*if(membre == isChecked){
            let date_c_g = new Date();
            membres_groupe = membres_groupe.push(date_c_g : membre);
        }*/
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
        /* fonction array membre group */
        let membres = [];
        //membres.push(admin_groupe);
        for (const entry of this.state.checkedMembres.entries()) {
            let pseudo = entry[0];
            let selectionne = entry[1];
            if(selectionne){
                membres.push(pseudo);
            }
        }
        /* fonction array membre group */
        var groupeACreer = {
            nom_groupe: this.state.nom_groupe,
            admin_groupe: admin_groupe,
            prive: this.state.prive,
            date_c_g: date_c_g,
            membres_groupe_as_login: membres
        };
        console.log("Form submitted:");
        console.log(groupeACreer);
        //axios l'application ne connait pas
        // api.post('http://localhost:4242/groupe/creation', pseudoMembre)
        //TODO sécurités front
        if (this.state.nom_groupe == "" || this.state.nom_groupe == null) {
            this.state.err.push("Vous devez donner un nom à votre groupe de discussion.");
            console.log(this.state.err);
        }
        if (this.state.nom_groupe.length>37||this.state.nom_groupe<1){
            this.state.err.push("Le nom de votre groupe doit comprendre entre 1 et 37 charactères.");
            console.log(this.state.err);
        }
        /*if (this.state.prive == "" || this.state.prive == null) {
            this.state.err.push("Vous devez donnez une sécurité à votre groupe : privé ou public.");
            console.log(this.state.err);
        }*/
        //TODO tous les champs doivent être remplis
        //TODO nom de groupe unique en collection
        //TODO 5 charactères minimum pour le nom de votre groupe
        //if (this.state.nom_groupe.length < 37) {
        api.post('/groupe/creation', groupeACreer)
            // cet envoi permet d'enregistrer des nouveaux groupes
            .then(res => {
                //réinitialiser le formulaire après soummission
                this.setState({
                    nom_groupe: "",
                    admin_groupe: "",
                    prive: false,
                    date_c_g: "",
                    //pour afficher les membres_groupe avec les _id : pseudo il faudra utiliser le populate + map dans map
                    membres_groupe: [],
                    redirect: true,
                    err: []
                });
                //}else{this.setState({err:res.data.err});console.log(res.data.err)}
            }).catch(err => {
                console.log(err);
            });
    }

    getListeMembres() {
        console.log("getListeMembres");
        let url = 'http://localhost:4242/membre/liste';
        api.get(url)
            .then(response => {
                this.setState({ listeMembres: response.data });
            }).catch(err => {
                console.log(err);
                this.setState({ listeMembres: [] });
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
                        <React.Fragment>
                            {this.state.listeMembres.map((membre) =>
                            <div>
                                <label key={membre.key}>
                                    {membre.pseudo}
                                    <Checkbox name={membre.pseudo}
                                        checked={this.state.checkedMembres.get(membre.pseudo)}
                                        onChange={this.handleChangeMembresGroupe} />
                                </label>
                            </div>)
                            }
                        </React.Fragment>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Création" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}