import { Injectable } from "@angular/core"
import { UserDetails } from "../models/otherModels/userDetails";
import { AppStrings } from "../../resources/app.strings";

import { AuthService } from "./authService";


@Injectable({
    providedIn: 'root'
})
export class UserService {


    token: string | undefined;
    role: string | undefined | null;
    
    userDetails: UserDetails | undefined;
  
    constructor(private authService: AuthService) {}

    setToken(token: string){
      this.token = token;

      //also roles is being setted from token
      this.role = this.authService.getRoleFromToken(token);
    }

    getToken(){
      return this.token;
    }
  
    
    setUserDetails(userDetails: UserDetails): void {
      userDetails.eventId = userDetails.eventId;
      userDetails.eventName = userDetails.eventName;
      userDetails.eventDescription = userDetails.eventDescription;
      userDetails.eventLocation = userDetails.eventLocation;
      userDetails.eventDate = userDetails.eventDate;
      userDetails.eventStartTime = userDetails.eventStartTime;
      userDetails.maxNumberOfPeople = userDetails.maxNumberOfPeople;
    }
  
    
    getUserDetails(): UserDetails | null {
      if (this.userDetails){
        return this.userDetails;
      }
      
      return null;
    }


    isOrganization(): boolean {
      if (!this.role)
        return false;
      
      return (this.role == AppStrings.roles.organization)
    }

    isVolunteer(): boolean {
      if (!this.role)
        return false;
      
      return (this.role == AppStrings.roles.volunteer)
    }

    isAdmin(): boolean {
      if (!this.role)
        return false;
      
      return (this.role == AppStrings.roles.admin)
    }


  }
  
  