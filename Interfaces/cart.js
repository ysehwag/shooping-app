const route = require('express').Router()
const Cart = require('../db').Cart
const Product = require('../db').Product

route.get('/', async function (req, res) {
    const result = await Cart.findAll()
    console.log(result)
    res.send(result)
})

//get all products from cart for a user
route.post('/getItems', async function (req, res) {   
    const user = req.body.id
    const result = await Cart.findAll({
        include :[{model:Product}] ,
        where: {
            userId: user
        }
    }).then((cart)=>{
        res.status(200).send(cart)
    }).catch((error) =>{
        res.status(501).send(error)
    })

    
})

//delete product from cart for a specific user
route.delete('/', async function (req, res) {
    
    try{
        await Cart.destroy({
            where: {
                id : req.body.id
            }
        })
        res.send({success:true})
    }catch(e){
        console.log(e)
        res.send({successs:false,message:e.message})
    }
})
//add item into a cart
route.post('/', async function (req, res) {
    const id = req.body.userId
    const pId = req.body.productId
    try {
        let result = await Cart.findOne({
            where: {
                userId: id,
                productId: pId
            }
        })
        if (result == null) {
            await Cart.create({
                userId: id,
                productId: pId,
                qty: 1
            })
            res.send({ success: true, message: "One new record added!!" })
        } else {
            let qty = result.qty + 1;
            await Cart.update(
                { qty: qty },
                {
                    where: {
                        userId: id,
                        productId: pId
                    }
                }
            ).then(() => { })
            res.send({ success: true, message: "Quantity of " + pId + " is updated!" })
        }
    } catch (e) {
        res.send({ success: false, message: e.message })
    }
})

exports = module.exports = route