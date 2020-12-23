import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';
import CreateCustomer from './components/CreateCustomer'
import EditCustomer from './components/EditCustomer';
import DeleteCustomer from './components/DeleteCustomer';
import {ProtectedRoute} from './services/protected.route';

import{
  BrowserRouter, 
  Switch,
  Route
} from 'react-router-dom';
import './css/app.css';

//import { Router } from 'express';


class App extends React.Component {
  
  render(){
  

    return (
      <React.Fragment>
        <BrowserRouter>
        <NavBar />
        <div id="main-content">
            <Switch>
              <Route path='/Signin' component={SignIn}/>
              <Route path='/register' component={Register} /> 
              <ProtectedRoute path="/createCustomer" component={CreateCustomer} />  
              <ProtectedRoute path="/EditCustomer" component={EditCustomer} />  
              <ProtectedRoute path="/DeleteCustomer" component={DeleteCustomer} />  
              <ProtectedRoute exact path="/" component={Main} />              
              <Route path="*" render={ props =>  <NoMatch {...props} />} /> 
            </Switch>
        </div>
        <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
   
}


export default App;
