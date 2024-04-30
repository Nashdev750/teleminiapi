const User = require("../../models/user.model")
const { createToken } = require("../../utils/token")
const bcrypt = require('bcrypt')


module.exports.getUsers = async ()=>{
    return await User.find()
}
module.exports.createUser = async (user)=>{
    const salt = await bcrypt.genSalt(10)
    user.password = bcrypt.hashSync(user.password.toString(), salt)
    const newUser = await User.create(user)
    return newUser
}
module.exports.editUser = async (id,user)=>{
    if(user?.password){
        const salt = await bcrypt.genSalt(10)
        user.password = bcrypt.hashSync(user.password.toString(), salt)
    }
    const newUser = await User.findByIdAndUpdate({_id:id},user)
    return newUser
}
module.exports.login = async (email, password)=> { 
    try {
        console.log(password)
        const user = await User.findOne({ email })
        if (!user?.email) throw new Error('Account not found')
        if (!bcrypt.compareSync(password.toString(), user.password.toString())) throw new Error('Invalid email or password')
        
        const token = createToken(user)

        return { user: { email: user.email }, token }

    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}