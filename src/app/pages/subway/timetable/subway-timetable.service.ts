import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubwayTimetableItem } from '../subway.service';

@Injectable()
export class SubwayTimetableService {
  period: BehaviorSubject<string> = new BehaviorSubject<string>('semester');
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  subwayTimetable: BehaviorSubject<SubwayTimetableItem[]> = new BehaviorSubject<SubwayTimetableItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setSubwayTimetable(timetable: SubwayTimetableItem[]) {
    this.subwayTimetable.next(timetable);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const subwayTimetableServiceInjectables: Array<any> = [
  SubwayTimetableService
];
