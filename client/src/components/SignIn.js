import React from 'react';
import '../css/signin.css';
import authService from '../services/authService';

import Joi from 'joi-browser';
// import { response } from 'express';


class SignIn extends React.Component {
    
    state={

        credentials:{
            email: '',
            password:''
        },
        errors:[]
      
    }

    schema={
        email: Joi.string().email().required(),
        password:Joi.string().required()
    }

    handleSubmit =(e)=> {
       e.preventDefault();
        //validate in browser
        const result = Joi.validate(this.state.credentials, this.schema,{abortEarly: false})

        if(result.error){
            const errors =[]
            result.error.details.forEach(detail=>{
               
                const error = {}
                error.message = detail.message;
                error.field = detail.path[0];       
    
                errors.push(error);
            })
            //build entries in our error state
            this.setState({ errors })
            return;
        }
        
        
        
     authService.login(this.state.credentials, success=>{
        
        if(success) {  
       
            this.props.history.push('/')                     
        }
        
        else {
            //show unsuccessful message
            const error={field: "server"};
            error.message="Incorrect log in, please try again later";
            const errors=[];
            errors.push(error);
            this.setState({errors})
        }
    })   
            
            
    }
    handleChange = (e) =>{
        const errors =[];
        //updating our state with the change in form field 
        const { name, value }= e.target;

        const credentials={...this.state.credentials};
        // credentials.email= this.state.credentials.email;
        // credentials.password=this.state.credentials.password;

        credentials[name] = value;

        this.setState({credentials,errors})
    }
    
    render(){
        
    
        return ( 
        
                <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in or <a href="/register">register</a></h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange ={this.handleChange} 
                        type="text" id="inputEmail" 
                        name="email"       
                        className="form-control" 
                        placeholder="Email address" 
                         autoFocus />
                {
                    this.state.errors.filter(error => error.field ==="email").length > 0
                    &&
                    <small>
                        <ul>
                            {
                                this.state.errors
                                .filter(error => error.field ==="email")
                                .map((error, i)=>{
                                return <li key={i}>{error.message}</li>
                                })
                            }
                        </ul>
                    </small>

                }
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange ={this.handleChange} 
                        name="password"
                        type="password" id="inputPassword" 
                        className="form-control" 
                        placeholder="Password"/>
                
                {
                    this.state.errors.filter(error => error.field ==="password").length > 0
                    &&
                    <small>
                        <ul>
                            {
                                this.state.errors
                                .filter(error => error.field ==="password")
                                .map((error, i)=>{
                                return <li key={i}>{error.message}</li>
                                })
                            }
                        </ul>
                    </small>

                }
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {
                this.state.errors.filter(error => error.field ==="server").length > 0
                &&
                <small>
                    <ul>
                        {
                            this.state.errors
                            .filter(error => error.field ==="server")
                            .map((error, i)=>{
                            return <li key={i}>{error.message}</li>
                            })
                        }
                    </ul>
                </small>

            }
            </form>            
           
    
            

            
         );
    }
   
}


 
export default SignIn;