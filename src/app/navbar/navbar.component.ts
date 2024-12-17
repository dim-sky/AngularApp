import { Component } from '@angular/core';
import { AppStrings } from '../../resources/app.strings';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  appName = AppStrings.appName;
  home = AppStrings.home;
  about = AppStrings.about;
  contact = AppStrings.contact;
  
  homeClicked(name: string){
    console.log("Hello!")
    alert("Hello World!")
  }

}
