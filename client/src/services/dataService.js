import Axios from "axios";



class DataService{

    constructor() {
        this.apiURL = process.env.REACT_APP_API_URL;
    }

    getCustomers(callback){
        Axios.get(`${this.apiURL}/customers`)
        .then(response=>{
            callback(null, response.data);
        })
        .catch(error=>{
          console.log(error)
          callback(error, null);
        })
    }

    getCustomer(id){

    }
    createCustomers(){

    }

    updateCustomers(){

    }

    deleteCustomers(id){
    
    }

    login(credentials, callback){
        Axios.post(`${this.apiURL}/users/login`, credentials)
            .then(response => {
                
                callback(null, response.headers['x-auth-token'])
            })
            .catch(err => {
                callback(err, null)
            })
    }

    register(data, callback){
        Axios.post(`${this.apiURL}/users/register`, data)
            .then(response => {
                callback(null, response.headers['x-auth-token'])
            })
            .catch(err => callback(err, null))
    }

    

}

export default new DataService();