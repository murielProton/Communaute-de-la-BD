import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../api';

 

export default class SupprimerEvenement extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            id: this.props.match.params.id,
            redirection: false
        };
    }
   

   delete(){
       
      
        // axios.get('http://localhost:4242/membre/supprime/'+this.state.id)
        api.get('evenement/supprimer/'+this.state.id)
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
            return <Redirect to='/liste/evenement'/>;
        } 
        return (
            <div className="container">
                <p>
                    Confirmez-vous vouloir supprimer cet évenement <strong>{this.props.match.params.nom}</strong>? 
                   <div> <button onClick={()=>this.delete()} className="btn btn-danger">Oui, Supprimer</button></div>
                </p>
                <p>
                   Si non, retour au détail :
        )
                   <div><Link to={"/evenement/detail/"+this.props.match.params.id} className="btn btn-primary">L'évenement</Link></div>
               </p>
                
            </div>
            
            
        )
      }
    }
    