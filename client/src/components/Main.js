import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';
class Main extends React.Component {
  state = {
    customers:[],
    filteredCustomers:[]
  }

  componentDidMount(){    
    dataService.getCustomers((err, data)=>{
      if(err){
        console.log(err)
        return;
      }
      this.setState({customers: data});
      this.setState({filteredCustomers: data});
    })
  }

  onKeyPress=(e)=>{

    const value= e.target.value;
    const filteredCustomer =this.state.customers.filter(customer => {
        const name= `${customer.name.first} ${customer.name.last}`;
        // console.log(firstName.toLowerCase())
        // console.log(firstName.toLowerCase().indexOf(value.toLowerCase()))
        return name.toLowerCase().indexOf(value.toLowerCase()) >=0
    })

    this.setState({filteredCustomers: filteredCustomer})

  }

  render(){
    return ( 
      <>
      <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input onKeyUp ={this.onKeyPress}
                    type="text"
                     className="form-control"  
                     placeholder="Search this site" />
              <div className="input-group-append">
                 <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      <Card customerData={this.state.filteredCustomers}/>
      </>
    );
  }
   
}
 
export default Main;