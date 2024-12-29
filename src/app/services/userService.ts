import { Injectable } from "@angular/core"
import { UserDetails } from "../models/otherModels/userDetails";
import { AppStrings } from "../../resources/app.strings";

import { AuthService } from "./authService";


@Injectable({
    providedIn: 'root'
})
export class UserService {


    token: string | undefined;
    
    userDetails!: UserDetails;
  
    constructor(private authService: AuthService) {}

    setToken(token: string){
      this.token = token;

      //also roles is being setted from token
      // this.role = this.authService.getRoleFromToken(token);
      // console.log("AAAAAAAAAAaa");
      // console.log(this.role);
    }

    getToken(){
      return this.token;
    }
  
    
    setUserDetails(data: UserDetails): void {
      this.userDetails = {
        authenticated: data.authenticated,
        email: data.email,
        name: data.name,
        organizedEvents: data.organizedEvents,
        role: data.role,
        userId: data.userId,
        userName: data.userName,
        volunteeredEvents: data.volunteeredEvents

      }
      
      console.log("User Details set:")
      console.log(this.userDetails)
    }
  
    
    getUserDetails(): UserDetails | null {
      if (this.userDetails){
        return this.userDetails;
      }
      
      return null;
    }


    isOrganization(): boolean {
      if (!this.userDetails.role.roleName)
        return false;
      
      return (this.userDetails.role.roleName == AppStrings.roles.organization)
    }

    isVolunteer(): boolean {
      if (!this.userDetails.role.roleName)
        return false;
      
      return (this.userDetails.role.roleName == AppStrings.roles.volunteer)
    }

    isAdmin(): boolean {
      if (!this.userDetails.role.roleName)
        return false;
      
      return (this.userDetails.role.roleName == AppStrings.roles.admin)
    }


  }
  
  