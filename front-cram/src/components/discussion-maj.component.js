import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import api from '../api';

export default class MajDiscussion extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangePrive = this.onChangePrive.bind(this);
        this.onChangeGroupe = this.onChangeGroupe.bind(this); 
        this.onChangeTitre = this.onChangeTitre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            prive: "",
            titre:"",
            groupe:"",
            redirection:false
        }
    }
    componentDidMount(){
        api.get('discussion/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver paramètres discussion:",this.props.match.params.id);
            this.setState({
                prive: response.data.pseudo,
                titre: response.data.titre,
                groupe:response.data.groupe,
                redirection:false
            })
            console.log("titre", this.state.titre)
        })
        .catch(function(err){
            console.log(err);
        })
    }
    onChangePrive(e) {
        this.setState({
            prive: e.target.value
        });
    }
    onChangeTitre(e) {
        this.setState({
            titre: e.target.value
        });
    }
    onChangeGroupe(e) {
        this.setState({
            Groupe: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('titre: ', this.state.titre);
     console.log('groupe:', this.state.groupe);
    
    
     const discussion = {
        titre: this.state.titre,
        groupe: this.state.groupe,
        prive:this.state.prive
    };
const id= this.props.match.params.id

    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('discussion/maj/'+id, discussion)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            titre: "",
            groupe: "",
            prive:"",
            redirection:true
        })
   
}

    render() {
        if (this.state.redirection)
        {
            return <Redirect to={`/admin/discussion/${this.props.match.params.id}`}/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour du sujet de la discussion</h3>
                <form onSubmit={this.onSubmit}>  
                   <div className="form-group">
                        <label>Titre: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.titre}
                                onChange={this.onChangeTitre}
                                />
                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modifier" className="btn btn-primary" />
                    </div>
                    
                </form>
                <Link to={"/admin/discussions/liste"} className="btn btn-primary"> Retour aux discussions</Link>
            </div>
        )
    }
}