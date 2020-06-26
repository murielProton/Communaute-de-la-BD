import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../api';

 

export default class SupprimerPartenaire extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            id: this.props.match.params.id,
            redirection: false
        };
    }
   

   delete(){
       
        let id=this.state.id
        // axios.get('http://localhost:4242/membre/supprime/'+this.state.id)
        api.get('partenaire/supprimer/'+this.state.id)
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
            return <Redirect to='/admin/liste/partenaire'/>;
        } 
        return (
            <div className="container">
                <p>
                    Confirmez-vous vouloir supprimer ce partenaire <strong>{this.props.match.params.id}</strong>? 
                   <div> <button onClick={()=>this.delete()} className="btn btn-danger">Oui, Supprimer</button></div>
                </p>
                <p>
                   Si non, retour au profil du partenaire :
        )
                   <div><Link to={"/partenaire/detail/"+this.props.match.params.id} className="btn btn-primary">Profil partenaire</Link></div>
               </p>
                
            </div>
            
            
        )
      }
    }
    