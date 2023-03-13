import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  productid:any
  items:any=[]
  viewproduct:any
   name:string=''
   viewitems:any
   

 
  constructor(private api:ApiService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    //fetch path parameter from url
   this.activatedRoute.params
   .subscribe((data:any)=>{
     console.log(data['id']);
     this.productid=data['id']
   })
   //to get details of requested product
   this.api.viewproduct(this.productid)
   .subscribe((result:any)=>{
     this.viewproduct=result.product
     console.log(this.viewproduct);
     this.viewitems=result.items
     
     
     
   })
  }


  //addtocart
  addtocart(product:any){
    if(localStorage.getItem('name')){
      this.api.addtocart(product)
    .subscribe((result:any)=>{
      // this.api.cartitemList.next(result)
      console.log(result);
      alert(result.message)
      
      
      window.location.reload()
        
    },
    (result:any)=>{
      alert(result.error.message)
    }
  ) 
    }
    else{
      alert('Please Login')
    }
  }
  
}
