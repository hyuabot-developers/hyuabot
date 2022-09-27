import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

export interface ShuttleTimetableItem {
  period: string;
  startStop: string;
  shuttleTime: string;
  shuttleType: string;
}

@Injectable()
export class ShuttleService {
  period: BehaviorSubject<string> = new BehaviorSubject<string>('semester');
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  shuttleTimetableDH: BehaviorSubject<ShuttleTimetableItem[]> = new BehaviorSubject<ShuttleTimetableItem[]>([]);
  shuttleTimetableDY: BehaviorSubject<ShuttleTimetableItem[]> = new BehaviorSubject<ShuttleTimetableItem[]>([]);
  shuttleTimetableC: BehaviorSubject<ShuttleTimetableItem[]> = new BehaviorSubject<ShuttleTimetableItem[]>([]);
  public setShuttleTimetable(timetable: ShuttleTimetableItem[]) {
    this.shuttleTimetableDH.next(timetable.filter((item) => item.shuttleType === 'DH'));
    this.shuttleTimetableDY.next(timetable.filter((item) => item.shuttleType === 'DY'));
    this.shuttleTimetableC.next(timetable.filter((item) => item.shuttleType === 'C'));
  }
}

export const shuttleServiceInjectables: Array<any> = [
  ShuttleService
];
