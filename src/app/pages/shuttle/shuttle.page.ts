import { Component } from '@angular/core';
import {Observable, Observer} from 'rxjs';

interface BusStop {
  stopName: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-shuttle',
  templateUrl: 'shuttle.page.html',
  styleUrls: ['shuttle.page.scss']
})
export class ShuttlePage {
  stopLocationList: BusStop[] = [
    {stopName: 'shuttle.stop.dormitory.name', latitude: 37.29339607529377, longitude: 126.83630604103446},
    {stopName: 'shuttle.stop.shuttlecock_o.name', latitude: 37.29875417910844, longitude: 126.83784054072336},
    {stopName: 'shuttle.stop.subway.name', latitude: 37.308494476826155, longitude: 126.85310236423418},
    {stopName: 'shuttle.stop.terminal.name', latitude: 37.31945164682341, longitude: 126.8455453372041},
    {stopName: 'shuttle.stop.shuttlecock_i.name', latitude: 37.29869328231496, longitude: 126.8377767466817},
  ];
  closestStopIndex = 0;

  shuttleTimeListDH = ['00:00', '00:05', '00:10'];
  shuttleTimeListDY = ['00:00', '00:05', '00:10'];
  shuttleTimeListC = ['00:00', '00:05', '00:10'];
  constructor() {
    this.getLocation().subscribe(position => {
      this.setClosestStop(position.coords.latitude, position.coords.longitude);
    });
  }

  getLocation(): Observable<any> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        console.log(typeof position);
        observer.next(position);
        observer.complete();
      }, error => {
      });
    });
  }
  setClosestStop(latitude: number, longitude: number) {
    let minDistance = 999999999;
    this.stopLocationList.forEach((stop, index) => {
      const distance = Math.sqrt(Math.pow(stop.latitude - latitude, 2) + Math.pow(stop.longitude - longitude, 2));
      if (distance < minDistance) {
        minDistance = distance;
        this.closestStopIndex = index;
      }
    });
  }
}
