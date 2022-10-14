import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusTimetableItemWithWeekday } from '../bus.service';

export interface ShuttleTimetableItem {
  period: string;
  weekday: string;
  startStop: string;
  shuttleTime: string;
  shuttleType: string;
}

@Injectable()
export class BusTimetableService {
  period: BehaviorSubject<string> = new BehaviorSubject<string>('semester');
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  busTimetable: BehaviorSubject<BusTimetableItemWithWeekday[]> = new BehaviorSubject<BusTimetableItemWithWeekday[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setBusTimetable(timetable: BusTimetableItemWithWeekday[]) {
    this.busTimetable.next(timetable);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const busTimetableServiceInjectables: Array<any> = [
  BusTimetableService
];
