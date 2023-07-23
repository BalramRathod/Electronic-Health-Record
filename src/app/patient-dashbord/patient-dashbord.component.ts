import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-dashbord',
  templateUrl: './patient-dashbord.component.html',
  styleUrls: ['./patient-dashbord.component.css']
})
export class PatientDashbordComponent {
timeSlot=["12:00","12:30","01:00",'01:30','02:00','02:30','03:00',
          '03:30','04:00','04:30','05:00','05:30','06:00','06:30',
          '07:00','07:30','08:00','08:30','09:00','09:30','10:00',
          '10:30','11:00','11:30']

constructor(private route :Router ,private ApiService:AuthenticationService, private datepipe :DatePipe)
{

  
}
  TheaterId: number = 0
  username: any
  password: any
  data: any
  // isEmptyList(){
  //   if(this.AppointmentsList.){
  //     return false
  //   }else return true
  // }
  Speciality:any
  getSpeciality(){
   this.ApiService.getSpeciality().subscribe(res=>{
    console.log(res)
    this.Speciality=res
   })

  }

  ngOnInit() {
   this.getAppointments();
      // console.log(this.isEmptyList())
  }
AppointmentsList:any
show='show'
getAppointments(){
  this.ApiService.getAppointments(localStorage.getItem("UserId"))
       .subscribe
       (res => {
        console.log(res)
         this.AppointmentsList = res
         
        
           console.log("dasdsad",this.AppointmentsList.length)
           if(this.AppointmentsList.length==0){
             this.show='empty'
             
         }else{this.show='show'}
 
       })
}
gotoDashboard(){

}
Profile(){

}
logout(){
  localStorage.clear();
  this.route.navigateByUrl("/login")
  
}

close(){
  var str2='data-bs-dismiss=""'
  if(this.loginform.valid){
  var str='data-bs-dismiss="modal"'
 
  return str 
  }
  return str2

}
  
  dashbord(){
  this.route.navigateByUrl("dashboard")
}
  back(){
    this.route.navigateByUrl("dashboard")
  }
   del(id: any) {

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._userService.deleteTheater(id).subscribe(res => {
  //         console.log(res)
  //         this.getTheater();
  //       })
  //       Swal.fire(
  //         'Deleted!',
  //         'success'
  //       )
  //     }
  //   })


    console.log(id)

    // location.reload()

  }


  // Edit(id: any) 
  // {
  //   this._employee.editId=id;

  //   // this.route.navigateByUrl("details/edit");
  // }

  //------ add product------- 
  submited: boolean = false
  ptn = '^[0-9]$'
  loginform = new FormGroup({
    date: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    AmPm: new FormControl("",[Validators.required]),
    speciality: new FormControl("", [Validators.required]),
    provider: new FormControl("", [Validators.required]),
    note: new FormControl("", [Validators.required])

  })

  get loginformcontrol() {
    return this.loginform.controls;
  }
  providerName(id:any){
    this.ApiService.getProviderName(id).subscribe(res=>{
      console.log(res)
      return res
    })

  }

provider:any
getByProvider(id:any){
  this.ApiService.getProviderBySpeciality(id.target.value).subscribe(res=>{
  this.provider=res;
  console.log("this",res)
  })
}
  Add(){
    this.getSpeciality();
    //console.log("aa")
    this.form_flag='add';
    this.submited = false
    this.loginform.reset();
  }
  AppointmentsData:any=[]
  addAppointments() {
    this.submited = true
    if(this.loginform.invalid){return}else{
    this.AppointmentsData={
      patientId:localStorage.getItem("patientId"),
      providerId:this.loginform.value.provider,
      appointmentDate:this.loginform.value.date,
      appointmentTime:this.loginform.value.time+" "+this.loginform.value.AmPm,
      note:this.loginform.value.note,
      appointmentStatus:"Booked"
    }
    console.log(this.AppointmentsData)
    this.ApiService.addAppointments(this.AppointmentsData).subscribe(res=>{
      console.log(res)
      Swal.fire("Appointment Booked")
      this.getAppointments();
    })
    document.getElementById("close")?.click()
  }
  }
  form_data: any
  form_flag:string=''
  Edit1(id: any) {
  }

  Edit2() {
 
  }
  upFlag:boolean=true
  updateflag(){
    this.upFlag=false

  }

  SOAP=''
  SOAPDetails:any
SOAPShow(id:any,status:any){
  
  if(status=="Booked"){
    Swal.fire("Please wait for provider response !! Thank You !!")
    return
  }
  this.SOAP='true'
  this.ApiService.getSOAP(id).subscribe(res=>{
this.SOAPDetails=res
console.log(res)
  })
}
closeSOAP()
{
  this.SOAP='';
}


}
