import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './userService';
import { loginRequest } from '../models/login/loginRequest';
import { endpointsService } from './endpointsService';
import { registerRequest } from '../models/register/registerRequest';
import { createEventRequest } from '../models/createEvent/createEvent.Request';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  private apiUrl = 'http://localhost:8080/student';  // Your Spring Boot API endpoint

  constructor(private http: HttpClient,  private endpointsService: endpointsService, private userService: UserService) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);  // Sending GET request to Spring Boot
  }

  logIn(request: loginRequest): Observable<any>{
    // console.log("sending request to : " + this.endpointsService.endpoints.login);
    return this.http.post(this.endpointsService.endpoints.login, request)
  }

  register(request: registerRequest):  Observable<any>{
    return this.http.post(this.endpointsService.endpoints.register, request)
  }

  getUserDetailsReq(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    console.log('sending request to: ' + this.endpointsService.endpoints.userDetails);
    return this.http.get(this.endpointsService.endpoints.userDetails, { headers });
  }

  getUnAuthenticatedUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    return this.http.get(this.endpointsService.endpoints.notAuthenticated,  { headers })
  }

  approveUser(userId: number): Observable<any> {
    const url = this.endpointsService.approveUserUrlBuilder(userId);
    console.log("test")
    console.log(url);
    console.log("token")
    console.log(this.userService.getToken());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    console.log(headers);
    return this.http.put(url, null, { headers })
  }

  createEvent(request: createEventRequest): Observable<any> {
    const url = this.endpointsService.endpoints.createEvent;
    console.log("About to make a request at this url: ");
    console.log( url);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    return this.http.post(url, request,{ headers });
  }




}


