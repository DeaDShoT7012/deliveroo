import { Component, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  
  products:any=[]


  constructor(private api:ApiService){
  
  }

  ngOnInit(): void {
    this.api.getallproducts()
    .subscribe((result:any)=>{
      console.log(result);
      this.products = result.products
  
    })
  }


  

  
}

