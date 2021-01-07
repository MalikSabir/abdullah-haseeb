import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/api-services/api-services.service';
import { AuthService } from '../../auth/login/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent implements OnInit {
public status=1;
products:any;
imgUrl=null;
  constructor(private apiServices: ApiServicesService, private authService: AuthService) { }
  message:string;
  ngOnInit() {
    this.allProducts();
    this.authService.currentMessage.subscribe(message => this.message = message);
  }
  isSelected(val, category){
    this.status=val;
    if(val===1){
      this.allProducts();
    }else{
      this.apiServices.getProduct("Adbullah Haseeb",category).subscribe(res=>{
        this.products=res.res;
      })
    }
  }
  allProducts(){
    this.apiServices.getAllProduct("Adbullah Haseeb").subscribe(res=>{
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
