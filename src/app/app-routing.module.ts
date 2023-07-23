import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { OtpAuthComponent } from './otp-auth/otp-auth.component';
import { PatientDashbordComponent } from './patient-dashbord/patient-dashbord.component';
import { ProviderDashbordComponent } from './provider-dashbord/provider-dashbord.component';
//import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guard/auth.guard';
import { ProviderDashComponent } from './provider/provider-dash/provider-dash.component';
import { ProviderAppointComponent } from './provider/provider-appoint/provider-appoint.component';

const routes: Routes = [

                        //{path:"register1",component:RegistrationComponent},
                        // {path:"login",component:LoginComponent},
                        {path:"dashbord/patient",component:PatientDashbordComponent,canActivate:[AuthGuard]},
                        {path:"dashbord/provider",component:ProviderDashbordComponent,canActivate:[AuthGuard]},
                        {path:"activeAccount",component:OtpAuthComponent},
                       // {path:"",component:LoginComponent},
                        {path:"",component:ProviderDashComponent},
                        {path:"login",component:ProviderDashComponent},
                        {path:"register",component:ProviderAppointComponent},

                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
