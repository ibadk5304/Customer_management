const jwt = require('jsonwebtoken')

//create a new token ..... a successfull login has occured
jwt.sign({ name: 'ibad'}, 'mysecretkey', {expiresIn: '1h'},(err, token) =>{
    console.log(token)
})