import { Component } from '@angular/core';
import { AppStrings } from '../../../resources/app.strings';
import { MyHttpService } from '../../services/MyHttpService';
import { response } from 'express';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private myHttpService: MyHttpService, private http: HttpClient){}

  appName = AppStrings.appName;
  home = AppStrings.home;
  about = AppStrings.about;
  contact = AppStrings.contact;

  data: any;
  
  homeClicked(name: string){
    this.myHttpService.getData().subscribe({
      next: this.handleHomeResponse.bind(this),
      error: this.handleHomeError.bind(this)
    })
  }

  handleHomeResponse(response: any){
    console.log("Http Request Sent Succusfull");
    console.log(response);
  }

  handleHomeError(error: any){
    console.log(error);
  }

  // homeClicked(name: string){
  //   console.log("Home Clicked!")
  //   this.http.get("http://localhost:8080/student").subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log("Error!")
  //     })
  // }

}
