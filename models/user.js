const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        max: 100,
        required:true
    },
    lastName:{
        type:String,
        max: 100,
        required:true
    },
    email:{
        type:String,
        unique: true,
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required:true
    },
    password:{
        type:String,
        max: 255,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)