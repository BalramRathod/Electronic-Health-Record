import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
constructor(private APIAuth:AuthenticationService,private router:Router){}

  email_pat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  loginform = new FormGroup({
    f_name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    l_name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    role: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.email_pat)]),
    mobile: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    DOB: new FormControl("", [Validators.required]),
    address: new FormControl(""),
    userName: new FormControl("", [Validators.required]),

  })

  get loginformcontrol() {
    return this.loginform.controls;
  }
  submited:boolean=false;
  userData:any;
  loader:boolean=false;
  onSubmit(){
    this.submited=true

    if(this.loginform.invalid)
    {return}else{

      // loader open
      Swal.fire({
        title: 'Registering  User...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      // loader close

      this.loader=true
      this.userData={
        firstName:this.loginform.value.f_name,
        lastName:this.loginform.value.l_name,
        email:this.loginform.value.email,
        phone:this.loginform.value.mobile,
        dob:this.loginform.value.DOB,
        address:this.loginform.value.address,
        username:this.loginform.value.userName,
        user_type:this.loginform.value.role

      }
     console.log(this.userData)

     this.APIAuth.register(this.userData).subscribe(res=>
     {
       console.log(res)
       this.loader=false
       if(res.message=='emailfound'){
        Swal.fire("Email is alrady used")
       }
       if(res==true)
       {
        Swal.fire("OTP send on your email!")
        this.router.navigateByUrl("login")
       }
      })

    }

  }
}
