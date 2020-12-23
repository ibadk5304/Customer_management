import React from 'react';
import '../css/signin.css';
import Axios from 'axios';



class DeleteCustomer extends React.Component {
        
    handleSubmit =(e)=> {
            e.preventDefault();
            const { customer } = this.props.location.state
            Axios.delete(`http://localhost:5000/api/customers/${customer._id}`)
            .then(response=> {
                    console.log(response);
                    this.props.history.push('/');
            })
            .catch(error=> console.log(error.response)) 
                        
                                                        
    }
    render(){
    
        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Are you sure you want to Delete:</h1>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Delete</button>
            </form>
         );
    }
   
}


 
export default DeleteCustomer;