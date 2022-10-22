import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { SubwayService } from './subway.service';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../../services/loading.service';
import { SubwayRouteItem } from './subway.service';

const GET_PERIOD = gql`
  query GetPeriod($currentDate: String!) {
    shuttle {
      weekday (date: $currentDate),
    }
  }
`;

const GET_SUBWAY = gql`
  query GetSubway($weekday: String!) {
    subway(routePair: [
      {stationName: "한대앞", routeName: "4호선"},
      {stationName: "한대앞", routeName: "수인분당선"},
    ]) {
      stationName, routeName,
      realtime {heading, updateTime, lastTrain, terminalStation, currentStation, remainedTime, status}
      timetable (weekday: $weekday) {
        heading, weekday, terminalStation, departureTime
      }
    }
  }
`;

interface PeriodQuery {
  shuttle: {
    weekday: string;
  };
}

interface SubwayQuery {
  subway: SubwayRouteItem[];
}

@Component({
  selector: 'app-shuttle',
  templateUrl: 'subway.page.html',
  styleUrls: ['subway.page.scss']
})
export class SubwayPage implements OnInit, OnDestroy {
  private weekday = 'weekdays';
  private subwayQuery: QueryRef<SubwayQuery>;
  private subwayDateSubscription: Subscription | undefined;
  private subwayTimetableSubscription: Subscription | undefined;
  constructor(
    private apollo: Apollo,
    private subwayService: SubwayService,
    private toastController: ToastController,
    private loadingService: LoadingService) {}
  ngOnInit() {
    const now = new Date();
    this.subwayDateSubscription = this.apollo.watchQuery<PeriodQuery>({
      query: GET_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.weekday = data.shuttle.weekday;
      this.subwayDateSubscription?.unsubscribe();
      this.subwayQuery = this.apollo.watchQuery<SubwayQuery>({
        query: GET_SUBWAY,
        pollInterval: 60000,
        variables: {
          weekday: this.weekday,
          startTime: `${now.getHours()}:${now.getMinutes()}`,
        }
      });
      this.subwayTimetableSubscription = this.subwayQuery.valueChanges.subscribe(({data, loading}) => {
        this.subwayService.setLoading(loading);
        this.subwayService.setSubwayArrivalList(data.subway);
      });
    });

    this.subwayService.loading.subscribe(value => {
      if (value) {
        this.loadingService.present('subway.loading', 'subway.loading').then(
          () => {
            this.subwayService.loading.subscribe(loading => {
              if (!loading) {
                this.loadingService.dismiss('subway.loading').then();
              }
            });
          }
        );
      }
    });
  }
  ngOnDestroy() {
    this.subwayDateSubscription?.unsubscribe();
    this.subwayTimetableSubscription?.unsubscribe();
  }
  refreshSubwayTimetable(event) {
    this.subwayQuery.refetch().then(() => {
      event.target.complete();
    });
  }
}
