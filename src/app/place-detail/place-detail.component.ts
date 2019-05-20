import { Component, OnInit, Input } from '@angular/core';
import { ServerService }       from '../server.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from "../data.service";
import { Router }          from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  @Input() place: any;
  id: number;
  imageData: any;
  comments: any;
  lat: any;
  lng: any;
  user: string = '';
  favorite = true;
  favclick= false;
  favsuccess= true;
  favstatus= '';
  editMode = false;


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
    this.id = +this.route.snapshot.paramMap.get('id');
  	this.getPlace();
  }

  getPlace() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serverService.getPlace(id)
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

    this.serverService.getImage(id)
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
            if(res.json()[0].count == 0) this.favorite = true;
            else this.favorite = false;
        }
      );

  }


  goBack(): void {
    this.location.back();
  }

  validate() {
      this.serverService.valPlace(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        alert('This place is validated.');
        this.router.navigate(['/admin/main']);
      }
      );
  }

  edit () {
    this.editMode = true;
    this.router.navigate(['/edit/' + this.route.snapshot.paramMap.get('id')]);
  }

  delete () {
      this.serverService.delPlace(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        alert('This place is deleted.');
        this.router.navigate(['/admin/main']);
      }
      );
  }

  favorites(): void {
    if (this.favclick) { return; }
    this.favclick = true;
    this.favsuccess = true;

    if(this.favorite==false) {


      this.serverService.addFav(this.user, this.route.snapshot.paramMap.get('id'))
        .subscribe(
          (res) => {
              console.log('success add favorite');
          }

          , (error) => { this.favsuccess = false; }
        );
        this.favstatus= 'Removing Success';
        this.favorite=true;
    } else {

      this.serverService.removeFav(this.user, this.route.snapshot.paramMap.get('id'))
        .subscribe(
          (res) => {
              console.log('success remove favorite');
          }
          , (error) => { this.favsuccess = false; }
      );
      this.favstatus= 'Adding Success';

      this.favorite=false;
    }
    setTimeout(() => {
      this.favclick = false;
      }, 500);
  }
}
