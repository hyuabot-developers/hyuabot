import { Component, Input, OnInit } from '@angular/core';
import { BusRouteItem, BusService } from '../../pages/bus/bus.service';

@Component({
  selector: 'app-bus-card',
  templateUrl: 'bus.card.html',
  styleUrls: ['bus.card.scss']
})
export class BusCardComponent implements OnInit {
  @Input() routeName: string;
  @Input() routeColor: string;
  @Input() stopName: string;
  @Input() destination: string;
  now: Date = new Date();
  routeItem: BusRouteItem;
  timetableURL: string;
  constructor(private busService: BusService) {}
  ngOnInit() {
    this.timetableURL = '/bus/timetable?route=' + this.routeName + '&stop=' + this.stopName;
    this.busService.busArrivalList.subscribe((busArrivalList) => {
      this.routeItem = busArrivalList.find((item) => item.routeName === this.routeName && item.stopName === this.getStopName());
      if (busArrivalList.find((item) => item.routeName === this.routeName && item.stopName === this.getStopName()) === undefined) {
        this.routeItem = { stopName: this.getStopName(), routeName: this.routeName, realtime: [], timetable: [] };
      } else {
        this.routeItem = busArrivalList.find((item) => item.routeName === this.routeName && item.stopName === this.getStopName());
      }
    });
  }
  getStopName() {
    switch (this.stopName) {
      case 'guestHouse':
        return '한양대게스트하우스';
      case 'mainGate':
        return '한양대정문';
    }
  }
}
