import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import api from '../api';

export default class MajEvenement extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
       this.onChangeNom = this.onChangeNom.bind(this); // Pour être sûr que la connexion se fasse avec with setState
       this.onChangeDescription = this.onChangeDescription.bind(this);
       this.onChangeVille = this.onChangeVille.bind(this);
       this.onChangeDate = this.onChangeDate.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: "",
            description: "",
            ville: "",
            date: "",
            mot_de_passe_correct: true,
            email_correct: true,
            membre_cree: false,
            redirection:false
        }
    }
    componentDidMount(){
        api.get('evenement/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver paramètres message:",this.props.match.params.id);
            this.setState({
            nom: response.data.nom,
            description: response.data.description,
            ville: response.data.ville,
            date: response.data.date,
            redirection:false
            })
            console.log("nom", this.state.nom)
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

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeVille(e) {
        this.setState({
            ville: e.target.value
        });
    }  

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }  
    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('nom: ', this.state.nom);
     console.log('ville:', this.state.ville);
    
    
     const  evenement= {
        nom: this.state.nom,
        description: this.state.description,
        ville: this.state.ville,
        date:this.state.date,
    };
const id= this.props.match.params.id

    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('evenement/maj/'+id, evenement)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
        nom: "",
        description: "",
        ville:'',
        date:"",
        redirection:true
        })
   
}

    render() {
        if (this.state.redirection)
        {
            return <Redirect to='/liste/evenement'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour de l'évenement</h3>
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
                        <label>Description: </label>
                        <input  type="textarea"
                                className="form-control"
                                placeholder="Quel type, lieu,.."
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                                
                    </div>
                    <div className="form-group">
                        <label>Date de l'évenement: {this.state.date}</label>
                        <input type="date"
                                className="form-control"
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                />
                                
                    </div>
                    <div className="form-group">
                        <label>Ville: </label>
                        <input  type="text"
                                className="form-control"
                                placeholder="Dans quelle ville est l'évenement ?"
                                value={this.state.ville}
                                onChange={this.onChangeVille}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Enregistrer" className="btn btn-primary" />
                    </div>
                </form>
                <Link to={"/liste/evenement"} className="btn btn-primary"> Retour aux évènements</Link>
            </div>
        )
    }
}