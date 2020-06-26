import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import Cookies from 'universal-cookie';
import api from '../api';
import ListeDiscussion from './discussion-liste.component';

export default class CreationDiscussion extends Component {

    constructor(props) {
        super(props);
        const cookies = new Cookies();
       //assure le lien entre les méthodes et constructeur:
        this.onChangeTitre = this.onChangeTitre.bind(this);
        // this.onChangeGroupe = this.onChangeGroupe.bind(this);
        this.handleChangePrive = this.handleChangePrive.bind(this);
        this.handleChangeGroupe = this.handleChangeGroupe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: cookies.get('Session'),
            prive:true,
            titre: '',
            groupe:'',
            messages:[],
            redirection: false,
            discussions:[]
        }
    }
    componentDidMount(){
        api.get('membre/groupe/'+this.state.pseudo) 
        .then(response => {
            console.log(response.data);
            this.setState({ discussions: response.data });
        })
        
        .catch(function(err){
            console.log(err);
        })
    }
    onChangeTitre(e) {
        this.setState({
            titre: e.target.value
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
    // onChangeGroupe(e) {
    //     this.setState({
    //         groupe: e.target.value
    //     });
    // }
    handleChangeGroupe(event) {
        this.setState({groupe: event.target.value});
      }

    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
    
     console.log('titre: ', this.state.titre);
     console.log('groupes: ', this.state.groupe);
     
    
    
     const  discussion= {
        titre: this.state.titre,
        messages: this.state.messages,
        groupe: this.state.groupe,
        prive:this.state.prive
    };
    api.post('discussion/creer', discussion)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            titre: "",
            messages: [],
            groupes: [],
            groupe:'',
            redirection:true
        })
    }

    render() {
        const { discussions } = this.state;
        if (this.state.redirection)
        {
            window.location.reload(false);
            // return <Redirect to='/discussion/creer'/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Creer une discussion </h3>
                <form onSubmit={this.onSubmit}>
                   
                    <div className="form-group">
                        <label>Le titre de la discussion: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                
                                value={this.state.titre}
                                onChange={this.onChangeTitre} required
                                />
                   </div>
                    <div><h4>Privé</h4>
          Cochez la case si vous voulez un groupe privé.
         </div>
                        <label>
                            privé
          <input
                                name="prive" type="checkbox"
                                checked={this.state.prive}
                                onChange={this.handleChangePrive} />
                        </label>
         
                    <div className="form-group">
          {discussions.map(discussion =>( 
                    <label>
          Choisissez votre groupe :
          <select value={this.state.groupe} onChange={this.handleChangeGroupe}>
          {discussion.groupes.map(titre => ( 
            <option key={titre.uid} value={titre.nom_groupe}>{titre.nom_groupe}</option>
            ) )} 
          </select>
        </label>
             ) )} 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Créer une discussion" className="btn btn-primary" />
                    </div>
                </form>
                <ListeDiscussion />
            </div>
        )
    }
}