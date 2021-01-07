import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../api-services/api-services.service';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private apiServices: ApiServicesService, private authService: AuthService) { }
  ngOnInit() {

    console.log(window.location.pathname)
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    },
      {
        // validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.signinForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.authService.logIn(this.signinForm.value.email, this.signinForm.value.password);
    }
  }

}
