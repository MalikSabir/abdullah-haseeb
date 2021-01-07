import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/api-services/api-services.service';
import { AuthService } from 'src/app/auth/login/auth.service';
import { mimeType } from './mime-type.validator';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  imagePreview: string;
  addProduct: FormGroup;
  submitted = false;
  constructor(private apiservices: ApiServicesService,private fb: FormBuilder,private router : Router, private authService: AuthService) { }

  ngOnInit() {
    this.addProduct = this.createformgroup();
  }

  createformgroup(){  
    return new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'brand_name': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'company': new FormControl(null, {validators: [Validators.required]}),
      'category': new FormControl(null, {validators: [Validators.required]}),
      'ingeridents': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'formulation': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'spectrum': new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      'pest': new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
  });
}

addProductData(){
  this.submitted = true;
  console.log(this.addProduct.value);
  if (this.addProduct.valid) {
    this.apiservices.addProduct(this.addProduct.value.name,this.addProduct.value.brand_name, this.addProduct.value.company,this.addProduct.value.category, this.addProduct.value.ingeridents,this.addProduct.value.formulation,this.addProduct.value.spectrum,this.addProduct.value.pest,this.addProduct.value.image).subscribe(res=>{
      if(res.status===true){
        Swal.fire(
          'Added!',
          'Your product file has been added.',
          'success'
        )
      }
    });
  }
  this.clear(); 
}

onImagePicked(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.addProduct.patchValue({image: file});
  this.addProduct.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = <string>reader.result;
  }
  reader.readAsDataURL(file);
}

get addFormControl() {
  return this.addProduct.controls;
}
clear(){
  this.submitted=false;
   this.imagePreview= null;
   this.addProduct.reset();
}

}
