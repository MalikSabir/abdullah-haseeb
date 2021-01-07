import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../auth/login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  navAddNew(){
    this.router.navigate(['/dashboard']);
  }
  accounts(){
    this.router.navigate(['/dashboard/accounts']);

  }
  Elma(){
    this.router.navigate(['/elma-products']);
  }
  Abdullah(){
    this.router.navigate(['/abdullah-products']);
  }

}
