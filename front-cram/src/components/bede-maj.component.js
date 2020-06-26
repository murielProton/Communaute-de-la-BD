import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class MajBede extends Component {

    constructor(props){
        super(props);

        this.onChangeSerie = this.onChangeSerie.bind(this); // Pour être sûr que la connexion se fasse avec setState
        this.onChangeTitre = this.onChangeTitre.bind(this);
        this.onChangeTome = this.onChangeTome.bind(this);
        this.onChangeScenariste = this.onChangeScenariste.bind(this);
        this.onChangeDessinateur = this.onChangeDessinateur.bind(this);
        this.onChangeEditeur = this.onChangeEditeur.bind(this);
        this.onChangeAnneeParution = this.onChangeAnneeParution.bind(this);
        this.onChangeResume = this.onChangeResume.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            serie: "",
            titre: "",
            tome: "",
            scenariste: [],
            dessinateur: [],
            editeur: "",
            annee_parution: "",
            resume: "",
            redirection: false,
            bede_cree: false,
            serie_correct: true,
            titre_correct: true,
            tome_correct: true,
            bede_maj: false,
        }
    }

    componentDidMount() { // Permet de récupérer les données de la bédé à modifier afin de les avoir dans le formulaire en valeurs par défaut
        api.get('bede/prendrecontenu/' + this.props.match.params.id)
            .then(res => {
                console.log("id pour avoir le contenu de la bédé: ", this.props.match.params.id);
                this.setState({
                    serie: res.data.serie,
                    titre: res.data.titre,
                    tome: res.data.tome,
                    scenariste: res.data.scenariste,
                    dessinateur: res.data.dessinateur,
                    editeur: res.data.editeur,
                    annee_parution: res.data.annee_parution,
                    resume: res.data.resume,
                })
                console.log("Série: ", this.state.serie);
                console.log("Titre: ", this.state.titre);
                console.log("Tome: ", this.state.tome);
                console.log("Scénariste: ", this.state.scenariste);
                console.log("Dessinateur: ", this.state.dessinateur);
                console.log("Editeur: ", this.state.editeur);
                console.log("Année de parution: ", this.state.annee_parution);
                console.log("Résumé: ", this.state.resume);
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    onChangeSerie(e) {
        this.setState({
            serie: e.target.value
        });
    }

    onChangeTitre(e) {
        this.setState({
            titre: e.target.value
        });
    }

    onChangeTome(e) {
        this.setState({
            tome: e.target.value
        });
    }

    onChangeScenariste(e) {
        this.setState({
            scenariste: e.target.value
        });
    }

    onChangeDessinateur(e) {
        this.setState({
            dessinateur: e.target.value
        });
    }

    onChangeEditeur(e) {
        this.setState({
            editeur: e.target.value
        });
    }

    onChangeAnneeParution(e) {
        this.setState({
            annee_parution: e.target.value
        });
    }

    onChangeResume(e) {
        this.setState({
            resume: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // Permet d'éviter l'envoi de champs vides

        console.log('Formulaire envoyé');
        console.log('Série: ', this.state.serie);
        console.log('Titre: ', this.state.titre);
        console.log('Tome: ', this.state.tome);
        console.log('Scenariste: ', this.state.scenariste);
        console.log('Dessinateur: ', this.state.dessinateur);
        console.log('Editeur: ', this.state.editeur);
        console.log('Année de parution: ', this.state.annee_parution);
        console.log('resumé: ', this.state.resume);

        const majBede = {
            serie: this.state.serie,
            titre: this.state.titre,
            tome: this.state.tome,
            scenariste: this.state.scenariste,
            dessinateur: this.state.dessinateur,
            editeur: this.state.editeur,
            annee_parution: this.state.annee_parution,
            resume: this.state.resume,
        }

        api.post('bede/maj/' + this.props.match.params.id, majBede)
            .then(response => {
                console.log("retour de l'api.post: ", response.data);
                this.setState({
                    redirection: true,
                    bede_maj: true,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.redirection) {
               return <Redirect to={`/collection/bd/detail/${this.props.match.params.id}`}/>;
           }

        return(
            <div style={{marginTop: 20}}>
            <h3>Ajouter une nouvelle bande dessinée</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Série: **</label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Nom de la série"
                                value={this.state.serie}
                                onChange={this.onChangeSerie}
                                />
                        {this.state.serie_correct === false &&
                        <p style={{color: "red"}}>Nom de la série obligatoire !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Titre: **</label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Titre du tome"
                                value={this.state.titre}
                                onChange={this.onChangeTitre}
                                />
                        {this.state.titre_correct === false &&
                        <p style={{color: "red"}}>Titre du tome obligatoire !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Tome: **</label>
                        <input  type="number"
                                // className="form-control"
                                min="0"
                                value={this.state.tome}
                                onChange={this.onChangeTome}
                                />
                        {this.state.tome_correct === false &&
                        <p style={{color: "red"}}>Numéro du tome obligatoire !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Scénariste: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Scénariste de la bande dessinée"
                                value={this.state.scenariste}
                                onChange={this.onChangeScenariste}
                                />
                    </div>
                    <div className="form-group">
                        <label>Dessinateur: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dessinateur de la bande dessinée"
                                value={this.state.dessinateur}
                                onChange={this.onChangeDessinateur}
                                />
                    </div>
                    <div className="form-group">
                        <label>Editeur: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Editeur de la bande dessinée"
                                value={this.state.editeur}
                                onChange={this.onChangeEditeur}
                                />
                    </div>
                    <div className="form-group">
                        <label>Année de parution:</label>
                        <input type="number"
                                // className="form-control"
                                min="0"
                                value={this.state.annee_parution}
                                onChange={this.onChangeAnneeParution}
                                />
                    </div>
                    <div className="form-group">
                        <label>Résumé:</label>
                        <textarea className="form-control"
                                    rows={5}
                                    value={this.state.resume}
                                    onChange={this.onChangeResume}
                                    />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modifier" className="btn btn-primary" />
                    </div>
                    {this.state.bede_maj === true &&
                        <h4 style={{color: "green"}}>Nouvelle bande dessinée modifiée !</h4>
                        }
                </form>
            </div>
        )
    }
}