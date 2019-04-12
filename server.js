const express=require('express')
const app=express()
const path=require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',express.static( path.join(__dirname, 'public')))

app.use('/',require('./Interfaces'))
app.listen(8181)