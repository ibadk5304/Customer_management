import React from 'react';
import '../css/signin.css';
import Axios from 'axios';
import authService from '../services/authService';
import Joi from 'joi-browser';



class Register extends React.Component {
        state={
                credentials:{
                        firstName:'',
                        lastName:'',
                        email: '',
                        password:''
                },
                errors:[]
        }

        schema={
                firstName:Joi.string().required(),
                lastName:Joi.string().required(),
                email: Joi.string().email().required(),
                password:Joi.string().min(8).required()
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
                authService.register(this.state.credentials, success=>{
                        console.log(this.state)
                        console.log(success)
                        if(success) {this.props.history.push('/')}
                        
                        else {
                              //show unsuccessful message
                                const error={field: "server"};
                                error.message="Email exist, Try with different email";
                                const errors=[];
                                errors.push(error);
                                this.setState({errors})
                        }
                    })   
                             
                                                            
        }
        handleChange = (e) =>{
                //updating our state with the change in form field 
                
                const errors =[];
                //updating our state with the change in form field 
                const { name, value }= e.target;

                const credentials={...this.state.credentials};

                credentials[name] = value;

                this.setState({credentials,errors})
        }

        render(){
    
        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input   onChange ={this.handleChange} 
                        type="text" id="inputFirstName" 
                        name="firstName"       
                        className="form-control" 
                        placeholder="First name" 
                        autoFocus />
                <label htmlFor="inputLastName" className="sr-only">Last name</label>
                <input   onChange ={this.handleChange} 
                        type="text" id="inputLastName" 
                        name="lastName"       
                        className="form-control" 
                        placeholder="Last name" 
                        autoFocus />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input  onChange ={this.handleChange} 
                        type="text" id="inputEmail" 
                        name="email"       
                        className="form-control" 
                        placeholder="Email address" 
                        autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input   onChange ={this.handleChange} 
                        name="password"
                        type="password" id="inputPassword" 
                        className="form-control" 
                        placeholder="Password" />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                {
                        this.state.errors.length > 0
                        &&
                        <small>
                        <ul>
                                {
                                this.state.errors
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


 
export default Register;