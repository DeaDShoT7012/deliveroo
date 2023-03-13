import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // cartitemarray:any = []
  cartitemList = new BehaviorSubject([])

  constructor(private http:HttpClient) { }

  //signup
  signup(user:any,email:any,pswd:any){
    const body={
      user,
      email,
      pswd
    }
   return this.http.post('http://localhost:3000/signup',body)
  }


  //login
  login(email:any,pswd:any){
    const body={
      email,
      pswd
    }
    return this.http.post('http://localhost:3000/login',body)
  }

  //all-products api 
  getallproducts(){
    return  this.http.get('http://localhost:3000/all-products')
    }

   //view-product api
    viewproduct(productid:any){
      return this.http.get('http://localhost:3000/view-products/'+productid)
    }

    //add-to-cart
    addtocart(product:any){
      return this.http.post('http://localhost:3000/add-to-cart',product)
    }

     //getcart
  getcart(){
    return  this.http.get('http://localhost:3000/get-cart')
    }

    // remove cart-item
    deletecart(productid:any){
  return this.http.delete('http://localhost:3000/delete-cart-item/'+productid)
}

//deliver
deliver(name:any,email:any,mobile:any,home:any){
  const body={
    name,
    email,
    mobile,
    home
  }
 return this.http.post('http://localhost:3000/deliver',body)
}

//add orders
orders(email:any,item:any,image:any,price:any,randomid:any){
  const body={
    email,
    item,
    image,
    price,
    randomid
  }
  return this.http.post('http://localhost:3000/orders',body)

}

//get orders
getOrders(email:any){
  const body={
    email
  }
  return this.http.post('http://localhost:3000/get-orders',body)

}

//get address
getAddress(email:any){
  const body={
    email
  }
  return this.http.post('http://localhost:3000/get-address',body)

}

//delete all cart
removeAllcart(){
  return this.http.delete('http://localhost:3000/delete-all-cart')
}

}
