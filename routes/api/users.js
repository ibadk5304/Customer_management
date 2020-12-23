var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

var User = require('../../models/user')
/* GET users listing. */
router.get('/',function(req, res){
  // return all song data from Mongo
  
  User.find({},(err, users) => {
      if(err) return res.status(400).send('Error')

      res.send(users)
  })
})


router.get('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          res.header('Access-Control-Expose-Headers', 'x-auth-token');
          res.header('x-auth-token', token);
          return res.status(200).json({
            message: "Auth successful"
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post('/register', (req, res)=>{
  //hash the password
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  req.body.password = hash;
  //console.log(req.body.password)
  
  //create a customer object
  const newUser = new User(req.body)
  
  newUser.save(function(err,newUser){
   
    if(err){
          return res.status(400).send(err.message)
      };
      
      const token = jwt.sign(
        {
          email: newUser.email,
          userId: newUser._id
        },
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        }
      );
      res.header('Access-Control-Expose-Headers', 'x-auth-token');
      res.header('x-auth-token', token);
      res.status(201).send(
        "User ID:"+newUser._id+
        "User email:"+newUser.email
      )
  });
})

module.exports = router;
