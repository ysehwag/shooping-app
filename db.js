const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/shopping.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})


  const User=db.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  const Vendor = db.define('vendors', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  const Product = db.define('products', {
    pname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price:{
        type:Sequelize.NUMBER,
        allowNull:false
    },
    qty:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
   
  })
  
  const Cart=db.define('carts', {
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
  })

  Vendor.hasMany(Product, {onDelete:'cascade'})
  Product.belongsTo(Vendor)

  Product.hasMany(Cart,{onDelete:'cascade'})
  Cart.belongsTo(Product)

  User.hasMany(Cart,{onDelete:'cascade'})
  Cart.belongsTo(User)

db.sync()
.then(()=> {
  console.log("Db is created")
})
.catch((error)=>{
  console.log(error)
})
exports=module.exports={db,Vendor,Product,Cart,User}