import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class AjoutBede extends Component {

    constructor(props){
        super(props);

        this.onChangeSerie = this.onChangeSerie.bind(this); // Pour être sûr que la connexion se fasse avec setState
        this.onChangeTitre = this.onChangeTitre.bind(this);
        this.onChangeTome = this.onChangeTome.bind(this);
        this.onChangeScenariste = this.onChangeScenariste.bind(this);
        this.onChangeDessinateur = this.onChangeDessinateur.bind(this);
        this.onChangeEditeur = this.onChangeEditeur.bind(this);
        this.onChangeAnneeParution = this.onChangeAnneeParution.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            serie: "",
            titre: "",
            tome: "",
            scenariste: [],
            dessinateur: [],
            editeur: "",
            annee_parution: "",
            redirection: false,
            bede_cree: false,
            serie_correct: true,
            titre_correct: true,
            tome_correct: true,
            cookies: new Cookies(),
        }
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

        const nouvelleBede = {
            serie: this.state.serie,
            titre: this.state.titre,
            tome: this.state.tome,
            scenariste: this.state.scenariste,
            dessinateur: this.state.dessinateur,
            editeur: this.state.editeur,
            annee_parution: this.state.annee_parution,
            derniere_modification: this.state.cookies.get('Session'),
        }

        if(this.state.serie.length > 0
            && this.state.titre.length > 0
            && this.state.tome.length > 0) {
                console.log('dans le if');
                api.post('bede/ajout', nouvelleBede) // Cette requête permet d'ajouter la nouvelle bédé
                    .then(res => {
                    api.get('collection/ajouter/' + res.data._id + '/' + this.state.cookies.get('Session')) // Intègre la bédé crée à la collection
                    console.log("Resultat enregistrement: ", res.data)
                    });
                    console.log('après la requête dans le back');
                    console.log('Nouvelle bd: ', nouvelleBede);
                    console.log("id enregistré: ", this.state.id_bede_a_ajouter_dans_collection);
        
                    this.setState({
                        // serie: "",
                        titre: "",
                        tome: "",
                        // scenariste: [],
                        // dessinateur: [],
                        editeur: "",
                        annee_parution: "",
                        redirection: true,
                        bede_cree: true,
                    })

                    // .catch(err => {
                    //     console.log(err);
                    // })
        } else if (this.state.titre.length === 0
            && this.state.serie.length === 0
            && this.state.tome.length === 0) {
                    this.setState({
                        serie_correct: false,
                        titre_correct: false,
                        tome_correct: false
                        })
        } else if (this.state.titre.length === 0) {
            this.setState({titre_correct: false})
        } else if (this.state.serie.length === 0) {
            this.setState({serie_correct: false})
        } else if (this.setState.tome.length === 0) {
            this.setState({tome_correct: false})
        }
    }

    render() {
        // if (this.state.redirection) { // Redirige vers la collection de l'utilisateur
        // return <Redirect to={`/collection/rechercher/ajouter`}/>;
        //    }

        return(
            <div style={{marginTop: 20}}>
            <h3>Ajouter une nouvelle bande dessinée</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>**Série: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Merci de respecter la nomenclature: La Quête de l'Oiseau du Temps, Universal War One...."
                                value={this.state.serie}
                                onChange={this.onChangeSerie}
                                />
                        {this.state.serie_correct === false &&
                        <p style={{color: "red"}}>Nom de la série obligatoire !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>**Titre: </label>                        
                        <input  type="text"
                                className="form-control"
                                placeholder="Merci de respecter la nomenclature: La conque de Ramor, Le déluge..."
                                value={this.state.titre}
                                onChange={this.onChangeTitre}
                                />
                        {this.state.titre_correct === false &&
                        <p style={{color: "red"}}>Titre du tome obligatoire !</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>**Tome: </label>
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
                        <input type="submit" value="Ajouter" className="btn btn-primary" />
                    </div>
                    {this.state.bede_cree === true &&
                        <h4 style={{color: "green"}}>Nouvelle bande dessinée créée et ajoutée à votre collection !
                        Voulez-vous ajouter le tome suivant ou retourner à votre <Link to={"/collection/afficher/" + this.state.cookies.get('Session')}>collection</Link></h4>
                        }
                </form>
            </div>
        )
    }
}