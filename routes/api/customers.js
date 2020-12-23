var express = require('express');
const { token } = require('morgan');
var router = express.Router();

var validateToken= require('../../Middleware/validateToken');
var Customer = require('../../models/customer')

//router.use(validateToken) //not specific enough
//define endpoints or more routers

//Get all songs
router.get('/',function(req, res){
    // return all song data from Mongo
    
    Customer.find({},(err, customers) => {
        if(err) return res.status(400).send('Error')

        res.send(customers)
    })
})

// Get a specific song 
router.get('/:id',function(req, res){
    // return all song data from Mongo
    Customer.findById(req.params.id,(err, customer) => {
        if(err) return res.status(400).send('Error')
        if(!customer) return res.status(404).send()
        res.send(customer)
    })
})
//Create a customer 

router.post('/', (req, res)=>{
    //create a customer object
    const newCustomer = new Customer(req.body)
    newCustomer.save(function(err,newCustomer){
        if(err){
            return res.status(400).send(err.message)
        };
        res.status(201).send(newCustomer)
    });
})
// Update a customer 
router.patch('/:id',(req, res)=>{
    Customer.findById(req.params.id, (err, customer) => {
        if(!customer) return res.status(404).send("Id does not exist")

        Customer.findByIdAndUpdate(req.params.id,req.body, (err, result) => {
        
            if(err) return res.status(400).send('Error')
    
            //console.log(result)
            res.status(204).send("Customer successfully updated")
        })
    })
})
//Delete a customer 
// validateToken
router.delete('/:id',(req, res) => {
    //make sure it exists
    console.log(req.params.id);
    Customer.findById(req.params.id, (err, customer) => {
        if(!customer) return res.status(404).send()

        Customer.findByIdAndDelete(req.params.id, (err, result) => {
        
            if(err) return res.status(400).send('Error')
    
            //console.log(result)
            res.status(204).send("Customer successfully deleted")
        })
    })
    
})

module.exports = router;