import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

var RechercheNom = function(rechercher) {
    api.get("membre/trouver/nom/" + rechercher)
        .then(res =>{
            let nom_du_membre = res.data;
            return nom_du_membre;
        })

}

export default RechercheNom;
