const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    id: Number,
    age:{
        type:Number,
        required: true 
    },
    name: {
        first: {
            type:String,
            required: true 
        },
        last: {
            type:String,
            required: true 
        }
    },
    picture: String,
    phone: {
            type: String,
            validate: {
                
                validator: function(v) {
                  return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required:true
    },
    status:String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true
    }, 
    address: {
        present: String,
        previous: String
    },
    emergencyContact: [
        {
            id: Number,
            name: String,
            phone: String 
        }
    ]
})

module.exports = mongoose.model('Customer', customerSchema)

