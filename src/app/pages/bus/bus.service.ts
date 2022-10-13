import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BusTimetableItem {
  departureTime: string;
}

export interface BusRealtimeItem {
  remainedStop: number;
  remainedTime: number;
  remainedSeat: number;
}

export interface BusRouteItem {
  stopName: string;
  routeName: string;
  realtime: BusRealtimeItem[];
  timetable: BusTimetableItem[];
}

@Injectable()
export class BusService {
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  busArrivalList: BehaviorSubject<BusRouteItem[]> = new BehaviorSubject<BusRouteItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setBusArrivalList(busRouteItems: BusRouteItem[]) {
    this.busArrivalList.next(busRouteItems);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const busServiceInjectables: Array<any> = [
  BusService
];
