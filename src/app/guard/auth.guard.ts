import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route :Router){}
  canActivate():boolean{
   
    if(this.islogin()){
      return true;
    }else{
      
    this.route.navigateByUrl("login")

    return false;
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',
    //   footer: '<a href="">Why do I have this issue?</a>'
    // })
    }
    }
    islogin():boolean{
      return !!localStorage.getItem("UserId")
    }
  
}
