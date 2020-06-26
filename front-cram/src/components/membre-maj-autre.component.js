import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../api';

export default class MajMembre extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
       
        this.onChangeDateDeNaissance = this.onChangeDateDeNaissance.bind(this);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            email: "",
            mot_de_passe: "",
            mot_de_passe_confirmation: "",
            date_de_naissance:"",
            ville:"",
            date_inscription:"",
            derniere_connexion:"",
            groupes:"",
            admin: false,
            mot_de_passe_correct: true,
            email_correct: true,
            membre_maj: false,
            pseudo_existe: false,
            redirection:false
        }
    }
    componentDidMount(){
        api.get('membre/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver ses paramètres:",this.props.match.params.id);
            this.setState({
                pseudo: response.data.pseudo,
                email: response.data.email,
                date_de_naissance:"",
                mot_de_passe: response.data.mot_de_passe,
                mot_de_passe_confirmation: response.data.mot_de_passe_confirmation,
                date_inscription:response.data.date_inscription,
                derniere_connexion:response.data.derniere_connexion,
                ville:response.data.ville,
                groupes:response.data.groupes,
                admin: response.data.admin,
                redirection:false
            })
            console.log("admin", this.state.admin)
        })
        .catch(function(err){
            console.log(err);
        })
    }

    onChangeDateDeNaissance(e) {
        this.setState({
            date_de_naissance: e.target.value
        });
    }

    
    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();// Permet d'éviter l'envoi de champs vides
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('pseudo: ', this.state.pseudo);
     console.log('email: ', this.state.email);
     console.log('ville: ', this.state.ville);
     console.log('confirmPassword: ', this.state.mot_de_passe_confirmation);
     console.log('date de naissance: ', this.state.date_de_naissance);
     console.log('type: ', this.state.admin);
    
    
     const membre = {
        pseudo: this.state.pseudo,
        email: this.state.email,
        date_de_naissance:this.state.date_de_naissance,
        mot_de_passe: this.state.mot_de_passe,
        mot_de_passe_confirmation: this.state.mot_de_passe_confirmation,
        ville: this.state.ville,
        date_inscription:this.state.date_inscription,
        derniere_connexion:this.state.derniere_connexion,
        ville:this.state.ville,
        groupes:this.state.groupes,
        admin: this.state.admin
    };
const id= this.props.match.params.id
 
    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('membre/majprofil/'+id, membre)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            pseudo: "",
            email: "",
            date_de_naissance:"",
            mot_de_passe: "",
            mot_de_passe_confirmation: "",
            date_inscription:"",
            derniere_connexion:"",
            ville:"",
            groupes:"",
            admin: false,
            redirection:true,
            membre_maj: true
        })
   
}

render() {
    // if (this.state.redirection) {
    //  //Redirect to the page
    //  return <Redirect to="/liste/membres"/>;
    // }
    return(
        <div style={{marginTop: 20}}>
            <h3>Modifier mon profil</h3>
            <form onSubmit={this.onSubmit}>
 
                <div className="form-group">
                    <label>Date de naissance:</label>
                    <input type="date"
                            className="form-control"
                            value={this.state.date_de_naissance}
                            onChange={this.onChangeDateDeNaissance}
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
                    <input type="submit" value="Valider les changements" className="btn btn-primary" />
                </div>
                    {this.state.membre_maj === true &&
                    <div>
                    <h4 style={{color: "green"}}>Email modifié !</h4>
                    {/* <Link to={"/profil/"+ this.props.match.params.id} className="btn btn-primary"> Retour à mon profil</Link> */}
                    </div>
                    } 
                <Link to={"/profil/"+ this.props.match.params.id} className="btn btn-primary"> Retour à mon profil</Link>
            </form>
            
        </div>
    )
}
}