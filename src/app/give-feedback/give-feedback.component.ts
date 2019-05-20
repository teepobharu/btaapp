import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from "../data.service";
import { Router }          from '@angular/router';



@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.css']
})
export class GiveFeedbackComponent implements OnInit {
@ViewChild('f') fbForm: NgForm;
  user: string = '';
  route: any;
  imageData: any;
  stars = [[0,0,0,0,0,0,0,0,0,0]];
  rate = [0];
  comments = '';
  constructor(
    private routed: ActivatedRoute,
	private serverService: ServerService,
    private sanitizer: DomSanitizer,
          private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.user = message);
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
          for (var i=0; i<this.route.length; i++) {
          		this.stars.push([0,0,0,0,0,0,0,0,0,0]);
          		this.rate.push(0);
                this.callImage(i);
          }
        }, 
      );
      console.log(this.stars);
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

  rated(i,j) {
  	for (var k=0; k<this.stars[i].length; k++) {
  		if(k<=j) this.stars[i][k]=1;
  		else this.stars[i][k]=0;
  	}
  	this.rate[i]=j+1;
  	console.log(this.rate);
  }

  onSubmit() {
  	console.log(this.rate);
  	console.log(this.user);
	    this.comments = this.fbForm.value;
  	console.log(this.comments[0]);
  	this.serverService.commentRoute(this.user, this.routed.snapshot.paramMap.get('id'), this.rate[0]*10, this.comments[0])
  	.subscribe(
  		(res) => {alert('Your feedback is successfully submitted.');
      this.router.navigate(['/profile']);}
  		);
  }
}
