
import { Link } from "react-router-dom";

import dataService from '../services/dataService'
export const Card=(props)=>{

   
    return(
        <div>
          
        
        
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
        {
          props.customerData.map((customer,index)=> {
            return(
              <div key={index} className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img 
                    className="card-img-top" 
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                    alt="Thumbnail [100%x225]" 
                    style={{height: 225, width: '100%', display: 'block'}}
	                  src={customer.picture} 
                    data-holder-rendered="true" />
                  <div className="card-body">
                    <div className="card-text">
                        <h2 class="customerName">{customer.name.first} {customer.name.last}</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Phone: {customer.phone}</li>
                            <li className="list-group-item">Email: {customer.email}</li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target={"#cust"+customer.id} >View</button>
                          
<div className="modal fade" id={"cust"+customer.id} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{customer.name.first} {customer.name.last}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <ul>
            <li>{customer.status}</li>
            <li>{customer.age}</li>
        </ul>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                          <Link 
                            to={{
                              pathname: `/EditCustomer`,
                              state: {
                                customer: customer
                              }
                            }}
                            type="button" className="btn btn-sm btn-outline-secondary">
                            Edit
                          </Link>
                          <Link 
                            to={{
                              pathname: '/DeleteCustomer',
                              state: {
                                customer: customer
                              }
                            }}
                            type="button" className="btn btn-sm btn-outline-secondary">
                            Delete
                          </Link>
                      </div>
    <small className="text-muted">Age: {customer.age}</small>
                    </div>
                  </div>  
                </div>
              </div> 
            )
          })
        }
        

              

            </div>
          </div>
        </div>
      </div>
    );
}

export default Card;