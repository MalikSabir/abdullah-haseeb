import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../api-services/api-services.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: any;
  constructor(private apiService: ApiServicesService) { }

  ngOnInit() {
    this.apiService.getTeam().subscribe(res=>{
      this.team=res.res;
    })
  }
}
