import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  	this.unvalidated();
  }

  unvalidatedPlaces = 0;
  unvalidatedEvents = 0;

  unvalidated() {
  	this.serverService.checkUnvalidated()
	      .subscribe(
	          (res) => {
	          	console.log(res.json()[0][0]);
	          	console.log(res.json()[1][0]);
	          	if(res.json()[0][0].count1 > 0) this.unvalidatedPlaces = res.json()[0][0].count1;
	          	else this.unvalidatedPlaces = 0;
	          	if(res.json()[1][0].count2 > 0) this.unvalidatedEvents = res.json()[1][0].count2;
	          	else this.unvalidatedEvents = 0;
	          	console.log(this.unvalidatedPlaces+' '+this.unvalidatedEvents);
	          },
	          (err) => {console.log('err');}
	      );
  }

}
