const path = require('path');
const fs = require('fs')
const { getProducts, createProduct, editProduct, deletProduct } = require("./product.service")

module.exports = {
    getProducts: async (req,res)=>{
       try {
         const products = await getProducts()
         res.send(products)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    createProduct: async (req,res)=>{
       try {
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
       
        // Write buffer to file
        const filename = Date.now() + '.jpg'
        const filePath = path.join(__dirname, '../../public', filename);
        fs.writeFileSync(filePath, buffer);
        // Assuming your image field in the request body is 'image', update its value to the file path
         req.body.image = filename
         const product = await createProduct(req.body)
         res.send(product)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    editProduct: async (req,res)=>{
       try {
         const product = await editProduct(req.params.id, req.body)
         res.send(product)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    },
    deleteProduct: async (req,res)=>{
       try {
         const products = await deletProduct(req.params.id)
         res.send(products)
       } catch (error) {
         res.status(500).send({error:error.message})
       }
    }
}