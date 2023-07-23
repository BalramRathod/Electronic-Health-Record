import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/APIService/authentication.service';
import { AuthguardService } from 'src/app/APIService/authguard.service';
import Swal from 'sweetalert2';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-provider-dash',
  templateUrl: './provider-dash.component.html',
  styleUrls: ['./provider-dash.component.css']
})
export class ProviderDashComponent implements OnInit {
  faUserIcon =  faUser;
  constructor(private APIAuth: AuthenticationService, private router: Router, private _userSarvice: AuthguardService) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(25)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(25)]),
  })

  get loginformcontrol() {
    return this.loginform.controls;
  }
  submited: boolean = false
  loader: boolean = false;
  userData: any
  onSubmit() {

    this.submited = true;
    this.loader = true;
         // loader open
         Swal.fire({
          title: 'Redirecting on Your Dashboard...',
          html: 'Please wait...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer:700,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        // loader close
    this.userData =
    {
      username: this.loginform.value.username,
      password: this.loginform.value.password

    }


    this.APIAuth.login(this.userData).subscribe(res => {
      console.log("res", res);
      if (res.message == "notfound") {
        Swal.fire("Username and Password not Match")
        this.loader = false
      }
      if (res.message == "notactive") {
        Swal.fire("Account Not Active")
        this.loader = false
      }
      localStorage.setItem("UserId", res.user.userId)
      localStorage.setItem("token", res.token)
      localStorage.setItem("patientId", res.user.patientId)
      localStorage.setItem("providerId", res.user.providerId)

      this.loader = false
      if (res.user.users.user_type == 1) {
        this.router.navigateByUrl("dashbord/patient")
        this._userSarvice.DataSharing.next("logout")
      } else {
        console.log(res.user.users.user_type)
        this.router.navigateByUrl("dashbord/provider")
        //this._userSarvice.DataSharing.next("logout")

        this._userSarvice.DataSharing.next("logout")
      }
    })


  }



}
