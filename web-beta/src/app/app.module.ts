import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { shuttleServiceInjectables } from './pages/shuttle/shuttle.service';
import { shuttleTimetableServiceInjectables } from './pages/shuttle/timetable/shuttle-timetable.service';
import { busServiceInjectables } from './pages/bus/bus.service';
import { busTimetableServiceInjectables } from './pages/bus/timetable/bus-timetable.service';
import { subwayServiceInjectables } from './pages/subway/subway.service';
import { subwayTimetableServiceInjectables } from './pages/subway/timetable/subway-timetable.service';
import { cafeteriaServiceInjectables } from './pages/cafeteria/cafeteria.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot({ mode: 'ios' }), AppRoutingModule, TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }
  }), GraphQLModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    shuttleServiceInjectables, shuttleTimetableServiceInjectables, busServiceInjectables, busTimetableServiceInjectables,
    subwayServiceInjectables, subwayTimetableServiceInjectables, cafeteriaServiceInjectables
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
