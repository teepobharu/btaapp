import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { ServerService }  from '../server.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  places: any;
  routes= [];
  imageData: any;
  user: string = '';
  message: string = '';

  constructor(
    private serverService: ServerService,
    private sanitizer: DomSanitizer,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.user = message);
  	this.getPlaces();
  }

  getPlaces() {
      this.serverService.listFav(this.user)
      .subscribe(
        (res) => {
          const data = res.json();
          this.places = data;
          console.log(this.places);
          for (var i=0; i<this.places.length; i++) {
                  this.callImage(i);
          }

        },
          (error) => {
            console.log('error');
          }
        );

        this.serverService.listWtr(this.user)
        .subscribe(
	        (res) => {
	          const data = res.json();
	          //this.routes = data;
	          console.log(data);
	          	var temp = data[0].routeID;
	          	var num = 0;
	          	this.routes.push([]);
	          for(var i=0; i<data.length;i++) {
	          	if(temp==data[i].routeID) {
	          		this.routes[num].push(data[i]);

	          	} else {
	          		num++;
	          		temp = data[i].routeID;
	          		this.routes.push([]);
	          		this.routes[num].push(data[i])
	          	}
	          }
	          console.log(this.routes);
	          for (var i=0; i<this.routes.length; i++) {
	                  this.isRated(i);
                    this.routes[i][0].date = this.routes[i][0].date.substring(0,10);
	          }

	        },
	          (error) => {
	            console.log('error');
	          }
	        );

  }

  signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      this.message = 'Login';
      this.data.changeMessage(this.message);
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }

  isRated(id) {
  	this.serverService.isRated(this.user, this.routes[id][0].routeID)
        .subscribe(
        	(res) => {
	          const data = res.json();
	          //this.routes = data;
	          console.log(data);
	          if(data[0].feedback=='') this.routes[id][0]['rated'] ="N";
	          else this.routes[id][0]['rated'] ="Y";
	          console.log(this.routes);
	      	}
        );

  }

  callRouteImage(i) {
	for (var j=0; j<this.routes[i].length; j++) {
	    this.callImage(j);
	}
  }

  callImage(count) {
    this.serverService.getImage(this.places[count].attID)
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
          this.imageData = this.sanitizer.bypassSecurityTrustUrl(
             urlCreator.createObjectURL(blob));
          this.places[count]['img'] = this.imageData;
        });
  }
}
