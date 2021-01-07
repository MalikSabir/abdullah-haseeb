import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../../api-services/api-services.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private apiServices: ApiServicesService) { }

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

  signup(){
    this.submitted = true;
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      this.apiServices.signup(this.signinForm.value.email, this.signinForm.value.password).subscribe(res=>{
        console.log(res.res);
      })
    }
  } 

}
