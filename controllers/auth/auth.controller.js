const { getUsers, editUser, createUser, login } = require("./auth.service")

module.exports = {
    getUsers: async (req,res)=>{
       try {
         const users = await getUsers()
         res.send(users)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    createUser: async (req,res)=>{
       try {
         const user = await createUser(req.body)
         res.send(user)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    editUser: async (req,res)=>{
       try {
         const user = await editUser(req.params.id, req.body)
         res.send(user)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    login: async (req,res)=>{
       try {
         const user = await login(req.body.email,req.body.password)
         res.send(user)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
}