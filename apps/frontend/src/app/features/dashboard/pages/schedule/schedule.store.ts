import { HttpErrorResponse } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import moment from 'moment';
import { pipe, switchMap, tap } from 'rxjs';
import { ActivityAPIService } from '../../../../core/api-client/activity/activity.api.service';
import { Activity } from '../../../../core/models/activity.model';
import { Nullable } from '../../../../core/types/nullable.type';

type ScheduleState = {
  date: Nullable<Date>;
  activities: Array<Activity>;
  loading: boolean;
  error: string;
};

const initialState: ScheduleState = {
  date: undefined,
  activities: [],
  loading: false,
  error: '',
};

const REPORT_STATE = new InjectionToken<ScheduleState>('ScheduleState', {
  factory: () => initialState,
});

export const ScheduleStore = signalStore(
  withState(() => inject(REPORT_STATE)),
  withMethods((store, activityService = inject(ActivityAPIService)) => ({
    init(date: Date): void {
      patchState(store, { date });
    },
    fetchActivities: rxMethod<{ date: Date }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ date }) => {
          return activityService.getActivities(date).pipe(
            tapResponse({
              next: (activities) =>
                patchState(store, {
                  date: moment.utc(date).startOf('M').toDate(),
                  activities: activities.map((x) => ({
                    id: x.id,
                    date: moment.utc(x.date).format('YYYY-MM-DD'),
                    agentName: x.agent.name,
                    type: x.type,
                  })),
                  loading: false,
                }),
              error: (err: HttpErrorResponse) => {
                patchState(store, { error: err.message, loading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
  })),
);

export type ScheduleStore = InstanceType<typeof ScheduleStore>;
