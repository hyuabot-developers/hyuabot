import { Component, Input } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';

@Component({
  selector: 'app-shuttle-single-card',
  templateUrl: 'shuttle.single.heading.card.html',
  styleUrls: ['shuttle.single.heading.card.scss']
})
export class ShuttleSingleHeadingCardComponent {
  @Input() stopName: string;
  @Input() timeDeltaDH: number;
  @Input() timeDeltaDY: number;
  @Input() timeDeltaC: number;
  shuttleTimetable: ShuttleTimetableItem[] = [];
  @Input() firstDestination = 'campus';
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
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
      this.shuttleTimetable.sort((a, b) => {
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

  addTimeDelta(time: string, delta: number): string {
    const [hour, minute] = time.split(':');
    const newTime = new Date(0, 0, 0, parseInt(hour), parseInt(minute) + delta);
    return String(newTime.getHours()).padStart(2, "0") + ":" + String(newTime.getMinutes()).padStart(2, "0");
  }
}
