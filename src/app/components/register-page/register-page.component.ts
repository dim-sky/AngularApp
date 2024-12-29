import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerRequest, UserRole } from '../../models/register/registerRequest';

import { MyHttpService } from '../../services/MyHttpService';
import { NavigationService } from '../../services/navigationService';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm!: FormGroup;
  submitted = false;
  

  constructor(private formBuilder: FormBuilder, private myHttp: MyHttpService,private userService: UserService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    let role: UserRole = {
      roleId: this.f['userType'].value
    };


    const request: registerRequest  = {
      userName: this.f['userName'].value,
      password: this.f['password'].value,
      email: this.f['email'].value,
      isAuthenticated: false,
      name: this.f['name'].value,
      role: role

    }

    console.log(request);


    this.myHttp.register(request).subscribe(
      (response) => {
        // this.userService.setToken(response['token']);
        this.navigationService.goToLoginPage();
    }, (error) => {
      console.log(error);
    })
  }

}
