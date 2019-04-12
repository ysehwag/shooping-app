const route = require('express').Router()
const Users = require('../db').User

route.post('/',async (req,res) =>{
  await Users.findOne({
      where : {
          name: req.body.userName
      }
  }).then(async (user) =>{
       if(user==null) {
          await Users.create({
              name: req.body.userName
          }).then((user) => {
              res.status(201).send({success:true, data:user})
          }).catch((err) => {
              res.status(501).send({
                  error:"coludn't add user"
              })
          })
       } 
       else{
          res.status(201).send(user)
       }
  }) .catch((err) => {
      res.status(501).send({
          error:"coludn't add user"
      })
  })
})
  

route.get('/', async (req, res) => {
    await Users.findAll()
      .then((user) => {
        res.status(200).send(user)
        console.log(user)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
})  

route.get('/:userName', async (req, res) => {
    await Users.findOne({
        where: {
            name : req.params.userName
        }
    })
      .then((user) => {
        res.status(200).send(user)
        console.log(user)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
})  

exports = module.exports = route