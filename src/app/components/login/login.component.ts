import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { StatesService } from './../../services/states.service';
import { LoginResponseData } from './../../models/login-data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    private router: Router,
    private authSrv: AuthService,
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

    this.authSrv.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          result => {
            const lon = 30.40 + this.getRandomInt(3), 
                  lat = 50.272 + this.getRandomInt(3);
            this.client.updateLocation({lon, lat}).subscribe();
            this.router.navigate(['profile']);
          },
          err => this.states.setSnackbarParams({message: err?.error?.result[0].message, color: 'warning', timeout: 2000})
        );
  }

  onRegister() {
    const controls = this.loginForm.controls;
    
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.authSrv.register(this.loginForm.value)
        .pipe(first())
        .subscribe(
          result => {
            const lon = 30.40 + this.getRandomInt(6), 
            lat = 50.272 + this.getRandomInt(6);
            this.client.updateLocation({lon, lat}).subscribe();
            this.router.navigate(['profile'])
          },
          err => this.states.setSnackbarParams({message: err?.error?.result[0].message, color: 'warning', timeout: 2000})
        );
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
