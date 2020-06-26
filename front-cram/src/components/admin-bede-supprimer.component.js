import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class AdminSupprimerBede extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirection: false,
        }
    }

    componentDidMount() {
        api.get('admin/bede/supprimer/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200 && response !== null) {
                    // console.log(response.data);
                    this.setState({
                        redirection: true
                    });
                } else {
                    console.log('Echec de la suppression');
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    render(){
        if (this.state.redirection) {
            //Redirect to the page
            return <Redirect to={`/admin/bd/liste`}/>;
           }
        
           return(
           <div style={{marginTop: 60}}><h2>Sur la page supprimer une bédé !!</h2></div>
           )
    }
}