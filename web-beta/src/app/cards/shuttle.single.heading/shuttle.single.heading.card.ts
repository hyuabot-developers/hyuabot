import { Component, Input } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';

@Component({
  selector: 'app-shuttle-single-card',
  templateUrl: 'shuttle.single.heading.card.html',
  styleUrls: ['shuttle.single.heading.card.scss']
})
export class ShuttleSingleHeadingCardComponent {
  @Input() stopName: string;
  @Input() timeDeltaDH: string;
  @Input() timeDeltaDY: string;
  @Input() timeDeltaC: string;
  @Input() firstDestination = 'campus';
  shuttleTimetable: ShuttleTimetableItem[] = [];
  now: Date = new Date();
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      this.now = new Date();
      this.shuttleTimetable = new Array<ShuttleTimetableItem>();
      for (const item of timetable.filter((item) => (item.startStop.toLowerCase() === 'dormitory' || this.stopName !== 'dormitory' ))) {
        if (item.shuttleType === 'DH') {
          this.shuttleTimetable.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
          });
        } else if (item.shuttleType === 'DY') {
          this.shuttleTimetable.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDY)
          });
        } else if (item.shuttleType === 'C') {
          this.shuttleTimetable.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaC)
          });
        }
      }
      if (this.stopName === 'terminal'){
        this.shuttleTimetable = this.shuttleTimetable.filter((item) => item.shuttleType === 'DY' || item.shuttleType === 'C');
      }
      this.shuttleTimetable = this.shuttleTimetable.filter((item) => this.getRemainedTime(item.shuttleTime) > 0)
        .sort((a, b) => {
          if (a.shuttleTime < b.shuttleTime) {
            return -1;
          } else if (a.shuttleTime > b.shuttleTime) {
            return 1;
          } else {
            return 0;
          }
      });
    });
  }
  addTimeDelta(time: string, delta: string): string {
    const [hour, minute, second] = time.split(':');
    const newTime = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), parseInt(hour, 10), parseInt(minute, 10));
    newTime.setMinutes(newTime.getMinutes() + parseInt(delta, 10));
    return String(newTime.getHours()).padStart(2, '0') + ':' + String(newTime.getMinutes()).padStart(2, '0');
  }
  getRemainedTime(time: string): number {
    const [hour, minute] = time.split(':');
    return (parseInt(hour, 10) - this.now.getHours()) * 60 + (parseInt(minute, 10) - this.now.getMinutes());
  }
}
