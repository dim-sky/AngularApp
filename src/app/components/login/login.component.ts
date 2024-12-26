import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MyHttpService } from '../../services/MyHttpService';
import { loginRequest } from '../../models/login/loginRequest';
import { UserService } from '../../services/userService';
import { error } from 'console';


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
    private userService: UserService
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
        console.log('Hello World!');
        console.log(response);
        this.userService.setToken(response['token']);
        

        this.myHttp.getUserDetails().subscribe(
          (response) => {
            console.log(response);
            this.userService.setUserDetails(response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.log('error')
          }
        )


        
      },
      (error) => {
        console.log(error);
      });

    
  }

  
}