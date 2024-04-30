const Product = require("../../models/product.model");


module.exports.getProducts = async ()=>{
    return await Product.find()
}
module.exports.createProduct = async (productData)=>{
    const product = await Product.create(productData)
    return product
}
module.exports.editProduct = async (id,productData)=>{
    const product = await Product.findByIdAndUpdate({_id:id},productData)
    return product
}
module.exports.deletProduct = async (id)=>{
    await Product.findByIdAndDelete({_id:id})
    const products = await Product.find().lean()
    return products
}