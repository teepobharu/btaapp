import { Component, OnInit } from '@angular/core';
import { ServerService }       from '../server.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  route: any;
  lat= [];
  lng= [];
  olat: any ;
  olng: any ;
  imageData: any;
  show = false;
  isModify = [];
  relatedPlaces = [];
  temp: any;
  menu = 'type';
  user: string = '';
  locationChosen=false;
  zoom=15;
  labelOptions = [];

  constructor(
    private routed: ActivatedRoute,
    private serverService: ServerService,
    private sanitizer: DomSanitizer,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.user = message);
    this.menu = 'type';
  	this.getRoute();
  }

  getRoute() {
    const id = +this.routed.snapshot.paramMap.get('id');
    this.serverService.getRoute(id)
      .subscribe(
        (res) => {
          console.log(res);
          const data = res.json();
          this.route = data;
          console.log(this.route[0]);
          this.locationChosen=true;
          this.olat = parseFloat(this.route[2].lat);
          this.olng = parseFloat(this.route[2].lng);
          for (var i=0; i<this.route.length; i++) {
              this.labelOptions[i] = String(i+1);
              this.lat[i] = parseFloat(this.route[i].lat);
              this.lng[i] = parseFloat(this.route[i].lng);
          		this.isModify.push(false);
          		this.relatedPlaces.push({});
                this.callImage(i);
          }
        },
      );
  }


  callImage(count) {
    this.serverService.getImage(this.route[count].attID)
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
          this.imageData = this.sanitizer.bypassSecurityTrustUrl(
             urlCreator.createObjectURL(blob));
          this.route[count]['img'] = this.imageData;
        });
  }
  modifyPlace(i) {
  	console.log(i);
  	if(this.isModify[i] == false) {
  		for (var j=0; j<this.isModify.length; j++) {
  			this.isModify[j] = false;
  		}
  		this.isModify[i] = true;
  	}
  	else this.isModify[i] = false;
  	console.log(this.isModify[i]);
  	this.serverService.relatedPlaces(this.route[i].attID)
  		.subscribe(
  			(res) => {
  				console.log(res.json());
  				this.relatedPlaces[i] = res.json();
  				this.temp = this.relatedPlaces[i];
  		});
  }

  choosePlace(i, j) {
  	this.serverService.getPlace(this.temp[j].attID)
  	.subscribe(
  			(res) => {
  				console.log(res.json());
  				this.route[i] = res.json()[0];
  		});
    this.serverService.getImage(this.temp[j].attID)
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
          this.imageData = this.sanitizer.bypassSecurityTrustUrl(
             urlCreator.createObjectURL(blob));
          this.route[i]['img'] = this.imageData;
          this.route[i]['Time'] = i+1;
  	      this.isModify[i] = false;
  				console.log(this.route);
          this.locationChosen=false;
          this.olat = this.route[i].lat;
          this.olng = this.route[i].lng;
          for (var x=0; x<this.route.length; x++) {
            this.locationChosen = true;
            this.lat[x] = parseFloat(this.route[x].lat);
            this.lng[x] = parseFloat(this.route[x].lng);
            this.zoom=13
          }
        });
  }

  clicked(text,i) {
    console.log(text);
    console.log(this.route);
    this.menu=text;
    if(text=='type') {
      this.serverService.relatedPlaces(this.route[i].attID)
      .subscribe(
        (res) => {
          console.log(res.json());
          this.relatedPlaces[i] = res.json();
          this.temp = this.relatedPlaces[i];
      });
    }
    if(text=='area') {
      this.serverService.relatedArea(this.route[i].attID)
      .subscribe(
        (res) => {
          console.log(res.json());
          this.relatedPlaces[i] = res.json();
          this.temp = this.relatedPlaces[i];
      });
    }
    if(text=='fav') {
      this.serverService.listFav(this.user)
      .subscribe(
        (res) => {
          console.log(res.json());
          this.relatedPlaces[i] = res.json();
          this.temp = this.relatedPlaces[i];
      });
    }

  }

  exportPDF() {
  	console.log('here');
    console.log(this.route);
    this.serverService.createRoute(this.route, this.routed.snapshot.paramMap.get('date'), this.user)
    .subscribe(
      (res) => {
          alert('Success');
      }
    );
    var doc = new jsPDF();
        doc.setFont("helvetica");
        doc.setFontSize(24);
        doc.text(20, 20, 'Overview of your route on '+ this.routed.snapshot.paramMap.get('date'));
        doc.setFontSize(14);
        for (var i=0; i<this.route.length;i++) {
          doc.text(30, 35+10*(i), this.route[i].Time+'. '+this.route[i].name);
        }

        for (var z=0; z<this.route.length;z++) {
          doc.addPage();
          doc.setFontSize(24);
          doc.text(20, 20, this.route[z].Time+'. '+this.route[z].name);
          doc.setFontType("bold");
          doc.setFontSize(14);
          doc.text(20, 30, 'Type')
          doc.text(80, 30, 'Area')
          doc.text(140, 30, 'Cost')
          doc.text(20, 50, 'Operating Day')
          doc.text(80, 50, 'Operating Time')
          doc.text(140, 50, 'Suggested Time')
          doc.text(20, 70, 'Transportation')
          doc.setFontType("normal");
          doc.setFontSize(12);
          doc.text(20, 37, this.route[z].type)
          doc.text(80, 37, this.route[z].zone)
          var splitTitle = doc.splitTextToSize(this.route[z].cost, 50);
          doc.text(140, 37, splitTitle);
          doc.text(20, 57, this.route[z].operDate)
          doc.text(80, 57, this.route[z].operTime)
          doc.text(140, 57, this.route[z].suggTime)
          var splitTitle = doc.splitTextToSize(this.route[z].transportation, 180);
          doc.text(20, 77, splitTitle);
          doc.setFontType("bold");
          doc.setFontSize(14);
          doc.text(20, 120, 'Description')
          doc.setFontType("normal");
          doc.setFontSize(12);
          var splitTitle = doc.splitTextToSize(this.route[z].description, 180);
          doc.text(20, 127, splitTitle);
        }

        // Save the PDF
        doc.save('Your Route.pdf');
  }
}
