import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  restaurentForm=this.fb.group({
    name:['',[Validators.required]],
    image:['',[Validators.required]],
    place:['',[Validators.required]],
    time:['',[Validators.required]],
    type:['',[Validators.required]],
    itemName:['',[Validators.required]],
    itemImage:['',[Validators.required]],
   itemAmount:['',[Validators.required]]
   
  })

itemForm=this.fb.group({
  
})
 

constructor(private api:ApiService,private fb:FormBuilder){}

  ngOnInit(): void {
    
  }


  upload(){
    if(this.restaurentForm.valid){
      console.log(this.restaurentForm);
      
    }
  }

  // upload(){
  // if(this.itemForm.valid){
  //   console.log(this.itemForm);
    
  // }
   
  // }
}
