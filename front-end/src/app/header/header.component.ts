import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  errormsg:string=''
  sucessmsg:boolean=false
  productid:any
  items:any=[]
  viewproduct:any
  islogin:string=''
  name:string=''
  cartItemCount=0   

   //login group
   loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  })

  signupForm = this.fb.group({
    user:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  })
constructor(private fb:FormBuilder,private api:ApiService,private activatedRoute:ActivatedRoute,private router:Router,){}

ngOnInit(): void {
  if(localStorage.getItem('name')){
    this.name = localStorage.getItem('name') || ''
    this.islogin='login'
  }

  //cart count
  this.api.getcart()
    .subscribe((result:any)=>{
      this.cartItemCount=result.cart.length
    })
}

login(){
  if(this.loginForm.valid){
    console.log(this.loginForm);
    let email = this.loginForm.value.email
    let pwsd = this.loginForm.value.pswd
    this.api.login(email,pwsd)
    .subscribe((result:any)=>{
      console.log(result);
      
      // this.sucessmsg=true
      //store username in localstorage
      localStorage.setItem('name',result.name)
      localStorage.setItem('email',result.email)
      this.islogin='login'
    },
    (result:any)=>{
     this.errormsg =result.error.message
    }
    )
  }
  else{
    alert('Invalid form')
  } 
}

signup(){
  if(this.signupForm.valid){
    console.log(this.signupForm);
    let user = this.signupForm.value.user
    let email = this.signupForm.value.email
    let pswd = this.signupForm.value.pswd
    this.api.signup(user,email,pswd)
    .subscribe((result:any)=>{
      alert(result.message)
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
  }
  else{
    alert('Invalid form')
  }

}

//logout
logout(){
  localStorage.removeItem('name') 
  localStorage.removeItem('email') 
  //navigate to login
setTimeout(() => {
  this.router.navigateByUrl('')
  window.location.reload();
}, 1000);
}


refresh(){
  window.location.reload();
}




}
