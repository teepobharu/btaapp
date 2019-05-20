import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerService } from '../server.service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @ViewChild('f') addPlaceForm: NgForm;
  id: number;
  place: any;
  eplace = {
    //names: [],
    placeName: '',
    type: '',
    operDay: '',
    operTime: '',
    suggTime: '',
    area: '',
    cost: '',
    transportation: '',
    description: '',
    lat: 1.0,
    lng: 1.0
  };
  name = [];

  urls = new Array<string>();
  submitted = false;
  //moreName: boolean = false;
  filesToUpload: Array<File> = [];

  lat: any;
  lng: any;
  imageData: any;
  Upload = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private serverService: ServerService
  ) { }
  ngOnInit() {
    this.getPlace();
    this.id = +this.route.snapshot.paramMap.get('id');
    // this.eplace = {
    //   placeName: 'this.place[0].placeName',
    //   type: 'this.place[0].type',
    //   operDay: 'this.place[0].operDay',
    //   operTime: 'this.place[0].operTime',
    //   suggTime: 'this.place[0].suggTime',
    //   area: 'this.place[0].area',
    //   cost: 'this.place[0].cost',
    //   transportation: 'this.place[0].transportation',
    //   description: 'this.place[0].description'
    // };
    console.log('this.eplace');
    console.log(this.eplace);
  }
  // addMoreName() {
  //   if(this.moreName==false) this.moreName = true;
  //   else this.moreName = false;
  // }
  getPlace() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serverService.getPlace(id)
      .subscribe(
        (res) => {
          console.log(res);
          const data = res.json();
          this.place = data;
          this.eplace = {
            placeName: this.place[0].name,
            //names: [],
            type: this.place[0].type.toLowerCase(),
            operDay: this.place[0].operDate,
            operTime: this.place[0].operTime,
            suggTime: this.place[0].suggTime,
            area: this.place[0].zone,
            cost: this.place[0].cost,
            transportation: this.place[0].transportation,
            description: this.place[0].description,
            lat: parseFloat(this.place[0].lat),
            lng: parseFloat(this.place[0].lng)
          };
          //   for(var i=0; i<this.eplace.names.length; i++) {
          //     if(this.eplace.names[i]!='') {
          //     }
          //   }
          // //   this.serverService.getNames(res.json()[0].attID)
          // //   .subscribe(
          // //       (res) => {
          // //         console.log(res);
          // //       }
          // // ,(error) => console.log('error')
          // // );
          //console.log(typeof(this.place[0]));
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
  }
  onSubmit() {
    this.submitted = true;
    this.editSubmit();
  }
  editSubmit() {
    this.place.placeName = this.addPlaceForm.value.placeName;
    this.place.type = this.addPlaceForm.value.type;
    this.place.operDay = this.addPlaceForm.value.operDay;
    this.place.operTime = this.addPlaceForm.value.operTime;
    this.place.suggTime = this.addPlaceForm.value.suggTime;
    this.place.area = this.addPlaceForm.value.area;
    this.place.cost = this.addPlaceForm.value.cost;
    this.place.transportation = this.addPlaceForm.value.transportation;
    this.place.description = this.addPlaceForm.value.description;
    this.place.lat = this.addPlaceForm.value.lat;
    this.place.lng = this.addPlaceForm.value.lng;
    this.name.push(this.addPlaceForm.value.placeName2);
    this.name.push(this.addPlaceForm.value.placeName3);
    this.name.push(this.addPlaceForm.value.placeName4);
    this.eplace.lng = this.lng;
    this.eplace.lat = this.lat;

    this.serverService.editPlace(this.eplace, this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          console.log(res.json()[0]),
            this.upload(res.json()[0].attID);
          //  for(var i=1; i<this.name.length; i++) {
          //    if(this.name[i]!='') this.serverService.editName(this.place[0].attID, this.eplace.names[i],this.place[0]);
          //  }
        },
        (err) => console.log('err')
      );

  }
  detectFiles(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      console.log(this.urls);
      this.Upload = true;
    }
  }
  setName(i, att) {
    this.serverService.setName(this.name[i], att)
      .subscribe(
        (res) => console.log('yey')
      );
  }
  upload(id) {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    this.serverService.uploadImage(id, formData)
      .subscribe(files => {
        if (this.submitted) {
          this.router.navigate(['/admin/places']);
        }
        alert("Success adding the place");
      });
  }
  goBack() {
    this.router.navigate(['/admin/places']);
  }
  reviewChange() {
    this.editSubmit();
    this.router.navigate(['/detail/' + this.route.snapshot.paramMap.get('id')]);
  }
  onReset() {
    this.submitted = false;
    this.Upload = false;
    this.urls = [];
    this.addPlaceForm.reset();
  }
}
