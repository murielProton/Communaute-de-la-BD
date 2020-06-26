import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import EvenementAccueil from './accueil-evenement.component';
import BedeAccueil from './accueil-bede.component';
import AvisAccueil from './accueil-avis.component';


export default class Accueil extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
    }
    
   
    render() {
        
        return (
            <div className="container">
                <EvenementAccueil />
                <BedeAccueil />
                <AvisAccueil />
            </div>
        )
    }
}