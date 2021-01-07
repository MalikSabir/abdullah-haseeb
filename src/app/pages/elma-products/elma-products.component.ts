import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../api-services/api-services.service';
import { AuthService } from '../../auth/login/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-elma-products',
  templateUrl: './elma-products.component.html',
  styleUrls: ['./elma-products.component.scss']
})
export class ElmaProductsComponent implements OnInit {
  public status=1;
  products:any;
  imgUrl=null;
  message:string;
  constructor(private apiServices: ApiServicesService, private authService: AuthService) { }

  ngOnInit() {
    this.allProducts();
    this.authService.currentMessage.subscribe(message => this.message = message);
  }
  isSelected(val, category){
    this.status=val;
    if(val===1){
      this.allProducts();
    }else{
      this.apiServices.getProduct("Elma",category).subscribe(res=>{
        this.products=res.res;
      })
    }

  }
  allProducts(){
    this.apiServices.getAllProduct("Elma").subscribe(res=>{
      this.products=res.res;
    })
  }

  confirmBox(id, img){
    this.imgUrl = img.split('/');
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiServices.deleteProduct(id, this.imgUrl[4]).subscribe(res=>{
          if(res.status===true){
            Swal.fire(
              'Deleted!',
              'Your product file has been deleted.',
              'success'
            )
          }
        })
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


}
