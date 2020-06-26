import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import Cookies from 'universal-cookie';
import api from '../api';

export default class CreationMessage extends Component {

    constructor(props) {
        super(props);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const cookies = new Cookies();
        this.state = {
            pseudo: cookies.get('Session'),
            message: '',
            redirection: false
        }
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
     //e.preventDefault pour garantir que le comportement de soumission de formulaire HTML par défaut est empêché. Étant donné que le back-end de notre application n'est pas encore implémenté, nous n'imprimons que ce qui est actuellement disponible dans l'état du composant local sur la console   
     console.log('pseudo: ', this.state.pseudo);
     console.log('message: ', this.state.message);
        
     const  message= {
        pseudo: this.state.pseudo,
        message: this.state.message
        };
        api.post('message/creer/'+this.props.match.params.id, message)
        .then(res => console.log(res.data));
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            pseudo:"" ,
            message: "",
            redirection:true
        })
    }

    render() {
        if (this.state.redirection)
        {
            return <Redirect to={`/discussion/detail/${this.props.match.params.id}`}/>;
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Ecrire un message </h3>
                <form onSubmit={this.onSubmit}>     
                    <div className="form-group">
                        <label>Son contenu </label>
                        <textarea 
                                type="text" 
                                className="form-control"
                                rows={5}
                                // maxlength="140"
                                value={this.state.message}
                                onChange={this.onChangeMessage} 
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Envoyer le message" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}