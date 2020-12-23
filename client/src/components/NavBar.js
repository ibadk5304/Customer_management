import React from 'react';
import auth from "../services/authService";
import {withRouter, Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
 


const NavBar = (props) => {
  
console.log(auth.isAuthenticated());

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <strong>My Fullstack App</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/createCustomer">Create customer</Link> 
            </li>           
          </ul>

            {
            auth.isAuthenticated() ?
            <>
              <div class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/">
                  Welcome {jwt_decode(auth.getToken()).email}!
                </Link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link class="dropdown-item" to="/Signin" onClick={() => auth.logout()}>Log out</Link>          
                </div>
              </div>
            </>
            :
              <>
                <Link className="nav-link" to="/Signin">Log in</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            }
        </div>
      </div>
    </nav>
    );
}
 

export default withRouter(NavBar);