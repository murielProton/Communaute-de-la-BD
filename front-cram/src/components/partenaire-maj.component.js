import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import api from '../api';

export default class MajPartenaire extends Component {

    constructor(props) {
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onChangeAdresse = this.onChangeAdresse.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeEmailContact = this.onChangeEmailContact.bind(this);
        this.onChangeTelContact = this.onChangeTelContact.bind(this);
        this.onChangeDateDebutPub = this.onChangeDateDebutPub.bind(this);
        this.onChangeDateFinPub = this.onChangeDateFinPub.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: "",
           adresse: "",
            ville: "",
            secteur:"",
            contact:"",
            email_contact:"",
            tel_contact:"",
            debut_pub: "",
            fin_pub:"",
            mot_de_passe_correct: true,
            email_correct: true,
            membre_cree: false,
            redirection: false
        }
    }
    componentDidMount(){
        api.get('partenaire/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver paramètres message:",this.props.match.params.id);
            this.setState({
                nom: response.data.nom,
                adresse:response.data.adresse,
                 ville: response.data.ville,
                 secteur:response.data.secteur,
                 contact:response.data.contact,
                 email_contact:response.data.email_contact,
                 tel_contact:response.data.tel_contact,
                 debut_pub: response.data.debut_pub,
                 fin_pub:response.data.fin_pub,
                redirection:false
            })
            console.log("adresse", this.state.adresse)
        })
        .catch(function(err){
            console.log(err);
        })
    }
    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        });
    }

    onChangeAdresse(e) {
        this.setState({
            adresse: e.target.value
        });
    }

    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }  

    onChangeSecteur(e) {
        this.setState({
            secteur: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    } 
    onChangeEmailContact(e) {
        this.setState({
            email_contact: e.target.value
        });
    }
    onChangeTelContact(e) {
        this.setState({
            tel_contact: e.target.value
        });
    }

    onChangeDateDebutPub(e) {
        this.setState({
            debut_pub: e.target.value
        });
    } 

    onChangeDateFinPub(e) {
        this.setState({
            fin_pub: e.target.value
        });
    } 

    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('nom: ', this.state.nom);
     console.log('message:', this.state.adresse);
    
    
     const partenaire = {
                nom: this.state.nom,
                adresse: this.state.adresse,
                ville: this.state.ville,
                secteur: this.state.secteur,
                contact: this.state.contact,
                email_contact:this.state.email_contact,
                tel_contact:this.state.tel_contact,
                debut_pub:this.state.debut_pub,
                fin_pub:this.state.fin_pub,
    };
const id= this.props.match.params.id

    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('partenaire/maj/'+id, partenaire)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
        nom: "",
        adresse: "",
         ville: "",
         secteur:"",
         contact: "",
        email_contact:"",
        tel_contact:"",
         debut_pub: "",
         fin_pub:"",
            redirection:true
        })
   
}

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/admin/liste/partenaire'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour du partenaire:  {this.state.nom}</h3>
                <form onSubmit={this.onSubmit}>  
                <div className="form-group">
                        <label>Nom: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Nom de l'évenement"
                                value={this.state.nom}
                                onChange={this.onChangeNom}
                                />
                    </div>
                    <div className="form-group">
                        <label>Adresse: </label>
                        <input  type="textarea"
                                className="form-control"
                                placeholder="Rue , Avenue, Code Postal"
                                value={this.state.adresse}
                                onChange={this.onChangeAdresse}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ville: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dans quelle ville vivez-vous ?"
                                value={this.state.ville}
                                onChange={this.onChangeVille}
                                />
                    </div>
                    <div className="form-group">
                        <label>Secteur: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Bd , manga,... ?"
                                value={this.state.secteur}
                                onChange={this.onChangeSecteur}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date de début la pub:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.debut_pub}
                                onChange={this.onChangeDateDebutPub}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date de fin la pub:</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.fin_pub}
                                onChange={this.onChangeDateFinPub}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Enregistrer" className="btn btn-primary" />
                    </div>
                </form>
                <Link to={"/liste/partenaire"} className="btn btn-primary"> Retour aux partenaires</Link>
            </div>
        )
    }
}