import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../api';

export default class AjouterAvis extends Component {
    constructor(props){
        super(props);

        this.onChangeContenu = this.onChangeContenu.bind(this); // Pour être sûr que la connexion se fera avec setState
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            redirection: false,
            contenu: "",
            serie_bede: "",
            tome_bede: "",
            cookies: new Cookies(),
            auteur: "",
            bedes: []
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        
        
        api.get('bede/detail/'+this.props.match.params.id)
            .then(response => {
                console.log("retour du back: ", response.data);
                this.setState({ 
                    bedes: response.data,
                    serie_bede: response.data.serie,
                    tome_bede: response.data.tome,
                 });
             
            })
            .catch(function (err) {
                console.log(err);
            });
    
    }

    onChangeContenu(e) {
        this.setState({
            contenu: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // pour éviter d'envoyer des formulaires vides

        console.log("Formulaire envoyé:");
        console.log('Contenu: ', this.state.contenu);
        
        const NouvelAvis = {
            contenu: this.state.contenu,
            auteur: this.state.cookies.get('Session'),
            serie_bede: this.props.match.params.bd_serie,
            tome_bede: this.props.match.params.bd_tome,
        }

        console.log("NouvelAvis: ", NouvelAvis);

        api.post('avis/ajouter/' + this.props.match.params.id, NouvelAvis)
            .then(res => {
                console.log("Resultat de la requête ajouter un avis: ", res.data);
                console.log("Nouvel avis ajouté à la bande-dessinée");
                this.setState({ redirection: true });
                console.log("knows the autor here ? ", this.state.post_author);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        if (!this.state.cookies.get('Session')) { //Empêche d'acceder à la pages aux personnes non connectées
        return(
            <div>
                <h5>Bonjour, </h5>
                <h5>Cette page est reservée aux membres, pour y accéder vous devez soit vous 
                    <Link to={"/connexion"}> connecter</Link> soit vous 
                    <Link to={"/inscription"}> inscrire</Link>.</h5>

            </div>
        )}

        if (this.state.redirection) { // Redirige vers la page du détail de la bede pour laquelle un avis a été déposé
            return <Redirect to={`/bd/detail/${this.props.match.params.id}`}/>;
           }
        
        return(
            <div style={{marginTop: 20}}>

            {this.state.bedes.map(bede =>( 
                <div class="card-container">  
                            <p key={bede.uid}>Serie : {bede.serie}</p>
                            <p key={bede.uid}>Tome : {bede.tome}</p>
                            <p key={bede.uid}>Titre : {bede.titre}</p>
                            <p key={bede.uid}>Scénario: {bede.scenariste}</p>
                            <p key={bede.uid}>Dessins: {bede.dessinateur}</p>
                            <p key={bede.uid}>Editeur : {bede.editeur}</p>
                            <p key={bede.uid}>Année de parution : {bede.annee_parution}</p>
                </div>
             ) )} 
            
            <h3>Ajouter un avis</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea  type="text"
                                className="form-control"
                                rows={5}
                                placeholder="Votre avis"
                                value={this.state.contenu}
                                onChange={this.onChangeContenu}
                                />
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Envoyer mon avis" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}