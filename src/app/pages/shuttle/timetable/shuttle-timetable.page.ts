import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShuttleTimetableService, ShuttleTimetableItem } from './shuttle-timetable.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { LoadingService } from '../../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

const GET_SHUTTLE_PERIOD = gql`
    query GetShuttlePeriod($currentDate: String!) {
      shuttle {
        weekday (date: $currentDate),
        period (date: $currentDate)
      }
    }
  `;

const GET_SHUTTLE_TIMETABLE = gql`
    query GetShuttleTimetable($period: String!) {
      shuttle {
        timetable (period: $period) {
          period, weekday, startStop, shuttleTime, shuttleType
        }
      }
    }
  `;

interface ShuttlePeriodQuery {
  shuttle: {
    weekday: string;
    period: string;
  };
}

interface ShuttleTimetableQuery {
  shuttle: {
    timetable: ShuttleTimetableItem[];
  };
}

@Component({
  selector: 'app-shuttle-timetable',
  templateUrl: 'shuttle-timetable.page.html',
  styleUrls: ['shuttle-timetable.page.scss']
})
export class ShuttleTimetablePage implements OnInit, OnDestroy {
  destination: string;
  stop: string;
  shuttleTimetableList: ShuttleTimetableItem[] = [];
  private period = 'semester';
  private shuttleTimetableQueryRef: QueryRef<any>;
  private shuttleDateSubscription: Subscription | undefined;
  private shuttleTimetableSubscription: Subscription | undefined;
  private now = new Date();
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private toastController: ToastController,
    private translateService: TranslateService,
    private shuttleService: ShuttleTimetableService,
    private loadingService: LoadingService) {}
  ngOnInit() {
    const now = new Date();
    this.shuttleDateSubscription = this.apollo.watchQuery<ShuttlePeriodQuery>({
      query: GET_SHUTTLE_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.period = data.shuttle.period;
      this.shuttleService.weekday.next(data.shuttle.weekday);
      this.shuttleDateSubscription?.unsubscribe();
      this.shuttleTimetableQueryRef = this.apollo.watchQuery<ShuttleTimetableQuery>({
        query: GET_SHUTTLE_TIMETABLE,
        pollInterval: 60000,
        variables: {period: this.period}
      });
      this.shuttleTimetableSubscription = this.shuttleTimetableQueryRef.valueChanges.subscribe(({data, loading}) => {
        this.shuttleService.setLoading(loading);
        this.shuttleService.setShuttleTimetable(data.shuttle.timetable);
        this.now = new Date();
      });
    });
    this.shuttleService.loading.subscribe(value => {
      if (value) {
        this.loadingService.present('shuttle.loading', 'shuttle.loading').then(
          () => {
            this.shuttleService.loading.subscribe(loading => {
              if (!loading) {
                this.loadingService.dismiss('shuttle.loading').then();
              }
            });
          }
        );
      }
    });
    this.shuttleService.weekday.subscribe(value => {
      this.showCurrentWeekdays(value);
    });
    this.route.queryParams.subscribe(params => {
      this.destination = params.destination;
      this.stop = params.stop;
    });
  }

  ngOnDestroy() {
    this.shuttleDateSubscription?.unsubscribe();
    this.shuttleTimetableSubscription?.unsubscribe();
  }
  refreshShuttleTimetable(event) {
    this.shuttleTimetableQueryRef.refetch().then(() => {
      event.target.complete();
    });
  }
  getShuttleTimetable() {
    return this.shuttleService.shuttleTimetable.value
      .filter(item => (
        this.checkDestination(item) &&
        item.startStop.toLowerCase() === 'dormitory' || this.stop !== 'dormitory') &&
        item.weekday === this.shuttleService.weekday.value)
      .map(item => ({
          period: item.period,
          shuttleTime: this.addTimeDelta(item),
          shuttleType: item.shuttleType,
          startStop: item.startStop
        }));
  }
  changeWeekday() {
    this.shuttleService.weekday.next(this.shuttleService.weekday.value === 'weekdays' ? 'weekends' : 'weekdays');
  }
  checkDestination(item: ShuttleTimetableItem): boolean {
    if (this.destination === 'station') {
      return item.shuttleType === 'DH' || item.shuttleType === 'C';
    } else if (this.destination === 'terminal') {
      return item.shuttleType === 'DY' || item.shuttleType === 'C';
    } else {
      return this.destination === 'campus' || this.destination === 'dormitory';
    }
  }
  calculateTimeDelta(shuttleType: string): number {
    switch (this.stop) {
      case 'dormitory':
        return -5;
      case 'shuttlecock_o':
        return 0;
      case 'station':
        return 10;
      case 'terminal':
        return shuttleType === 'DY' ? 10 : 15;
      case 'shuttlecock_i':
        return shuttleType !== 'C' ? 15 : 20;
      default:
        return 999;
    }
  }
  addTimeDelta(item: ShuttleTimetableItem): string {
    const [hour, minute, second] = item.shuttleTime.split(':');
    const newTime = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), parseInt(hour, 10), parseInt(minute, 10));
    newTime.setMinutes(newTime.getMinutes() + this.calculateTimeDelta(item.shuttleType));
    return String(newTime.getHours()).padStart(2, '0') + ':' + String(newTime.getMinutes()).padStart(2, '0');
  }
  async showCurrentWeekdays(value: string) {
    const toast = await this.toastController.create({
      message: this.translateService.instant('shuttle.timetable.' + value),
      buttons: [
        { text: this.translateService.instant('OK'), role: 'cancel' }
      ],
      cssClass: 'toast-closest-stop',
      duration: 1500
    });
    await toast.present();
  }
}
