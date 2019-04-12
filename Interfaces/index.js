const route=require('express').Router()
route.use('/vendors',require('./vendor'))
route.use('/products',require('./product'))

exports=module.exports=route