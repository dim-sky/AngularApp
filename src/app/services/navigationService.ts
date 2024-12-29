import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './userService';

@Injectable({
  providedIn: 'root'  // This makes it available globally, no need to add it to 'providers' manually
})
export class NavigationService  {

    constructor(private router: Router, private userService: UserService){}


    goToHomePage(){
        if( this.userService.isOrganization() || this.userService.isVolunteer()){
            this.router.navigate(['/home']);
          }
  
          if( this.userService.isAdmin()){
            this.router.navigate(['/admin']);
          }
  
    }


    goToLoginPage(){
        this.router.navigate(['/login']);
    }


}