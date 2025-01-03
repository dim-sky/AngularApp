import { Injectable } from "@angular/core";
import { register } from "module";


@Injectable({
    providedIn: 'root'
})
export class endpointsService{

    private baseUrl = 'http://localhost:8080';
    private auth = '/auth';
    private user = '/api/user';
    private admin = '/api/admin';
    private event = '/api/events';
    

    endpoints = {
        login: this.baseUrl + this.auth + "/login",
        register: this.baseUrl + this.auth + "/register",
        userDetails: this.baseUrl + this.user + "/userDetails",
        notAuthenticated: this.baseUrl + this.user + "/users/notAuthenticated",
        createEvent: this.baseUrl + this.event + "/create",
    }

    approveUserUrlBuilder(userId: number){
        return this.baseUrl + this.admin + "/users/" + userId + "/approve";
    }
    
}