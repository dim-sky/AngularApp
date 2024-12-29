import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './userService';

@Injectable({
  providedIn: 'root'  // This makes it available globally, no need to add it to 'providers' manually
})
export class NavigationService  {

    constructor(private router: Router, private userService: UserService){}


    goToHomePage(){
      // console.log("Is user Admin????");
      // console.log(this.userService.isAdmin());
      if( this.userService.isAdmin()){
        this.router.navigate(['/admin']);
        return
      }

        console.log("About To Navigate!");
        console.log(this.userService.getUserDetails()?.authenticated);
      if (!this.userService.getUserDetails()?.authenticated){
        this.router.navigate(['/unAuth']);
      } else {
        this.router.navigate(['/home']);
      }
    }


    goToLoginPage(){
        this.router.navigate(['/login']);
    }


}