import { Injectable } from "@angular/core";
import { register } from "module";



@Injectable({
    providedIn: 'root'
})
export class endpointsService{

    private baseUrl = 'http://localhost:8080';
    private auth = '/api/auth';


    endpoints = {
        login: this.baseUrl + this.auth + "/login",
        register: this.baseUrl + this.auth + "/register"
    }
    
}