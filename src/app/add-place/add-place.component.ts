import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../server.service';
import { ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-place',
	templateUrl: './add-place.component.html',
	styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {
	@ViewChild('f') addPlaceForm: NgForm;
	place = {
		placeName: '',
		type: '',
		operDay: '',
		operTime: '',
		suggTime: '',
		area: '',
		cost: '',
		transportation: '',
		description: ''
	};
	name = [];

	urls = new Array<string>();
	submitted = false;
	moreName: boolean = false;
	filesToUpload: Array<File> = [];

	constructor(
		private router: Router,
		private serverService: ServerService,
		private location: Location,
		private http: Http) { }

	ngOnInit() { }

	onSubmit() {
		this.submitted = true;
		this.place.placeName = this.addPlaceForm.value.placeName;
		this.place.type = this.addPlaceForm.value.type;
		this.place.operDay = this.addPlaceForm.value.operDay;
		this.place.operTime = this.addPlaceForm.value.operTime;
		this.place.suggTime = this.addPlaceForm.value.suggTime;
		this.place.area = this.addPlaceForm.value.area;
		this.place.cost = this.addPlaceForm.value.cost;
		this.place.transportation = this.addPlaceForm.value.transportation;
		this.place.description = this.addPlaceForm.value.description;
		this.name.push(this.addPlaceForm.value.placeName2);
		this.name.push(this.addPlaceForm.value.placeName3);
		this.name.push(this.addPlaceForm.value.placeName4);
		console.log(this.place);
		this.addPlaceForm.reset();

		this.serverService.createPlace(this.place)
			.subscribe(
				(res) => {
					console.log(res.json()[0].attID),
						this.upload(res.json()[0].attID);
					for (var i = 0; i < this.name.length; i++) {
						if (this.name[i] != '') this.setName(i, res.json()[0].attID);
					}
				},
				(err) => console.log('err')
			);

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
				this.router.navigate(['/searchPlace']);
				alert("Success adding the place");
			})
	}

	addMoreName() {
		if (this.moreName == false) this.moreName = true;
		else this.moreName = false;
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
				}
				reader.readAsDataURL(file);
			}
			console.log(this.urls);
		}
	}
	onReset() {
		this.submitted = false;
		this.addPlaceForm.reset();
	}

	goBack(): void {
		this.location.back();
	}
}
