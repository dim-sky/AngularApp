import { Injectable } from "@angular/core"
import { UserDetails } from "../models/otherModels/userDetails";


@Injectable({
    providedIn: 'root'
})
export class UserService {


    token: String | undefined;
    
    userDetails: UserDetails | undefined;
  
    constructor() {}

    setToken(token: String){
      this.token = token;
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
  }
  
  