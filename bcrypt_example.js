const bcrypt =require('bcrypt');

const salt = bcrypt.genSaltSync()

// console.log(salt)

const hash = bcrypt.hashSync('password1', salt);

// console.log(hash)
var check= bcrypt.compare('password', hash, (err,isMatch) =>{
    return isMatch;
})

console.log(check);
// bcrypt.genSalt(10, (err,salt)=>{
//     console.log(salt)
//     bcrypt.hash('password',salt, (err, hash) => {
//         console.log(hash)

//         bcrypt.compare('password', hash, (err, isMatch) => {
//             console.log(isMatch)
//         })
//     })
// })