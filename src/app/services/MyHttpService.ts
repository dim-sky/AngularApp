import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './userService';
import { loginRequest } from '../models/login/loginRequest';
import { endpointsService } from './endpointsService';

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

  getUserDetails(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`,
    });
    console.log('sending request to: ' + this.endpointsService.endpoints.userDetails);
    return this.http.get(this.endpointsService.endpoints.userDetails, { headers });
  }

}


