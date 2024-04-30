const jwt = require('jsonwebtoken')

const createToken = (user) =>{
 return jwt.sign({id:user._id,email:user.email,role:user.role},"3456",{
    expiresIn: '1d'
 })
}

const verifyToken = (token) =>{
  return new Promise((resolve, reject) => {
    jwt.verify(token,"3456",(error, user)=>{
        if(error) reject(error);
        resolve(user)
    })
  })
}

module.exports = {createToken, verifyToken}