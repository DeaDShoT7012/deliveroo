const express = require('express')
const cors = require('cors')
const dataservice = require('./services/dataservice')

const server = express()

server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log('server is listening at port 3000');
})


//signup api call
server.post('/signup',(req,res)=>{
    console.log('inside register');
    console.log(req.body);
    //asynchorus
    dataservice.signup(req.body.user,req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


//login api call
server.post('/login',(req,res)=>{
    console.log('inside login');
    console.log(req.body);
    //asynchorus
    dataservice.login(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//all-products Api
server.get('/all-products',(req,res)=>{
    console.log('inside all-product api');
   dataservice.allproducts().then(
    (result)=>{
        res.status(result.statusCode).json(result)
    }
   ) 
})

//view-products Api
server.get('/view-products/:productid',(req,res)=>{
    dataservice.viewproduct(req.params.productid)
    .then((result)=>{
         res.status(result.statusCode).json(result)
     }) 
 })



 //addtocart
 server.post('/add-to-cart',(req,res)=>{
    dataservice.addtocart(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })
 })

 //getcart
 server.get('/get-cart',(req,res)=>{
   dataservice.getcart().then(
    (result)=>{
        res.status(result.statusCode).json(result)
    }
   ) 
})

// remove cart-items
server.delete('/delete-cart-item/:productId',(req,res)=>{
    dataservice.deletecart(req.params.productId)
    .then((result)=>{
         res.status(result.statusCode).json(result)
     }
    ) 
 })

 //delivery form

server.post('/deliver',(req,res)=>{
    dataservice.deliver(req.body.email,req.body.name,req.body.mobile,req.body.home)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add orders
server.post('/orders',(req,res)=>{
    dataservice.orders(req.body.email,req.body.item,req.body.image,req.body.price,req.body.randomid)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get orders
server.post('/get-orders',(req,res)=>{
    dataservice.getOrders(req.body.email)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get address
server.post('/get-address',(req,res)=>{
    dataservice.getAddress(req.body.email)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//remove all cart
server.delete('/delete-all-cart',(req,res)=>{
    dataservice.removeAllcart()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})