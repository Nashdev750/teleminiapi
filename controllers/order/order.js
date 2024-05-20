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
         req.bot.sendMessage(req.body.chatid,'We received your order. A customer service representative will reach out to confirm your order and take payment. order Id: #'+req.body.orderid)
         res.send(order)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    editOrder: async (req,res)=>{
       try {
         const order = await Order.findByIdAndUpdate({_id:req.params.id},req.body)
         if(req.body.status == 1){
           req.bot.sendMessage(order.chatid,'Your order has been confirmed. order Id: #'+order.orderid)
         }else{
           req.bot.sendMessage(order.chatid,'Your order has been Cancelled. order Id: #'+order.orderid)
         }
         const orders = await Order.find()
         res.send(orders)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    deleteOrder: async (req,res)=>{
       try {
         const order = await Order.findByIdAndDelete({_id:req.params.id},req.body)
         const orders = await Order.find()
         res.send(orders)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    }
}