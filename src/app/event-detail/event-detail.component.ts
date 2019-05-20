import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from "../data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() place: any;
  imageData: any;
  comments: any;
  lat: any;
  lng: any;
  user: string = '';
  favorite = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private serverService: ServerService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.user = message);
    this.getPlace();
  }

  getPlace() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serverService.getEvent(id)
      .subscribe(
        (res) => {
          console.log(res);
          const data = res.json();
          this.place = data;
          this.lat = parseFloat(this.place[0].lat);
          this.lng = parseFloat(this.place[0].lng);
        },
        (error) => console.log('error')
      );

    this.serverService.getEventImage(id)
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
        this.imageData = this.sanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob));
        console.log(this.imageData);
      });

    this.serverService.getComments(id)
      .subscribe(
        (res) => {
          console.log(res.json());
          this.comments = res.json();
        }
      );

    this.serverService.checkFav(this.user, id)
      .subscribe(
        (res) => {
          console.log(res.json());
          if (res.json()[0].count == 0) this.favorite = true;
          else this.favorite = false;
        }
      );

  }


  goBack(): void {
    this.location.back();
  }

  validate() {
    this.serverService.valEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        alert('This event is validated.');
        this.router.navigate(['/admin/main']);
      }
      );
  }

  edit() {

  }

  delete() {
    this.serverService.delEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        alert('This event is deleted.');
        this.router.navigate(['/admin/main']);
      }
      );
  }

  favorites(): void {
    if (this.favorite == false) {

      this.serverService.addFav(this.user, this.route.snapshot.paramMap.get('id'))
        .subscribe(
          (res) => {
            console.log('success add favorite');
          }
        );

      this.favorite = true;
    } else {

      this.serverService.removeFav(this.user, this.route.snapshot.paramMap.get('id'))
        .subscribe(
          (res) => {
            console.log('success add favorite')
          }
        );

      this.favorite = false;
    }
  }
}
