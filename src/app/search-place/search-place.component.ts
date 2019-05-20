import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ServerService } from '../server.service';
import { TypeResultComponent } from '../type-result/type-result.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.css']
})
export class SearchPlaceComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;
  selectedType: string = '';
  searchKey: string = '';
  places: any[];
  imageData: any;

  submitted = false;

  // myControl: FormControl = new FormControl();

  // options = [
  //   'One',
  //   'Two',
  //   'Three'
  //  ];

  constructor(private serverService: ServerService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onSearchChange(searchKey: string) {
    this.selectedType = '';
    this.searchKey = searchKey;
    console.log(this.searchKey);
    this.serverService.suggestPlaces(this.searchKey)
      .subscribe(
        (res) => {
          console.log(res.json());
          this.places = res.json();
          for (var i = 0; i < this.places.length; i++) {
            this.callImage(i);
          }
        }
      );
  }

  selectChangeHandler(event: any) {
    console.log(event.target.value);
    this.searchKey = '';
    this.selectedType = event.target.value;
    this.serverService.listPlaces(this.selectedType)
      .subscribe(
        (res) => {
          const data = res.json();
          this.places = data;
          console.log(this.places);
          for (var i = 0; i < this.places.length; i++) {
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
    this.serverService.getImage(this.places[count].attID)
      .toPromise()
      .then((res: any) => {
        // console.log("TCL: SearchPlaceComponent -> callImage -> res", res)
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
        this.imageData = this.sanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob)
        );
        this.places[count]['img'] = this.imageData;
      });
  }

  onSubmit() {
    this.searchKey = this.searchForm.value.searchKey;
    console.log(this.searchKey);

    this.serverService.findPlace(this.searchKey)
      .subscribe(
        (res) => {
          const data = res.json();
          console.log(data.length);
          if (data.length > 0) {
            const id = data[0].attID;
            this.router.navigate([`/detail/${id}`]);
          } else alert('The place is not found');
        },
        (err) => {
          console.log('err');
        }
      );
  }
}
