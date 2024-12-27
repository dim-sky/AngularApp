import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { NavbarComponent } from '../navbar/navbar.component';

import { MyHttpService } from '../../services/MyHttpService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-home-page',
  imports: [CalendarComponent, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private myHttp: MyHttpService, private userService: UserService){}

  ngOnInit(){
    this.getUserDetails();
  }



  getUserDetails(){
    this.myHttp.getUserDetails().subscribe(
      (response) => {
        console.log(response);
        this.userService.setUserDetails(response);
      },
      (error) => {
        console.log('error')
      }
    )
    
  }

}
