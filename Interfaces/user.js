const route = require('express').Router()
const Users = require('../db').User

route.post('/', async (req, res) => {
    console.log(req.body.vname)
    try {
      const result = await Users.create({
        name: req.body.name
      })
      res.send({ success: true })
    } catch (e) {
      res.send({ success: false, err: e.message })
    }
})

route.get('/', (req, res) => {
    await Users.findAll()
      .then((user) => {
        res.status(200).send(user)
        console.log(user)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
})  

route.get('/:userName', (req, res) => {
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