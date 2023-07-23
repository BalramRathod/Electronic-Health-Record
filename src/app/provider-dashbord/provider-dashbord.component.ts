import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../APIService/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-provider-dashbord',
  templateUrl: './provider-dashbord.component.html',
  styleUrls: ['./provider-dashbord.component.css']
})
export class ProviderDashbordComponent {
  constructor(private router:Router,private ApiService:AuthenticationService){
    this.getAppointmentsList()
  }
  submited:boolean=false
  loader:boolean=false
  showFlag:string=''
  gotoDashboard(){
    this.showFlag=''
    this.table=''
    this.modal=''
    
    console.log(this.showFlag)
  }
  logout(){
    this.router.navigateByUrl("login")
    localStorage.clear()
  }
  Profile(){
    this.modal=''
    this.table='false'
    this.showFlag='show'
    this.getSpeciality();
    this.getProvider();
  }
  email_pat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  loginform = new FormGroup({
    f_name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    l_name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    Position: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.email_pat)]),
    mobile: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    DOB: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    Experience: new FormControl("", [Validators.required]),
    speciality: new FormControl("", [Validators.required]),

  })

  get loginformcontrol() {
    return this.loginform.controls;
  }

  providerData:any
  onSubmit(){
    this.submited=true

    if(this.loginform.invalid){return}else{
    this.loader=true
    this.providerData={
      first_name:this.loginform.value.f_name,
      last_name:this.loginform.value.l_name,
      experience:this.loginform.value.Experience,
      speciality:this.loginform.value.speciality,
      position:this.loginform.value.Position,
      mobile:this.loginform.value.mobile,
      address:this.loginform.value.address
    }
   
    this.ApiService.updateProvider(localStorage.getItem("providerId"),
    this.providerData).subscribe(res=>{
      console.log(res)
      this.getProvider();
    })
    
    this.loader=false 
    Swal.fire("Details Updated") 

  }
}
  Speciality:any
  getSpeciality()
  {
    this.ApiService.getSpeciality().subscribe(res=>{
      this.Speciality=res
    })

  }
ProviderData:any
  getProvider(){
    this.ApiService.getProvider(localStorage.getItem("providerId")).subscribe(res=>{
      this.ProviderData=res
      console.log(res)
      
      this.loginform.controls['f_name'].setValue(res.first_name)
      this.loginform.controls['l_name'].setValue(res.last_name)
      this.loginform.controls['Position'].setValue(res.position )
      this.loginform.controls['email'].setValue(res.email)
      this.loginform.controls['mobile'].setValue(res.mobile)
      this.loginform.controls['DOB'].setValue(res.dob.substring(0,10))
      this.loginform.controls['address'].setValue(res.address)
      this.loginform.controls['Experience'].setValue(res.experience)
      this.loginform.controls['speciality'].setValue(res.speciality)

    })
  }
updateFlag:string=''
  updateButtonFlag(){
   this.updateFlag='update'
  }

  AppointmentsList:any[]=[]

  getAppointmentsList(){
    this.ApiService.getAppointments(localStorage.getItem("UserId")).subscribe(res=>{
      this.AppointmentsList=res
      console.log(res)
    })
  }

  SOAP=new FormGroup({
    subjective:new FormControl("",[Validators.required]),
    Objective:new FormControl("",[Validators.required]),
    Assessment:new FormControl("",[Validators.required]),
    Plan:new FormControl("",[Validators.required]),
  })
  get SOAPControl() {
    return this.SOAP.controls;
  }
  table=''
  modal=''
  SOAPData:any
/*{
  "appointmentId": 1,
  "subjective": "string",
  "objective": "string",
  "assessment": "string",
  "plan": "string"
}*/
Submit(){
  this.submited=true
  if(this.SOAP.invalid)
  {
    return
  }else{
this.loader=true
  this.SOAPData={
    appointmentId:this.appId,
    subjective:this.SOAP.value.subjective,
    objective:this.SOAP.value.Objective,
    assessment:this.SOAP.value.Assessment,
    plan:this.SOAP.value.Plan
  }
  this.ApiService.AddSoap(this.SOAPData).subscribe(res=>{
   console.log(res)
   Swal.fire("SOAP Added")
      this.getAppointmentsList();
      this.modal=''
      this.table=''
  })
}
this.loader=false
}
appId=0
  view(appointmentId:any){
this.appId=appointmentId
    this.table='false'
    this.modal='SOAPmodal'
  }
cancal(id:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      this.ApiService.cancal(id).subscribe(res=>{
        this.getAppointmentsList();
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })


}


  closeView(){
    this.SOAP.reset()
    this.table=''
    this.modal=''  
  }

  isEmpty(){
    if(this.AppointmentsList.length==0){
      return false
    }
    return true
  }



  // shop node code
  // SOAP=''
//   SOAPDetails:any
// SOAPShow(id:any,status:any){
  
//   if(status=="Booked"){
//     Swal.fire("Please wait for provider response !! Thank You !!")
//     return
//   }
//   // this.SOAP='true'
//   this.ApiService.getSOAP(id).subscribe(res=>{
// this.SOAPDetails=res
// console.log(res)
//   })
// }

}
