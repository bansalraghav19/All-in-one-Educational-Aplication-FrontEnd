import React , { Component } from 'react';
import { Switch, Route, Redirect, NavLink, Link, useHistory} from 'react-router-dom';

import Login from './LoginComponent';
import Main from './MainComponent';
import HomeComponent from './HomeComponent';

import {verifyToken} from '../shared/http';
import Loader from './Loader';

class Multiplepage extends Component{

      constructor(props){
            super(props);
            this.state = {
                  isVerified: false,
                  isLoading: true,
                  isHome:false
            };
            this.changestate=this.changestate.bind(this);
            this.changeLoading=this.changeLoading.bind(this);
            this.changeHome=this.changeHome.bind(this);
        
      }

      changestate(value){
            console.log(value);
            this.setState({
                  isVerified: value
            });
      }

      changeLoading(value){
            // console.log(value);
            this.setState({
                  isLoading: value
            });
      }

      changeHome(value){
            this.setState({
                  isHome: value
            });
      }

      async componentDidMount(){
            
            //check validity of token
            if(localStorage.token){
                  var res= await verifyToken()
                  console.log(res,"res")
                  if(res.user) this.setState({isVerified:true})
                  else this.setState({isHome:true})
            }
            else  this.setState({isHome:true})

            await this.setState({isLoading:false})
      }

      render(){   
            if(this.state.isLoading){
                  return (
                        <Loader/>
                  );
            }  
            else if(this.state.isVerified){
                  return(      
                        <Main changestate = {this.changestate} changeHome={this.changeHome}/>
                  );
            }      
            else if(this.state.isHome){
                  return(      
                        <HomeComponent changeHome={this.changeHome} changestate={this.changestate}/>   
                  );
            }
            else{
                  return(
                        <Login changestate={this.changestate} changeHome={this.changeHome}/>
                  );
            }            
      }
}

export default Multiplepage;