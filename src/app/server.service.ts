import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { environment } from '../environments/environment';

const BACKEND_URL = environment.API_URL;
@Injectable()
export class ServerService {
	constructor(private http: Http) { }

	createPlace(place) {
		return this.http.post(BACKEND_URL + '/createPlace', place);
	}

	createEvent(event) {
		return this.http.post(BACKEND_URL + '/createEvent', event);
	}

	getPlaces() {
		return this.http.get(BACKEND_URL + '/getPlaces');
	}

	getEvents() {
		return this.http.get(BACKEND_URL + '/getEvents');
	}

	getPlace(id) {
		console.log(id);
		return this.http.post(BACKEND_URL + '/getPlace', { id: id });
	}

	getEvent(id) {
		console.log(id);
		return this.http.post(BACKEND_URL + '/getEvent', { id: id });
	}

	getUnvPlaces() {
		return this.http.get(BACKEND_URL + '/getUnvPlaces');
	}

	getUnvEvents() {
		return this.http.get(BACKEND_URL + '/getUnvEvents');
	}

	getComments(id) {
		console.log(id);
		return this.http.get(BACKEND_URL + '/getComments/' + id);
	}

	getRoute(id) {
		console.log(id);
		return this.http.get(BACKEND_URL + '/getRoute/' + id);
	}

	getUser(id) {
		console.log(id);
		return this.http.get(BACKEND_URL + '/getUser/' + id);
	}

	suggestPlaces(key) {
		console.log(key);
		return this.http.get(BACKEND_URL + '/suggestPlaces/' + key);
	}

	listPlaces(type) {
		console.log(type);
		return this.http.post(BACKEND_URL + '/listPlaces', { type: type });
	}

	listEvents() {
		return this.http.get(BACKEND_URL + '/listEvents');
	}

	findPlace(searchKey) {
		console.log(searchKey);
		return this.http.post(BACKEND_URL + '/findPlace', { searchKey: searchKey });
	}

	uploadImage(id, formData) {
		console.log(formData);
		return this.http.post(BACKEND_URL + '/upload/' + id, formData);
	}

	getImage(id) {
		return this.http.get(BACKEND_URL + '/pic/' + id, { responseType: ResponseContentType.Blob });
	}

	getEventImage(id) {
		return this.http.get(BACKEND_URL + '/eventpic/' + id, { responseType: ResponseContentType.Blob });
	}

	checkUnvalidated() {
		return this.http.get(BACKEND_URL + '/checkUnv');
	}

	relatedPlaces(id) {
		console.log(id);
		return this.http.get(BACKEND_URL + '/relatedPlaces/' + id);
	}

	relatedArea(id) {
		console.log(id);
		return this.http.get(BACKEND_URL + '/relatedArea/' + id);
	}

	token(email, name) {
		console.log(name);
		return this.http.post(BACKEND_URL + '/token/', { email: email, name: name });
	}

	checkFav(user, id) {
		return this.http.post(BACKEND_URL + '/checkFav', { user: user, id: id });
	}

	removeFav(user, id) {
		return this.http.post(BACKEND_URL + '/addFav', { user: user, id: id });
	}

	addFav(user, id) {
		return this.http.post(BACKEND_URL + '/removeFav', { user: user, id: id });
	}

	listFav(id) {
		return this.http.get(BACKEND_URL + '/listFav/' + id);
	}

	listWtr(id) {
		return this.http.get(BACKEND_URL + '/listWtr/' + id);
	}

	commentRoute(uid, rid, rate, cmt) {
		return this.http.post(BACKEND_URL + '/commentRoute', { uid: uid, rid: rid, rate: rate, cmt: cmt });
	}

	isRated(uid, rid) {
		console.log(uid + ' ' + rid)
		return this.http.post(BACKEND_URL + '/isRated', { uid: uid, rid: rid });
	}

	getRouteLists() {
		return this.http.get(BACKEND_URL + '/getRouteLists');
	}

	setName(name, att) {
		return this.http.post(BACKEND_URL + '/setName', { name: name, att: att });
	}

	valPlace(id) {
		return this.http.post(BACKEND_URL + '/valPlace', { id: id });
	}

	delPlace(id) {
		return this.http.post(BACKEND_URL + '/delPlace', { id: id });
	}

	valEvent(id) {
		return this.http.post(BACKEND_URL + '/valEvent', { id: id });
	}

	delEvent(id) {
		return this.http.post(BACKEND_URL + '/delEvent', { id: id });
	}

	createRoute(route, date, user) {
		return this.http.post(BACKEND_URL + '/createRoute', { route: route, date: date, user: user });
	}

	editPlace(place, id) {
		return this.http.post(BACKEND_URL + '/editPlace', { place: place, id: id });
	}
	// editName(id, nname, name) {
	// 	return this.http.post(BACKEND_URL+'/editName/' , {id:id, name:name, nname:nname});
	// }
	// getNames(id) {
	// 	return this.http.get(BACKEND_URL+'/getNames/'+id);
	// }

}