import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../api';

 

export default class ChoixMajMembre extends Component {
 
    render() {

        return (
            <div className="container">
                <p>
                  Pour rappel, votre pseudo n'est pas modifiable.
                </p>
                <div>
                   Voulez vous changer votre email?
                  <p> <Link to={"/majemail/"+this.props.match.params.id} className="btn btn-primary">Mon Email</Link></p>
               </div>
               <div>
                   Voulez vous changer votre mot de passe?
                   <p><Link to={"/majmotdepasse/"+this.props.match.params.id} className="btn btn-primary">Mon Mot de Passe</Link></p>
               </div>
               <div>
                   Voulez vous changer vos autres informations?
                   <p><Link to={"/majprofil/"+this.props.match.params.id} className="btn btn-primary">Mon profil</Link></p>
               </div>
               <Link to={"/profil/"+ this.props.match.params.id} className="btn btn-primary"> Retour à mon profil</Link>
            </div>  
        )
      }
    }