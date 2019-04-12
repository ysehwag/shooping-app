const route=require('express').Router()
const Products=require('../db').Product
const Vendors=require('../db').Vendor

route.get('/', (req, res) => {
  Products.findAll({
    include : Vendors
  })
    .then((products) => {
      res.status(201).send(products)
    })
    .catch((err) => {
      res.status(501).send(err)
    })
})
  //vendor post request
  route.post('/', async (req, res) => {
  console.log("pname "+req.body.pname+" vendorId"+req.body.vendorId+"\\\\\\"+" vendor price: "+req.body.price+" vendor qty :-"+req.body.qty)
      
        const result = await Products.create({
          pname: req.body.pname,
          vendorId: req.body.vendorId,
          price:req.body.price,
          qty:req.body.qty
        }).then((item)=>{
        res.status(200).send(item)
        }).catch((error)=>{
          console.log(error)
          res.status(500).send(error)
        })
      
    })

    route.delete('/', (req,res) => {
      Products.destroy( {
      where: {
      id:req.body.id
      }
      })
      .then( () =>{
      res.status(201).send("deleted")
      })
      .catch( (error) => {
      res.status(500).send("Could not delete product")
      })
      }) 

    exports=module.exports=route