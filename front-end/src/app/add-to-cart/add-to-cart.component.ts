import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IPayPalConfig ,ICreateOrderRequest } from 'ngx-paypal';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  cart:any
  cartstatus=''
  total:number=0
  grandtotal:number=0
  topay:any=0
  cartview:any
  viewproduct:any
  productid:any
  productQuantity:any=1
  items:any

  deliveryForm=this.fb.group({
    mobile:['',[Validators.required]],
    name:['',[Validators.required]],
    address:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]]
  })
 

  public payPalConfig ? : IPayPalConfig;
  

  constructor(private api:ApiService,private fb:FormBuilder,private router:Router){}
  
 
  // @ViewChild('paypalRef', { static: true }) private paypalRef:ElementRef;

  ngOnInit(): void {
    this.api.getcart()
    .subscribe((result:any)=>{
      console.log(result);
      this.cart=result.cart
      // this.api.cartitemList.next(this.cart)
      console.log(this.cart);

      this.cart.map((item:any)=>{        
        this.total += (item.price)
        console.log(this.total);
        this.grandtotal=this.total
        this.topay=this.total+57
        console.log(this.topay);
      })
    },
    (result:any)=>{
      this.cartstatus= result.error.message
    })
  //  =====================================
  this.initConfig();
  }


  deletecart(productid:any){
    this.api.deletecart(productid)
    .subscribe((result:any)=>{
      this.cart=result.cart
      // if(this.cart.length==0){
      //   this.cartstatus='wishlist empty'
      // }
      window.location.reload()

    },
    (result:any)=>{
      alert(result.error.message)
    }
    )}


  //quantity incrementing and decrementing
   Quantity(val:string){
    this.api.getcart()
    .subscribe((result:any)=>{
      console.log(result);
      this.cart=result.cart
    })
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
      this.cart.map((item:any)=>{
        this.total = (item.price*this.productQuantity)
        console.log(this.total);
        this.grandtotal=this.total
        this.topay=this.total+57
        console.log(this.topay);
      })

    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
      this.cart.map((item:any)=>{
        this.total = (item.price*this.productQuantity)
        console.log(this.total);
        this.grandtotal=this.total
        this.topay=this.total+57
        console.log(this.topay);
      })
      
    }
  }

  deliver(){
    if(this.deliveryForm.valid){
      console.log(this.deliveryForm);
      
      let email=this.deliveryForm.value.email
      let name=this.deliveryForm.value.name
      let mobile=this.deliveryForm.value.mobile
      let home=this.deliveryForm.value.address
      this.api.deliver(name,email,mobile,home)
      .subscribe((result:any)=>{
        alert(result.message)
      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }
    else{
      alert('Invalid Form')
    }
  }

  //deleteallcart
  deleteAllitem(){
    this.api.removeAllcart()
    .subscribe((result:any)=>{
      window.location.reload()
      console.log(result);
      
    })
  }

 
  

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AfJeQyHhAXyQFp0ZqhZIlHXFQ2FXlb3wGKlZ8QKnwvSJNwyebj6kQD3O8qiR8sQG0YR5JAqdXB1O672P',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.topay,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.topay
                        }
                    }
                },
                items: [{
                    name: 'john',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.topay
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            // color:'blue',
            shape:'pill',
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            setTimeout(() => {
              this.deleteAllitem()
              this.router.navigateByUrl('/orders')
            }, 1000);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            if(localStorage.getItem('email')){
              var randomid=''
              var i=0
              var characters='1234567890'
              for(i;i<10;i++){
                randomid+=characters.charAt(Math.floor(Math.random()*characters.length))
              }
              let email=localStorage.getItem('email')
              this.items=this.cart
              console.log(email);
              console.log(this.items);
              this.items.map((data)=>{
                console.log(data.id);
                let item = data.strCategory
                let image=data.strCategoryThumb
                let price=data.price
                console.log(item,image,price);
                this.api.orders(email,item,image,price,randomid)
                .subscribe((result:any)=>{
                  // alert(result.message)
                },
                (result:any)=>{
                  // alert(result.error.message)
                }
                )
              })
             }
             else{
              alert('invalid form')
             }
            
        }
    };
    

 }

}

