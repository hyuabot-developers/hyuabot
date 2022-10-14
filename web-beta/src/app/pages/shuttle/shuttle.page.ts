import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShuttleService, ShuttleTimetableItem } from './shuttle.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../services/loading.service';
import { SubwayRealtimeItem, SubwayRealtimeQuery } from '../subway/subway.service';

const GET_SHUTTLE_PERIOD = gql`
    query GetShuttlePeriod($currentDate: String!) {
      shuttle {
        weekday (date: $currentDate),
        period (date: $currentDate)
      }
    }
  `;

const GET_SHUTTLE_TIMETABLE = gql`
    query GetShuttleTimetable($period: String!, $weekday: String!, $startTime: String!, $count: Int!) {
      shuttle {
        timetable (period: $period, weekday: $weekday, startTime: $startTime, count: $count) {
          period, startStop, shuttleTime, shuttleType
        }
      },
      subway(routePair: [{stationName: "한대앞", routeName: "수인분당선"}]) {
        realtime {heading, terminalStation, remainedTime}
      }
    }
  `;

interface ShuttlePeriodQuery {
  shuttle: {
    period: string;
    weekday: string;
  };
}

interface ShuttleTimetableQuery {
  shuttle: {
    timetable: ShuttleTimetableItem[];
  };
  subway: SubwayRealtimeQuery[];
}

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
export class ShuttlePage implements OnInit, OnDestroy {
  closestStopIndex = 0;
  private weekday = 'weekdays';
  private period = 'semester';
  private swiper: any;
  private stopLocationList: BusStop[] = [
    {stopName: 'shuttle.stop.dormitory.name', latitude: 37.29339607529377, longitude: 126.83630604103446},
    {stopName: 'shuttle.stop.shuttlecock_o.name', latitude: 37.29875417910844, longitude: 126.83784054072336},
    {stopName: 'shuttle.stop.subway.name', latitude: 37.308494476826155, longitude: 126.85310236423418},
    {stopName: 'shuttle.stop.terminal.name', latitude: 37.31945164682341, longitude: 126.8455453372041},
    {stopName: 'shuttle.stop.shuttlecock_i.name', latitude: 37.29869328231496, longitude: 126.8377767466817},
  ];
  private shuttleQuery: QueryRef<ShuttleTimetableQuery>;
  private shuttleDateSubscription: Subscription | undefined;
  private shuttleTimetableSubscription: Subscription | undefined;
  constructor(
    private apollo: Apollo,
    private shuttleService: ShuttleService,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private translateService: TranslateService) {}
  ngOnInit() {
    const now = new Date();
    const previous30Minutes = new Date(now.getTime() - 30 * 60 * 1000);
    this.shuttleDateSubscription = this.apollo.watchQuery<ShuttlePeriodQuery>({
      query: GET_SHUTTLE_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.weekday = data.shuttle.weekday;
      this.period = data.shuttle.period;
      this.shuttleDateSubscription?.unsubscribe();
      this.shuttleQuery = this.apollo.watchQuery<ShuttleTimetableQuery>({
        query: GET_SHUTTLE_TIMETABLE,
        pollInterval: 60000,
        variables: {
          period: this.period,
          weekday: this.weekday,
          startTime: `${previous30Minutes.getHours()}:${previous30Minutes.getMinutes()}`, count: 5}
      });
      this.shuttleTimetableSubscription = this.shuttleQuery.valueChanges.subscribe(({data, loading}) => {
        this.shuttleService.setLoading(loading);
        this.shuttleService.setShuttleTimetable(data.shuttle.timetable);
        this.shuttleService.setSubwayRealtime(data.subway[0].realtime);
      });
    });

    this.getLocation().subscribe(position => {
      this.setClosestStop(position.coords.latitude, position.coords.longitude);
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
  }
  ngOnDestroy() {
    this.shuttleDateSubscription?.unsubscribe();
    this.shuttleTimetableSubscription?.unsubscribe();
  }
  refreshShuttleTimetable(event) {
    this.shuttleQuery.refetch().then(() => {
      event.target.complete();
    });
  }
  getLocation(): Observable<any> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      }, error => {
      });
    });
  }
  setClosestStop(latitude: number, longitude: number) {
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < this.stopLocationList.length; i++) {
      const distance = this.getDistance(latitude, longitude, this.stopLocationList[i].latitude, this.stopLocationList[i].longitude);
      if (distance < minDistance) {
        minDistance = distance;
        this.closestStopIndex = i;
      }
    }
    this.showClosestShuttleStop().then();
  }
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
  }

  setSwiperInstance(swiper) {
    this.swiper = swiper;
    this.swiper.slideTo(this.closestStopIndex, 1000, false);
  }
  async showClosestShuttleStop() {
    const toast = await this.toastController.create({
      message: this.translateService.instant(
        'shuttle.stop.closest', {name: this.translateService.instant(this.stopLocationList[this.closestStopIndex].stopName)}),
      buttons: [
        { text: this.translateService.instant('OK'), role: 'cancel' }
      ],
      cssClass: 'toast-closest-stop',
      duration: 1500
    });
    await toast.present();
  }
}
