import { Component, OnInit } from '@angular/core';
import { ServerService }  from '../server.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; 

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
	places: any[];
	imageData: any;
  constructor(
    private serverService: ServerService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {
  	this.getPlaces();
  }

  getPlaces() {
  	this.serverService.getUnvEvents()
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
            console.log(this.places);
  }

  callImage(count) {
    this.serverService.getEventImage(this.places[count].attID)
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


