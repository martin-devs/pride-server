//products controllers

const Product = require('../models/Product');

//codes
const Code = require('../models/Code');


module.exports = {
    getProducts: async (req, res) => {
        console.log('getProducts called')
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.json({ message: err });
        }
    },
    getProduct: async (req, res) => {
        try {
            const product
                = await Product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            res.json({ message: err });
        }
    },
    createProduct: async (req, res) => {
        //unique identifier field
        let product= await Product.findOne({identifier:req.body.identifier});
        if(product){
            return res.status(400).json({msg:'Product already exists'});
        }
        product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            countInStock: req.body.countInStock,
            shopId: req.body.shopId,
            identifier: req.body.identifier,
            

        });
        try {
            const savedProduct = await product.save();
            res.json(savedProduct);
        } catch (err) {
            res.json({ message: err });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product
                .updateOne(
                    { _id: req.params.id },
                    {
                        $set: {
                            name: req.body.name,
                            price: req.body.price
                        }
                    }
                );
            res.json(updatedProduct);
        } catch (err) {
            res.json({ message: err });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const removedProduct = await Product
                .deleteOne({ _id: req.params.id });
            res.json(removedProduct);
        } catch (err) {
            res.json({ message: err });
        }
    }
,
getProductsPageLimit: async (req, res) => {
    try {
        const products = await Product.find()
            .skip((req.params.page - 1) * req.params.limit)
            .limit(parseInt(req.params.limit));
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
                    

},
//search product match name or description
searchProduct: async (req, res) => {
    const {query}=req.params;
    console.log("searching", query)

    try{
        const items= await Product.find({$or:[{name:{$regex:query, $options:'i'}},{description:{$regex:query, $options:'i'}}]} );
        res.json(items)

    }
    catch(err){
        res.status(500).json({
            "Error":err.message
        })

    }
},
getProductByCode: async(req, res)=>{
    const {code}= req.params;
    try{
        Code.find({skincode:code}).then(async (result)=>{
            const items= await Product.find({identifier:result[0].products})
            res.json(items)

        })
        .catch((err)=>{
            res.status(500).json({
                "Error":err.message
            })
            })
        

    }
    catch(err){
        res.status(500).json({
            "Error":err.message
        })

    }

},

getProductsByCode: async(req, res)=>{

    const {code}= req.params;
    try{
        Code.find({skincode:code}).then(async (result)=>{
            const items = await Product.find({identifier:code})
            res.json(items)

        })
        .catch((err)=>{
            res.status(500).json({
                "Error":err.message
            })
            })
        

    }
    catch(err){
        res.status(500).json({
            "Error":err.message
        })

    }

},

    

searchProductByCategory: async (req, res) => {
    const {query, category}=req.params;
    console.log("searching", query)

    try{
        const items= await Product.find({$and:[{category:category},{$or:[{name:{$regex:query, $options:'i'}},{description:{$regex:query, $options:'i'}}]}]} );
        res.json(items)

    }
    catch(err){
        res.status(500).json({
            "Error":err.message
        })

    }

} 



}