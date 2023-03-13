const db = require('./db')


const signup = (user,email,pswd)=>{
    //check email in mongodb
  return  db.User.findOne({
        email
    }).then((result)=>{
        // console.log(result);
        if(result){
            return{
                statusCode:403,
                message:'Account Already Exist'
            }
        }
        else{
            //add new user
            const newUser = new db.User({
                user:user,
                email:email,
                password:pswd,
                address:[],
                orders:[],
                cart:[]
                
            })
            newUser.save()
            return{
                statusCode:200,
                message:'sign up succesfull..'
            }
        }
    })
}

const login = (email,pswd)=>{
 return   db.User.findOne({
        email,
        password:pswd
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:'Login Succesfull',
                name:result.user,
                email:result.email
            }
        }
        else{
            return{
                statusCode:401,
                message:'Invalid Account / Password'
            }
        }
    })
}

//all-products
const allproducts = ()=>{
    return db.Product.find().then(
       (result)=>{
        //    console.log(result);
           if(result){
               return{
                   statusCode:200,
                   products:result
               }
           }
           else{
               return{
                   statusCode:404,
                   message:'No data is present'
               }
           }
       }
    )
   }

   const viewproduct = (id)=>{
    return  db.Product.findOne({
          id
      })
      .then((result)=>{
          if(result){
              return{
                  statusCode:200,
                  product:result,
                  items:result.items
              }
          }
          else{
              return{
                  statusCode:404,
                  message:'Product is unavailable'
              }
          }
      })
      
  }


    //addtocart
    const addtocart = (product)=>{
    
        return db.Cart.findOne({
            id:product.strid
        }).then((result)=>{
            // console.log(result);
            if(result){
                return{
                    statusCode:401,
                    message:'Item already in the Cart'
                }
            }
            else{
                let newproduct = db.Cart({
                    id: product.strid,
                    strCategory:product.strCategory,
                    price:product.price,
                    strCategoryThumb:product.strCategoryThumb,
                    
                })
               newproduct.save()
            //    let cartitemList = newproduct
               
                return{
                    statusCode:200,
                    message:'item added to your cart'
                    
                } 
               
            }
    
        })
      }


  //getcart
  const getcart = ()=>{
    return db.Cart.find().then(
        (result)=>{
            // console.log(result);
            if(result){
                return{
                    statusCode:200,
                    cart:result                      
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'cart is empty'
                }
            }
        }
     )
  }

  //deletecart
  const deletecart = (strid)=>{
    return db.Cart.deleteOne({strid})
    .then((result)=>{
        if(result){
            return db.Cart.find().then(
                (result)=>{
                    if(result){
                        return{
                            statusCode:200,
                            cart:result
                        }
                    }
                    else{
                        return{
                            statusCode:404,
                            message:'cart is empty'
                        }
                    }
                }
             )
        }
        else{
            return{
                statusCode:404,
                message:'Item not Found'
            }
        }
    })   
  }

  const deliver = (email,name,mobile,home)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            result.address.push({
                Name:name,
                EmailId:email,
                Mobile:mobile,
                Address:home   
            })
            result.save()
            // console.log(result.Address);
            return{
                statusCode:200,
                message:'Address Saved'
            }
        }
        else{
            return{
                statusCode:401,
                message:'please login   '
            }
        }
    })
        
  }

  //add orders
  const orders = (email,item,image,price,randomid) =>{
    return db.User.findOne({
        email
    }).then((result)=>{
        // console.log(result);
        if(result){
            result.orders.push({
                id:randomid,
                item:item,
                image:image,
                price:price
            })
            result.save()
            return{
                statusCode:200,
                message:'order added'
            }
        }
        else{
            return{
                statusCode:401,
                message:'please login'
            }
        }
    })
  }

  //get orders
  const getOrders = (email)=>{
    return db.User.findOne({
        email
    })
    .then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:200,
                orders:result.orders
            }
        }
        else{
            return{
                statusCode:401,
                message:'Invalid Email'
            }
        }
    })
  }

  //getAddress
  const getAddress = (email)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                address:result.address
            }
        }
        else{
            return{
                statusCode:401,
                message:'Add Address'
            }

        }
    })
  }

  //remove cart
  const removeAllcart = ()=>{
    return db.Cart.deleteMany()
    .then((result)=>{
        if(result){
            return{
               statusCode:200,
               message:'Item deleted' 
            }
        }
        else{
            return{
                statusCode:401,
                message:'Cart is empty'
            }
        }
    })
  }

module.exports={
    signup,
    login,
    allproducts,
    viewproduct,
    addtocart,
    getcart,
    deletecart,
    deliver,
    orders,
    getOrders,
    getAddress,
    removeAllcart
  
}

