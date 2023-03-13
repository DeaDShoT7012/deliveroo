import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errormsg:string=''
  sucessmsg:boolean=false

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

    constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
      
    }


  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      let email = this.loginForm.value.email
      let pwsd = this.loginForm.value.pswd
      this.api.login(email,pwsd)
      .subscribe((result:any)=>{
        this.sucessmsg=true
        //navigate to dashboard
        setTimeout(()=>{
          this.router.navigateByUrl('view-products/:id')
        },2000)
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

}
