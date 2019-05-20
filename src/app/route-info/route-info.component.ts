import { Component, OnInit } from '@angular/core';
import { ServerService }       from '../server.service';
import { FormsModule } from '@angular/forms';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.css']
})
export class RouteInfoComponent implements OnInit {
	routeList = '';
	route = [];
	selectedRoute='';
  searchKey = '';

  constructor(
    private serverService: ServerService,
  				private router: Router,) { }

  ngOnInit() {
  	this.getRouteLists();
  }

  getRouteLists() {
  	this.serverService.getRouteLists()
  	.subscribe (
  		(res) => {
          const data = res.json();
          this.routeList = data;
          console.log(this.routeList);
          for(var i=0; i<this.routeList.length; i++) {
          	this.route.push(this.routeList[i]);
          }
          console.log(this.routeList);
  		}
  	);
  }
  onSubmit() {
  	console.log(this.searchKey);
  	this.router.navigate(['/routedetail/'+this.selectedRoute+'/'+this.searchKey]);
  }


}
