import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/authService';
import { MyHttpService } from '../../services/MyHttpService';
import { loginRequest } from '../../models/login/loginRequest';
import { UserService } from '../../services/userService';
import { NavigationService } from '../../services/navigationService';
import { error } from 'console';
import { UserDetails } from '../../models/otherModels/userDetails';
import { eventService } from '../../services/eventService';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private myHttp: MyHttpService,
    private userService: UserService,
    private navigationService: NavigationService,
    private eventService: eventService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let request: loginRequest = {
      userName: this.f['username']?.value,
      password: this.f['password']?.value
    }

    this.myHttp.logIn(request).subscribe(
      (response) => {
       // console.log('logIn success:', response);  
        this.userService.setToken(response['token']);
        this.getUserDetailsAndGoToHomePage();      
      },
      (error) => {
        console.log(error);
      });    
  }


  goToRegisterPage(){
    this.router.navigate(['/register'])
  }

  
  getUserDetailsAndGoToHomePage(){
    this.myHttp.getUserDetailsReq().subscribe(
      (response: UserDetails) => {
        // console.log("Get User Details REQUEST!!!!!");
        this.userService.setUserDetails(response);
        this.setOrganizedEvents(response.organizedEvents);
        this.navigationService.goToHomePage();
      },
      (error) => {
        console.log(error);
      }
    )
    
  }

  setOrganizedEvents(events: Array<any>){

    if (this.userService.isOrganization()){
      
      if (!events || !events.length || events.length <= 0 ) { return }
      
      events.forEach((element: any) => {
        // console.log("About to add element: ");
        // console.log(element)
        this.eventService.addOwnEvent(element);
      });
    }
    
  }

  
}