import { token } from 'morgan';
import dataService from '../services/dataService';
class AuthService{

    //token related methods??
    getToken(){
        // retrieve from storage
        return localStorage.getItem('token');
    }

    setToken(token){
        //cookie, local storage, etc.....
        localStorage.setItem('token',token);
      
        
    }

    register(data, callback){
        //another api call ...
        dataService.register(data, (err, token)=> {
            if(err){
                // handle it
                callback(false);
                return;
            }
            
            //set the token
            
            this.setToken(token);
            callback(true);
        })
    
    }

    
    login(credetials, callback){

        dataService.login(credetials, (err, token)=> {
            if(err){
                // handle it
                callback(false);
                return;
            }
            
            //set the token
            
            this.setToken(token);
            callback(true);
        })

    }

    logout(){
        
        //deleting the token
        localStorage.removeItem('token');
        // this.authenticated = false;
    }

    isAuthenticated(){
        if(this.getToken()=== null)
        {
            return false;
        }
        else{
            return true;
        }
    }
}

export default new AuthService();