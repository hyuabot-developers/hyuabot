import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShuttleTimetableService, ShuttleTimetableItem } from './shuttle-timetable.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { LoadingService } from '../../../services/loading.service';

const GET_SHUTTLE_PERIOD = gql`
    query GetShuttlePeriod($currentDate: String!) {
      shuttle {
        period (date: $currentDate)
      }
    }
  `;

const GET_SHUTTLE_TIMETABLE = gql`
    query GetShuttleTimetable($period: String!) {
      shuttle {
        timetable (period: $period) {
          period, startStop, shuttleTime, shuttleType
        }
      }
    }
  `;

interface ShuttlePeriodQuery {
  shuttle: {
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
  private period = 'semester';
  private shuttleTimetableQueryRef: QueryRef<any>;
  private shuttleDateSubscription: Subscription | undefined;
  private shuttleTimetableSubscription: Subscription | undefined;
  private loadingToast;
  constructor(
    private apollo: Apollo,
    private shuttleService: ShuttleTimetableService,
    private loadingService: LoadingService) {}
  ngOnInit() {
    const now = new Date();
    this.shuttleDateSubscription = this.apollo.watchQuery<ShuttlePeriodQuery>({
      query: GET_SHUTTLE_PERIOD, variables: {currentDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
    }).valueChanges.subscribe(({data, loading}) => {
      this.period = data.shuttle.period;
      this.shuttleDateSubscription?.unsubscribe();
      this.shuttleTimetableQueryRef = this.apollo.watchQuery<ShuttleTimetableQuery>({
        query: GET_SHUTTLE_TIMETABLE,
        pollInterval: 60000,
        variables: {period: this.period}
      });
      this.shuttleTimetableSubscription = this.shuttleTimetableQueryRef.valueChanges.subscribe(({data, loading}) => {
        this.shuttleService.setLoading(loading);
        this.shuttleService.setShuttleTimetable(data.shuttle.timetable);
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
}
