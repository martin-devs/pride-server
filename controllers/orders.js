const {connectDB} = require('../config/config')
const Order = require ('../models/Order')
const products = require('./products')

connectDB()

module.exports= {
    makeOrder:async(req, res)=>{
        const {customer_id,name, email,phone, products, count, shipping, total, subTotal}=req.body
        try{
            const result= await Order.create({
                customer_id:customer_id,
                name:name,
                email:email,
                phone:phone,
                products: products,
                count:count,
                subTotal:subTotal,
                shipping:shipping,
                total:total,
            })
            res.json(result)

        }
        catch(err){ 
            res.status(500).json({error:err.message})
            console.log(err)
        }

    },
    getOrders:async(req, res)=>{
        try{
            const result= await Order.find()
            res.json(result)
        }
        catch(err){
            res.status(500).json({error:err.message})
            console.log(err)
        }
    },
    getOrdersByCustomerId:async(req, res)=>{
        try{
            const result= await Order.find({customer_id:req.params.id})
            res.json(result)
        }
        catch(err){
            res.status(500).json({error:err.message})
            console.log(err)
        }
    },

}