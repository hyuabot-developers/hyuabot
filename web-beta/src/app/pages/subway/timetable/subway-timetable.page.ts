import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubwayTimetableService } from './subway-timetable.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { LoadingService } from '../../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SubwayRouteItem, SubwayTimetableItem } from '../subway.service';

const GET_PERIOD = gql`
    query GetPeriod($currentDate: String!) {
      shuttle {
        weekday (date: $currentDate),
      }
    }
  `;

const GET_SUBWAY_TIMETABLE = gql`
  query GetSubwayTimetable($stationName: String!, $routeName: String!) {
    subway(routePair: [
      {stationName: $stationName, routeName: $routeName}
    ]) {
      timetable {
        heading,
        weekday,
        terminalStation,
        departureTime
      }
    }
  }`;

interface ShuttlePeriodQuery {
  shuttle: {
    weekday: string;
  };
}


interface SubwayTimetableQuery {
  subway: SubwayRouteItem[];
}

@Component({
  selector: 'app-subway-timetable',
  templateUrl: 'subway-timetable.page.html',
  styleUrls: ['subway-timetable.page.scss']
})
export class SubwayTimetablePage implements OnInit, OnDestroy {
  routeName: string;
  stop: string;
  weekday: string;
  heading: string;
  subwayTimetableItems: SubwayTimetableItem[] = [];
  private subwayTimetableQueryRef: QueryRef<any>;
  private subwayDateSubscription: Subscription | undefined;
  private subwayTimetableSubscription: Subscription | undefined;
  private now = new Date();
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private toastController: ToastController,
    private translateService: TranslateService,
    private subwayTimetableService: SubwayTimetableService,
    private loadingService: LoadingService) {}
  ngOnInit() {
    const now = new Date();
    this.route.queryParams.subscribe(params => {
      this.routeName = params.route;
      this.stop = params.stop;
      this.heading = params.heading;
    });
    this.subwayDateSubscription = this.apollo.watchQuery<ShuttlePeriodQuery>({
      query: GET_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.subwayTimetableService.weekday.next(data.shuttle.weekday);
      this.subwayDateSubscription?.unsubscribe();
      this.subwayTimetableQueryRef = this.apollo.watchQuery<SubwayTimetableQuery>({
        query: GET_SUBWAY_TIMETABLE,
        pollInterval: 60000,
        variables: { stationName: '한대앞', routeName: this.getSubwayRouteCode(this.routeName) }
      });
      this.subwayTimetableSubscription = this.subwayTimetableQueryRef.valueChanges.subscribe(({data, loading}) => {
        this.subwayTimetableService.setLoading(loading);
        if (data.subway.length > 0) {
          this.subwayTimetableService.setSubwayTimetable(data.subway[0].timetable);
        }
        this.now = new Date();
      });
    });
    this.subwayTimetableService.loading.subscribe(value => {
      if (value) {
        this.loadingService.present('shuttle.loading', 'shuttle.loading').then(
          () => {
            this.subwayTimetableService.loading.subscribe(loading => {
              if (!loading) {
                this.loadingService.dismiss('shuttle.loading').then();
              }
            });
          }
        );
      }
    });
    this.subwayTimetableService.weekday.subscribe(value => {
      this.weekday = value;
      this.subwayTimetableItems = this.subwayTimetableService.subwayTimetable.value.filter(
        item => item.weekday === value && item.heading === this.heading).map(this.mapSubwayTimetableItem).sort(this.sortSubwayTimetableItem);
    });
    this.subwayTimetableService.subwayTimetable.subscribe(value => {
      this.subwayTimetableItems = value.filter(
        item => item.weekday === this.subwayTimetableService.weekday.value && item.heading === this.heading).map(
          this.mapSubwayTimetableItem).sort(this.sortSubwayTimetableItem);
    });
  }

  ngOnDestroy() {
    this.subwayDateSubscription?.unsubscribe();
    this.subwayTimetableSubscription?.unsubscribe();
  }
  changeWeekday() {
    this.subwayTimetableService.weekday.next(this.subwayTimetableService.weekday.value === 'weekdays' ? 'weekends' : 'weekdays');
  }
  getSubwayRouteCode(routeName: string): string {
    switch (routeName) {
      case 'line4':
        return '4호선';
      case 'suinbundang':
        return '수인분당선';
    }
  }
  getSubwayDestination(destination: string): string {
    switch (destination) {
      case '신인천':
      case '인천':
        return 'incheon';
      case '오이도':
        return 'oido';
      case '안산':
        return 'ansan';
      case '고색':
        return 'gosaek';
      case '죽전':
        return 'jukjeon';
      case '왕십리':
        return 'wangsimni';
      case '청량리':
        return 'cheongnyangni';
      case '당고개':
        return 'danggogae';
      case '노원':
        return 'nowon';
      case '한성대':
        return 'hansung';
      case '서울역':
        return 'seoul';
      case '사당':
        return 'sadang';
      case '금정':
        return 'geumjeong';
      default:
        return destination;
    }
  }
  mapSubwayTimetableItem(subwayTimetableItem: SubwayTimetableItem): SubwayTimetableItem {
    let departureTime = subwayTimetableItem.departureTime;
    if (subwayTimetableItem.departureTime.startsWith('00:')) {
      departureTime = subwayTimetableItem.departureTime.replace('00:', '24:');
    }
    return {
      ...subwayTimetableItem,
      departureTime,
    };
  }
  sortSubwayTimetableItem(a: SubwayTimetableItem, b: SubwayTimetableItem): number {
    if (a.departureTime < b.departureTime) {
      return -1;
    }
    if (a.departureTime > b.departureTime) {
      return 1;
    }
    return 0;
  }
}
