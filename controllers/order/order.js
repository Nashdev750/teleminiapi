const Order = require("../../models/order.model")

module.exports = {
    getOrders: async (req,res)=>{
       try {
         const orders = await Order.find()
         res.send(orders)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    getOrder: async (req,res)=>{
       try {
         const order = await Order.findOne({_id:req.params.id})
         res.send(order)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    createOrder: async (req,res)=>{
       try {
         const order = await Order.create(req.body)
         res.send(order)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    editOrder: async (req,res)=>{
       try {
         const order = await Order.findByIdAndUpdate({_id:req.params.id},req.body)
         res.send(order)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    }
}