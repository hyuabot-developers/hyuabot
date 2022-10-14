import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusTimetableService } from './bus-timetable.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { LoadingService } from '../../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BusRouteTimetableOnlyItem, BusTimetableItem } from '../bus.service';

const GET_PERIOD = gql`
    query GetPeriod($currentDate: String!) {
      shuttle {
        weekday (date: $currentDate),
      }
    }
  `;

const GET_BUS_TIMETABLE = gql`
  query GetBusTimetable($stopName: String!, $routeName: String!) {
    bus(routePair: [
      {stopName: $stopName, routeName: $routeName}
    ]) {
      timetable {
        weekday,
        departureTime
      }
    }
  }`;

interface ShuttlePeriodQuery {
  shuttle: {
    weekday: string;
  };
}

interface BusTimetableQuery {
  bus: BusRouteTimetableOnlyItem[];
}

@Component({
  selector: 'app-bus-timetable',
  templateUrl: 'bus-timetable.page.html',
  styleUrls: ['bus-timetable.page.scss']
})
export class BusTimetablePage implements OnInit, OnDestroy {
  routeName: string;
  stop: string;
  weekday: string;
  busTimetableItems: BusTimetableItem[] = [];
  private busTimetableQueryRef: QueryRef<any>;
  private busDateSubscription: Subscription | undefined;
  private busTimetableSubscription: Subscription | undefined;
  private now = new Date();
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private toastController: ToastController,
    private translateService: TranslateService,
    private busTimetableService: BusTimetableService,
    private loadingService: LoadingService) {}
  ngOnInit() {
    const now = new Date();
    this.route.queryParams.subscribe(params => {
      this.routeName = params.route;
      this.stop = params.stop;
    });
    this.busDateSubscription = this.apollo.watchQuery<ShuttlePeriodQuery>({
      query: GET_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      if (data.shuttle.weekday === 'weekdays') {
        this.busTimetableService.weekday.next('weekdays');
      } else if (now.getDay() === 6) {
        this.busTimetableService.weekday.next('saturday');
      } else if (now.getDay() === 0 || data.shuttle.weekday === 'weekends') {
        this.busTimetableService.weekday.next('sunday');
      }
      this.busDateSubscription?.unsubscribe();
      this.busTimetableQueryRef = this.apollo.watchQuery<BusTimetableQuery>({
        query: GET_BUS_TIMETABLE,
        pollInterval: 60000,
        variables: { stopName: this.getStopName(), routeName: this.routeName }
      });
      this.busTimetableSubscription = this.busTimetableQueryRef.valueChanges.subscribe(({data, loading}) => {
        this.busTimetableService.setLoading(loading);
        if (data.bus.length > 0) {
          this.busTimetableService.setBusTimetable(data.bus[0].timetable);
        }
        this.now = new Date();
      });
    });
    this.busTimetableService.loading.subscribe(value => {
      if (value) {
        this.loadingService.present('shuttle.loading', 'shuttle.loading').then(
          () => {
            this.busTimetableService.loading.subscribe(loading => {
              if (!loading) {
                this.loadingService.dismiss('shuttle.loading').then();
              }
            });
          }
        );
      }
    });
    this.busTimetableService.weekday.subscribe(value => {
      this.weekday = value;
      this.busTimetableItems = this.busTimetableService.busTimetable.value.filter(item => item.weekday === value);
    });
    this.busTimetableService.busTimetable.subscribe(value => {
      this.busTimetableItems = value.filter(item => item.weekday === this.busTimetableService.weekday.value);
    });
  }

  ngOnDestroy() {
    this.busDateSubscription?.unsubscribe();
    this.busTimetableSubscription?.unsubscribe();
  }
  changeWeekday() {
    if (this.busTimetableService.weekday.value === 'weekdays') {
      this.busTimetableService.weekday.next('saturday');
    } else if (this.busTimetableService.weekday.value === 'saturday') {
      this.busTimetableService.weekday.next('sunday');
    } else if (this.busTimetableService.weekday.value === 'sunday') {
      this.busTimetableService.weekday.next('weekdays');
    }
  }
  getStopName() {
    switch (this.stop) {
      case 'guestHouse':
        return '한양대게스트하우스';
      case 'mainGate':
        return '한양대정문';
    }
  }
}
