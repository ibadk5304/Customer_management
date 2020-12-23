import React from 'react';
import '../css/signin.css';
import Axios from 'axios';



class EditCustomer extends React.Component {
        state={
                age:'',
                name:{
                    first:'',
                    last:''
                },
                picture:'',
                phone:'',
                email: '',
                status:''
        }
        componentDidMount(){    
            const { customer } = this.props.location.state
            console.log(customer)


            this.setState({
                _id:customer._id,
                age:customer.age,
                name:{
                    first:customer.name.first,
                    last:customer.name.last
                },
                picture:customer.picture,
                phone:customer.phone,
                email: customer.email,
                status:customer.status
            })


        
        }
        
        handleSubmit =(e)=> {
                e.preventDefault();

                Axios.patch(`http://localhost:5000/api/customers/${this.state._id}`,this.state)
                .then(response=> {
                        console.log(response);
                        this.props.history.push('/');
                })
                .catch(error=> console.log(error.response)) 
                            
                                                            
        }
        handleChange = (e) =>{
                //updating our state with the change in form field 
                const { name, value }= e.target;
                if(name === "first"){
                        const { name } = { ...this.state };
                        const currentState = name;
                        currentState['first'] = value;
                        this.setState({ name: currentState });
                }
                else if( name ==="last")
                {
                        const { name } = { ...this.state };
                        const currentState = name;
                        currentState['last'] = value;
                        this.setState({ name: currentState });
                }
                else{
                        this.setState({ [name]:value})
                }
                
                
        }

        render(){
    
        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Enter information:</h1>
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.name.first}
                        type="text" id="inputFirstName" 
                        name="first"   
                        className="form-control" 
                        placeholder="First name" 
                        required autoFocus />
                <label htmlFor="inputLastName" className="sr-only">Last name</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.name.last}
                        type="text" id="inputLastName" 
                        name="last"       
                        className="form-control" 
                        placeholder="Last name" 
                        required autoFocus />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input  onChange ={this.handleChange} 
                        value={this.state.email}
                        type="text" id="inputEmail" 
                        name="email"       
                        className="form-control" 
                        placeholder="Email address" 
                        required autoFocus />
                <label htmlFor="inputAge" className="sr-only">Age</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.age}
                        name="age"
                        type="text" id="age" 
                        className="form-control" 
                        placeholder="Age" required />
                        <label htmlFor="inputPhone" className="sr-only">Phone</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.phone}
                        name="phone"
                        type="phone" id="phone" 
                        className="form-control" 
                        placeholder="Phone" required />
                        <label htmlFor="inputPicture" className="sr-only">Picture</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.picture}
                        name="picture"
                        type="text" id="picture" 
                        className="form-control" 
                        placeholder="Picture link" required />
                        <label htmlFor="inputStatus" className="sr-only">Status in Canada</label>
                <input   onChange ={this.handleChange} 
                        value={this.state.status}
                        name="status"
                        type="text" id="status" 
                        className="form-control" 
                        placeholder="Status in canada" required />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
            </form>
         );
    }
   
}


 
export default EditCustomer;