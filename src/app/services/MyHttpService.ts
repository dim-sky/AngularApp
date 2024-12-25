import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  private apiUrl = 'http://localhost:8080/student';  // Your Spring Boot API endpoint

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);  // Sending GET request to Spring Boot
  }
}


