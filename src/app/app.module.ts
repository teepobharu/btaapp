import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GoogleSignInComponent } from './GoogleSignin/google.signin.component';
// import { GoogleSignInComponent } from 'angular-google-signin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { DataService } from './data.service';
import { AddPlaceComponent } from './add-place/add-place.component';
import { ShowEventComponent } from './show-event/show-event.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

import { AppRoutingModule } from './app-routing.module';
import { SearchPlaceComponent } from './search-place/search-place.component';
import { TypeResultComponent } from './type-result/type-result.component';
import { RouteInfoComponent } from './route-info/route-info.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { GiveFeedbackComponent } from './give-feedback/give-feedback.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from '../environments/environment';

const GOOGLE_API = environment.GOOGLE_API_KEY;

@NgModule({
  declarations: [
    AppComponent,
    AddPlaceComponent,
    ShowEventComponent,
    PlaceDetailComponent,
    SearchPlaceComponent,
    TypeResultComponent,
    RouteInfoComponent,
    LoginPageComponent,
    GoogleSignInComponent,
    AddEventComponent,
    EventDetailComponent,
    AdminMainComponent,
    AdminPlacesComponent,
    AdminEventsComponent,
    RouteDetailComponent,
    ProfileComponent,
    GiveFeedbackComponent,
    EditPlaceComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [ServerService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
