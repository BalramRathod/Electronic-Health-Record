import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';

@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.component.html',
  styleUrls: ['./otp-auth.component.css']
})
export class OtpAuthComponent {

  id: string =''
  constructor( private ApiAuth:AuthenticationService,private _active: ActivatedRoute,private route:Router) 
  {
    this._active.queryParams.subscribe(queryprams => {
      this.id = queryprams["id"];
      
    })
  }

    loginform = new FormGroup({
      otp: new FormControl("", [Validators.required])
    })
    get loginformcontrol() {
      return this.loginform.controls;
    }
    submited:boolean=false
    data:any
    onSubmit(){
      this.submited=true
      if(this.loginform.invalid){
        return
      }else{
         
        this.data={
          otp:this.loginform.value.otp,
          userId:this.id
        }
        this.ApiAuth.otpAuth(this.data).subscribe(x => {
          console.log(x)
          if(x==true){
            Swal.fire("Activated")
            this.route.navigateByUrl("login")
          }else{
            Swal.fire("OTP is Invalid")
          }
          
    
        })
 
      }

    }


  }

