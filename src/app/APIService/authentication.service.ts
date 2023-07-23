import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  auth_url = 'https://localhost:7015/api/Authentication/';


  register(data: any): Observable<any> {
    let url = this.auth_url + "register"

    return this.http.post(url, data)
  }

  login(data: any): Observable<any> {
    let url = this.auth_url + "login";
    return this.http.post(url, data)
  }

  otpAuth(data: any): Observable<any> {
    let url = this.auth_url + "OTP"
    return this.http.post(url, data)
  }

  //-----getSpeciality ----
  getSpeciality(): Observable<any> {
    let url = 'https://localhost:7015/api/Specialities'
    return this.http.get(url)
  }

  getProviderBySpeciality(id: any): Observable<any> {
    let url = 'https://localhost:7015/api/Providers/' + id;
    return this.http.get(url);
  }

  //-----https://localhost:7015/api/Appointments---
  base_url = 'https://localhost:7015/api/Appointments/'
  addAppointments(data: any): Observable<any> {

    return this.http.post(this.base_url, data)
  }
  getAppointments(id: any): Observable<any> {
    let url = this.base_url +"GetAppointmentUserId/"+ id
    return this.http.get(url)
  }


  

  //---https://localhost:7015/api/Providers/getByProviderId/--
  getProviderName(id: any): Observable<any> {
    let url = 'https://localhost:7015/api/Providers/getByProviderId/' + id
    return this.http.get(url)

  }


  base_url_provider='https://localhost:7015/api/Providers/'
  getProvider(id: any): Observable<any> {
    let url = this.base_url_provider+"getProvider/" + id
    return this.http.get(url)
  }

  updateProvider(id:any,data:any):Observable<any>
  {
    let url = this.base_url_provider+"update/"+id
    return this.http.put(url,data)

  }

  //------SOAP---
  url_SOAP='https://localhost:7015/api/SOAPs/'
  AddSoap(data:any):Observable<any>{
  let url =this.url_SOAP+"addSoap"
  return this.http.post(url,data)
  }

  //--https://localhost:7015/api/SOAPs/cancelAppointment/---
  cancal(id:any):Observable<any>{
    let url ='https://localhost:7015/api/SOAPs/cancelAppointment/'+id
    return this.http.get(url)
  }

  getSOAP(id:any):Observable<any>{
    let  url='https://localhost:7015/api/SOAPs/SOAPByAppointmentId/'+id
    return this.http.get(url)
  }
}
