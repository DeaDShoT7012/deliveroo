const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/project',()=>{
    console.log('mongodb connected succesfully');
})

const User = mongoose.model('User',{
    user:String,
    email:String,
    password:String,
    address:[],
    orders:[],
    cart:[]
    
})

//to store all-products
const Product = mongoose.model('Product',
{  
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
      rate: Number,
      count: Number
    },
    items:[]
  }
)

const Cart = mongoose.model('Cart',{
  id: String,
  strCategory: String,
  strCategoryThumb: String,
    price: Number,

})


module.exports={
    User,
    Product,
    Cart
}