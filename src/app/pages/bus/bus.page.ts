import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BusService } from './bus.service';
import { Observable, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../../services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { BusRouteItem } from './bus.service';

const GET_PERIOD = gql`
  query GetPeriod($currentDate: String!) {
    shuttle {
      weekday (date: $currentDate),
    }
  }
`;

const GET_BUS = gql`
  query GetBus($weekday: String!, $startTime: String!) {
    bus(routePair: [
      {stopName: "한양대게스트하우스", routeName: "10-1"},
      {stopName: "한양대게스트하우스", routeName: "3102"},
      {stopName: "한양대정문", routeName: "707-1"},
    ]) {
      stopName, routeName,
      realtime {remainedStop, remainedTime, remainedSeat},
      timetable (weekday: $weekday, startTime: $startTime) {
        departureTime
      }
    }
  }
`;

interface PeriodQuery {
  shuttle: {
    weekday: string;
  };
}

interface BusQuery {
  bus: BusRouteItem[];
}

@Component({
  selector: 'app-bus',
  templateUrl: 'bus.page.html',
  styleUrls: ['bus.page.scss']
})
export class BusPage implements OnInit, OnDestroy {
  private weekday = 'weekdays';
  private swiper: any;
  private busQuery: QueryRef<BusQuery>;
  private busDateSubscription: Subscription | undefined;
  private busTimetableSubscription: Subscription | undefined;
  constructor(
    private apollo: Apollo,
    private busService: BusService,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private translateService: TranslateService) {}
  ngOnInit() {
    const now = new Date();
    this.busDateSubscription = this.apollo.watchQuery<PeriodQuery>({
      query: GET_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.weekday = data.shuttle.weekday;
      this.busDateSubscription?.unsubscribe();
      this.busQuery = this.apollo.watchQuery<BusQuery>({
        query: GET_BUS,
        pollInterval: 60000,
        variables: {
          weekday: this.weekday,
          startTime: `${now.getHours()}:${now.getMinutes()}`,
        }
      });
      this.busTimetableSubscription = this.busQuery.valueChanges.subscribe(({data, loading}) => {
        this.busService.setLoading(loading);
        this.busService.setBusArrivalList(data.bus);
      });
    });

    this.busService.loading.subscribe(value => {
      if (value) {
        this.loadingService.present('bus.loading', 'bus.loading').then(
          () => {
            this.busService.loading.subscribe(loading => {
              if (!loading) {
                this.loadingService.dismiss('bus.loading').then();
              }
            });
          }
        );
      }
    });
  }
  ngOnDestroy() {
    this.busDateSubscription?.unsubscribe();
    this.busTimetableSubscription?.unsubscribe();
  }
  refreshBusTimetable(event) {
    this.busQuery.refetch().then(() => {
      event.target.complete();
    });
  }
  setSwiperInstance(swiper) {
    this.swiper = swiper;
  }
}
