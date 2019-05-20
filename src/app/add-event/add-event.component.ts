import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../server.service';
import { ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';

const BACKEND_URL = environment.API_URL;
@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
	@ViewChild('f') addPlaceForm: NgForm;
	place = {
		eventName: 'fff',
		type: '',
		startdate: '',
		enddate: '',
		time: '',
		cost: '',
		location: '',
		transportation: '',
		description: ''
	};

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
		this.place.eventName = this.addPlaceForm.value.eventName;
		this.place.type = this.addPlaceForm.value.type;
		this.place.startdate = this.addPlaceForm.value.startdate;
		this.place.enddate = this.addPlaceForm.value.enddate;
		this.place.time = this.addPlaceForm.value.time;
		this.place.cost = this.addPlaceForm.value.cost;
		this.place.location = this.addPlaceForm.value.location;
		this.place.transportation = this.addPlaceForm.value.transportation;
		this.place.description = this.addPlaceForm.value.description;
		console.log(this.place);
		this.addPlaceForm.reset();

		this.serverService.createEvent(this.place)
			.subscribe(
				(res) => {
					console.log(res.json()[0].attID),
						this.upload(res.json()[0].attID);
				},
				(err) => console.log('err')
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
		this.http.post(BACKEND_URL + '/uploadevent/' + id, formData)
			// .map(files => files.json())
			.subscribe(files => {
				alert("Success adding the event");
				this.router.navigate(['/events']);
			})
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
