const route=require('express').Router()
route.use('/vendors',require('./vendor'))
route.use('/products',require('./product'))
route.use('/users',require('./user'))
route.use('/carts',require('./cart'))

exports=module.exports=route