const jwt = require('jsonwebtoken')

const authmiddleware = (req, res, next)=>{
    let token = req.get('authorization')
    if(!token){
        return res.status(401).send({error:"authorization failed"})
    }else if(token){
        jwt.verify(token.slice(7),"3456", async (err, user)=>{
            if(user){
                req.user = user
                next()
            }else{
                return res.status(401).send({error:"authorization failed"})
              }
        })
     
    }

}


module.exports = {authmiddleware}