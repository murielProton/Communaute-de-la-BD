import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import api from '../api';

export default class AdminDetailDiscussion extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            discussions: [],
            loaded: true,
            i: 0
         };
    }
    componentDidMount() {

            this.setState({ id: this.props.match.params.id });
            // console.log(this.props.match.params.login );
            let id = this.props.match.params.id;
            // let url = 'http://localhost:4242/api/post/' + id;
            // console.log(url);
            api.get('discussion/'+id)
            // axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({ 
                    discussions: response.data, 
                    loaded: true });
                    
                    // localStorage.setItem('login',this.state.login)
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            
    }
    //}
    render() {
        const { discussions } = this.state;

        // if (this.state.loaded)
        // {
        //     let load = false;
        //     for(this.state.this.state.i=0;i<3; i++){
        //         if(i==2){
        //             window.location.reload(load);
        //             load == true;
        //         }
        //     }
        //     // window.location.reload(false);
        //     this.setState({
        //         loaded: false
        //     })
        // } 

        return (
            <div class="container">
                <div>
                <Link to={"/admin/discussions/liste"} className="btn btn-info" >Revenir aux discussions</Link>
                <Link to={"/message/creer/"+ this.state.id} className="btn btn-success">Ecrire un message</Link>
                </div>
             {discussions.map(discussion =>( 
            <h3 key={discussion.uid}>{discussion.titre} </h3>
            ))}
            {discussions.map(discussion => (
                <div>
                    {discussion.messages.map(message => (
                    <div className="card">
                        <h5 className="card-header" key={message.uid}><cite>{message.pseudo}:</cite></h5>
                        <p className="card-title" key={message.uid}>le {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date(message.date))}</p>
                        <h5 className="card-text" key={message.uid}>{message.message}</h5>
                        <p><Link to={"/message/maj/"+ message._id + "/" + this.props.match.params.id}> Modifier</Link> ou 
                        <Link to={"/message/supprimer/"+ message._id}> supprimer</Link></p>
                        <p></p>
                    </div>
                        ))}
                </div>
            ))}
            <div className="form-group">
            {/* <Link to={"/message/creer/"+ this.state.id} className="btn btn-success">Ecrire un message</Link> */}
            {/* <Link to={"/discussion/maj/"+ this.state.id} className="btn btn-info">Modifier le titre de la discussion</Link> */}
             </div>
             <div className="form-group">
          
            {/* <Link to={"/liste/discussion"} className="btn btn-primary" >Retour aux discussions</Link> */}
            {/* <Link to={"/discussion/supprimer/"+ this.state.id} className="btn btn-danger">Supprimer cette discussion</Link> */}
             </div>
        </div>
    )
}
}

