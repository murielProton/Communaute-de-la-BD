import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../api';
import Cookies from 'universal-cookie';
 

export default class SupprimerMembre extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            id: this.props.match.params.id,
            redirection: false,
            cookies: new Cookies(),
        };
    }
   

   delete(){
       
        let id=this.state.id
        // axios.get('http://localhost:4242/membre/supprime/'+this.state.id)
        api.get('membre/supprimer/'+this.state.id)
            .then(response=>{
                if(response.status=== 200 && response !==null){
                    this.setState({                   
                   redirection:true });

                }else{console.log('probleme de supp');}
            })
            .catch(err => {console.log(err)
    });
}
    render() {
        if (this.state.redirection)
        {
            this.state.cookies.remove('Session');
            return <Redirect to='/'/>;
        } 
        return (
            <div className="container">
                <p>
                    Confirmez-vous vouloir supprimer ce compte <strong>{this.props.match.params.pseudo}</strong>? 
                   <div> <button onClick={()=>this.delete()} className="btn btn-danger">Oui, Supprimer</button></div>
                </p>
                <p>
                   Si non, retour à votre profil :
        )
                   <div><Link to={"/profil/"+this.props.match.params.id} className="btn btn-primary">Mon profil</Link></div>
               </p>
                
            </div>
            
            
        )
      }
    }
    