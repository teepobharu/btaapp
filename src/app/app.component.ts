import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";
import { ServerService } from './server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bangkok Traveling Assistance';

  brightDoH: any;
  brightDoD: any;
  brightDoR: any;
  brightDoE: any;
  brightDoL: any;
  message: string;
  user: string;

  constructor(private data: DataService,
    private serverService: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      this.getUser();
    })
  }

  onClickH() {
    this.brightDoH = "active";
    this.brightDoD = "";
    this.brightDoR = "";
    this.brightDoE = "";
    this.brightDoL = "";
  }
  onClickD() {
    this.brightDoD = "active";
    this.brightDoH = "";
    this.brightDoR = "";
    this.brightDoE = "";
    this.brightDoL = "";
  }
  onClickR() {
    this.brightDoR = "active";
    this.brightDoH = "";
    this.brightDoD = "";
    this.brightDoE = "";
    this.brightDoL = "";
  }
  onClickE() {
    this.brightDoE = "active";
    this.brightDoH = "";
    this.brightDoD = "";
    this.brightDoR = "";
    this.brightDoL = "";
  }
  onClickL() {
    this.brightDoL = "active";
    this.brightDoH = "";
    this.brightDoD = "";
    this.brightDoR = "";
    this.brightDoE = "";
  }

  getUser() {
    this.serverService.getUser(this.message)
      .subscribe((res) => {
        if (res) {
          console.log("TCL: AppComponent -> getUser -> res", res.json())

          this.user = res.json()[0] ? res.json()[0].name : '';
          if (this.user) {
            this.router.navigate(["/profile"]);
          }
          console.log("TCL: AppComponent -> getUser -> this.user", this.user)
        }
      });
  }
}
