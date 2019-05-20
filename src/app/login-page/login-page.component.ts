import { Component, OnInit } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { DataService } from "../data.service";
import { ServerService } from '../server.service';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const CLIENT_ID = environment.CLIENT_ID;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  message: string = '';
  constructor(
    private serverService: ServerService,
    private data: DataService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.changeMessage(this.message);
  }
  testRoute(input: string) {
    // console.log("TCL: LoginPageComponent -> testRoute -> input", input);
    this.http.get("http://localhost:3000/api/" + input).subscribe(
      (res) => {
        console.log("TCL: LoginPageComponent -> testRoute -> res", res)
      }
    );
  }
  private myClientId: string = CLIENT_ID;
  get getClientID(): string {
    return this.myClientId;
  }
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    // console.log("TCL: LoginPageComponent -> onGoogleSignInSuccess -> event", event);
    // return;
    // Useful data for your client-side scripts:
    // var profile = googleUser.getBasicProfile();
    // Don't send this directly to your server!
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    // console.log('ID: ' +
    //   profile.getId()); 
    // Do not send to your backend! Use an ID token instead.
    this.message = profile.getEmail();
    this.data.changeMessage(this.message);
    // console.log('Name: ' + profile.getName());
    // console.log('Email: ' + profile.getEmail());


    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    this.serverService.token(profile.getEmail(), profile.getName())
      .subscribe(
        (res) => {
          // console.log("TCL: LoginPageComponent -> onGoogleSignInSuccess -> res", res)
          // console.log(res.json()[0].uid);
          this.message = res.json()[0].uid;
          this.data.changeMessage(this.message);
          // console.log("TCL: AppComponent -> ngOnInit -> message", this.message);
          this.router.navigate(['/profile']);
        }, (error) => {
          // console.log("TCL: LoginPageComponent -> onGoogleSignInSuccess -> error", error);

        }
      );

  }
  signIn() {
    // console.log(this.message);
    // this.data.changeMessage(this.message);
  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.message = 'Login';
      this.data.changeMessage(this.message);
      this.router.navigate(['/']);
      // console.log('User signed out.');
    });
  }
}
