import React from 'react';
import '../css/signin.css';
import Axios from 'axios';
import Joi from 'joi-browser';



class CreateCustomer extends React.Component {
        state={
                credentials:{
                        age:'',
                        name:{
                        first:'',
                        last:''
                        },
                        picture:'',
                        phone:'',
                        email: '',
                        status:''
                },
                errors:[]
        }

        
        schema={
                age:Joi.string().required(),
                name:{
                first:Joi.string().required(),
                last:Joi.string().required()
                },
                picture:Joi.string().required(),
                phone:Joi.string().required(),
                email: Joi.string().email().required(),
                status:Joi.string().required()
        }
        handleSubmit =(e)=> {
                e.preventDefault();
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
                Axios.post('http://localhost:5000/api/customers',this.state.credentials)
                .then(response=> {
                        console.log(response);
                        this.props.history.push('/');
                })
                .catch(error=> {
                        console.log(error.response)
                        const errorMessage={field: "server"};
                        errorMessage.message=error.request.response;
                        const errors=[];
                        errors.push(errorMessage);
                        this.setState({errors})
                }) 
                            
                                                            
        }
        handleChange = (e) =>{
                //updating our state with the change in form field 
                const errors =[];
                const { name, value }= e.target;
                const credentials = { ...this.state.credentials };
                if(name === "first"){
                        credentials.name['first'] = value;
                        this.setState({credentials,errors})
                }
                else if( name ==="last")
                {
                        credentials.name['last'] = value;
                        this.setState({credentials,errors})
                }
                else{
                        credentials[name] = value;
                        this.setState({credentials,errors})
                }
                
                
        }

        render(){
    
        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Enter information:</h1>
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input   onChange ={this.handleChange} 
                        type="text" id="inputFirstName" 
                        name="first"       
                        className="form-control" 
                        placeholder="First name" 
                         autoFocus />
                <label htmlFor="inputLastName" className="sr-only">Last name</label>
                <input   onChange ={this.handleChange} 
                        type="text" id="inputLastName" 
                        name="last"       
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
                <label htmlFor="inputAge" className="sr-only">Age</label>
                <input   onChange ={this.handleChange} 
                        name="age"
                        type="text" id="age" 
                        className="form-control" 
                        placeholder="Age"  />
                        <label htmlFor="inputPhone" className="sr-only">Phone</label>
                <input   onChange ={this.handleChange} 
                        name="phone"
                        type="text" id="phone" 
                        className="form-control" 
                        placeholder="Phone"  />
                        <label htmlFor="inputPicture" className="sr-only">Picture</label>
                <input   onChange ={this.handleChange} 
                        name="picture"
                        type="text" id="picture" 
                        className="form-control" 
                        placeholder="Picture link"  />
                        <label htmlFor="inputStatus" className="sr-only">Status in Canada</label>
                <input   onChange ={this.handleChange} 
                        name="status"
                        type="text" id="status" 
                        className="form-control" 
                        placeholder="Status in canada"  />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
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


 
export default CreateCustomer;