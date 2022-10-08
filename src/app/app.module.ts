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

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot({ mode: 'ios' }), AppRoutingModule, TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }
  }), GraphQLModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    shuttleServiceInjectables, shuttleTimetableServiceInjectables
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
