const express=require('express')
const app=express()
const path=require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',express.static( path.join(__dirname, 'public')))

app.use('/',require('./Interfaces'))
const PORT = process.env.PORT || 1443
app.listen(PORT,()=>{
    console.log('server is running at '+'http://localhost:'+PORT)
})