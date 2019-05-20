import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-type-result',
  templateUrl: './type-result.component.html',
  styleUrls: ['./type-result.component.css']
})
export class TypeResultComponent implements OnInit {
	@Input() type: string;
	places: any[];
  constructor(
	    private serverService: ServerService,) {
  }

  ngOnInit() {
  }

  changeType(event: any) {
  	console.log(this.type);
  	this.serverService.listPlaces(this.type)
      .subscribe(
        (res) => {
          const data = res.json();
          this.places = data;
        }, 
        (error) => console.log('error')
      );
  }

}
