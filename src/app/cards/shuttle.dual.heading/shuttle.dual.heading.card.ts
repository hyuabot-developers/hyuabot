import { Component, Input, OnInit } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';
import { min } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-shuttle-dual-card',
  templateUrl: 'shuttle.dual.heading.card.html',
  styleUrls: ['shuttle.dual.heading.card.scss']
})
export class ShuttleDualHeadingCardComponent {
  @Input() stopName: string;
  @Input() firstDestination = 'station';
  @Input() secondDestination = 'terminal';
  @Input() timeDeltaDH = '-5';
  @Input() timeDeltaDY = '-5';
  @Input() timeDeltaC = '-5';
  shuttleTimetableStation: ShuttleTimetableItem[] = [];
  shuttleTimetableTerminal: ShuttleTimetableItem[] = [];
  now: Date = new Date();
  firstTimetableURL: string;
  secondTimetableURL: string;
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      this.now = new Date();
      this.shuttleTimetableStation = new Array<ShuttleTimetableItem>();
      this.shuttleTimetableTerminal = new Array<ShuttleTimetableItem>();
      this.firstTimetableURL = '/shuttle/timetable?destination=' + this.firstDestination + '&stop=' + this.stopName;
      this.secondTimetableURL = '/shuttle/timetable?destination=' + this.secondDestination + '&stop=' + this.stopName;
      for (const item of timetable.filter(
        (shuttleItem) => (shuttleItem.startStop.toLowerCase() === 'dormitory' || this.stopName !== 'dormitory' ))) {
        if (item.shuttleType === 'DH'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
          });
        } else if (item.shuttleType === 'DY'){
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDY)
          });
        } else if (item.shuttleType === 'C'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaC)
          });
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaC)
          });
        }
      }
      this.shuttleTimetableStation = this.shuttleTimetableStation.filter((item) =>
        this.getRemainedTime(item.shuttleTime) > 0).sort(this.compareTime);
      this.shuttleTimetableTerminal = this.shuttleTimetableTerminal.filter((item) =>
        this.getRemainedTime(item.shuttleTime) > 0).sort(this.compareTime);
    });
  }

  addTimeDelta(time: string, delta: string): string {
    const [hour, minute, second] = time.split(':');
    const newTime = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), parseInt(hour, 10), parseInt(minute, 10));
    newTime.setMinutes(newTime.getMinutes() + parseInt(delta, 10));
    return String(newTime.getHours()).padStart(2, '0') + ':' + String(newTime.getMinutes()).padStart(2, '0');
  }

  compareTime(item1: ShuttleTimetableItem, item2: ShuttleTimetableItem): number {
    if (item1.shuttleTime < item2.shuttleTime) {
      return -1;
    } else if (item1.shuttleTime > item2.shuttleTime) {
      return 1;
    } else {
      return 0;
    }
  }
  getRemainedTime(time: string): number {
    const [hour, minute] = time.split(':');
    return (parseInt(hour, 10) - this.now.getHours()) * 60 + (parseInt(minute, 10) - this.now.getMinutes());
  }
}
