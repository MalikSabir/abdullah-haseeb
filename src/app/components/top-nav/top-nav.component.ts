import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/login/auth.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  message:string;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.currentMessage.subscribe(message => this.message = message);  
  }
  logout(){
    this.authService.logOut();
  }

}
