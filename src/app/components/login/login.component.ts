import { StatesService } from './../../services/states.service';
import { LoginResponseData } from './../../models/login-data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFocused: 'email' | 'pass' | 'both';

  constructor(
    private fb: FormBuilder,
    private states: StatesService,
    private client: ClientService
    ){}

  ngOnInit(){  
    this.initForm();

    this.loginForm.valueChanges.subscribe((value: LoginResponseData) => {
      const { email, password } = value as any;      
      this.isFocused = email && !password? 'email': password && !email? 'pass': email && password? 'both': undefined;      
    });
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onFocus(state: 'email' | 'pass') {
    const { email, password } = this.loginForm.value,
          sourceState = email && !password? 'email': password && !email? 'pass': email && password? 'both': undefined;

    if(sourceState && (sourceState !== state))this.isFocused = 'both';
    else this.isFocused = state;
  }

  onLogin() {
    const controls = this.loginForm.controls;
    
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.client.loginUser(this.loginForm.value)
        .subscribe((res: LoginResponseData) => {
          console.log(res);
          
        }, err => this.states.setSnackbarParams({message: err?.error?.result[0].message, color: 'warning', timeout: 2000}));
  }

  onRegister() {
    const controls = this.loginForm.controls;
    
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.client.registerUser(this.loginForm.value)
        .subscribe((res: LoginResponseData) => {
          console.log(res);
          
        }, err => this.states.setSnackbarParams({message: err?.error?.result[0].message, color: 'warning', timeout: 2000}));
  }
}