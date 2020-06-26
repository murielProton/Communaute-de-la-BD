import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';

export default class MajMessage extends Component {

    constructor(props) {
        super(props);

       //assure le lien entre les méthodes et constructeur:
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            message:"",
            redirection:false,
            cookies: new Cookies(),
        }
    }
    componentDidMount(){
        api.get('message/avoirmaj/'+this.props.match.params.id) 
        .then(response=>{
            console.log("id pour trouver paramètres message:",this.props.match.params.id);
            this.setState({
                pseudo: response.data.pseudo,
                message: response.data.message,
                redirection:false
            })
            console.log("message", this.state.message)
        })
        .catch(function(err){
            console.log(err);
        })
    }
    onChangePseudo(e) {
        this.setState({
            pseudo: e.target.value
        });
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
     console.log('message:', this.state.message);
    
    
     const message = {
        pseudo: this.state.pseudo,
        message: this.state.message,
    };
const id= this.props.match.params.id

    // axios.post('http://localhost:4242/membre/ajour/'+id, membre)
    api.post('message/maj/'+id, message)
        .then(res => console.log(res.data));
        
        this.setState({//assurons que le formulaire est réinitialisé en définissant la réinitialisation de l'objet d'état.
            pseudo: "",
            admin: "",
            redirection:true
        })
   
}

    render() {
        if (this.state.redirection)
        {
            if(this.state.cookies.get('Session_admin')){

                return <Redirect to={`/admin/discussion/detail/${this.props.match.params.id_conversation}`}/>;
            } else {
                return <Redirect to={`/discussion/detail/${this.props.match.params.id_conversation}`}/>;
            }
        } 
        return (//Finally we need to add the JSX code which is needed to display the form
            <div style={{marginTop: 10}}>
                <h3>Mise à jour de mon message</h3>
                <form onSubmit={this.onSubmit}>  
                   <div className="form-group">
                        <label>Message: </label>
                        <textarea  type="text"
                                className="form-control"
                                row={5}
                                value={this.state.message}
                                onChange={this.onChangeMessage}
                                />
                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modifier" className="btn btn-primary" />
                    </div>
                    
                </form>
                <Link to={"/liste/discussion"} className="btn btn-primary"> Retour aux discussions</Link>
            </div>
        )
    }
}