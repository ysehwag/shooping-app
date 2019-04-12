const route = require('express').Router()
const Vendors = require('../db').Vendor

//vendor get req
route.get('/', (req, res) => {
  Vendors.findAll()
    .then((ven) => {
      res.status(200).send(ven)
      console.log(ven)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

//vendor post request
route.post('/', async (req, res) => {
  console.log(req.body.vname)
  try {
    const result = await Vendors.create({
      name: req.body.vname
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})


route.delete('/', (req,res) => {
  Vendors.destroy( {
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

exports = module.exports =route
