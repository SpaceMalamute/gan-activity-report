import { HttpErrorResponse } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import moment from 'moment';
import { pipe, switchMap, tap } from 'rxjs';
import { ActivityAPIService } from '../../core/api-client/activity/activity.api.service';
import { ActivityType } from '../../core/enums/activity-type.enum';
import { Activity } from '../../core/models/activity.model';
import { Nullable } from '../../core/types/nullable.type';
import { SelectedDateActivities } from '../../core/types/selected-date-activity.type';

type ReportState = {
  date: Nullable<Date>;
  activities: Array<Activity>;
  selected: Nullable<SelectedDateActivities>;
  loading: boolean;
  error: string;
};

const initialState: ReportState = {
  date: undefined,
  activities: [],
  selected: undefined,
  loading: false,
  error: '',
};

const REPORT_STATE: InjectionToken<ReportState> =
  new InjectionToken<ReportState>('ReportState', {
    factory: () => initialState,
  });

export const ActivityStore = signalStore(
  withState(() => inject(REPORT_STATE)),
  withMethods((store, activityService = inject(ActivityAPIService)) => ({
    init(date: Date): void {
      patchState(store, { date });
    },
    setSelected(activity: SelectedDateActivities): void {
      patchState(store, () => ({ selected: activity }));
    },
    fetchActivities: rxMethod<{ agentId: string; date: Date }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ agentId, date }) => {
          return activityService.getActivitiesByAgent(agentId, date).pipe(
            tapResponse({
              next: (activities) =>
                patchState(store, {
                  date: moment.utc(date).startOf('M').toDate(),
                  activities: activities.map((x) => ({
                    ...x,
                    date: moment.utc(x.date).format('YYYY-MM-DD'),
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
    createActivity: rxMethod<{ agentId: string; activity: Activity }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ agentId, activity }) => {
          return activityService.createActivity(agentId, activity).pipe(
            tapResponse({
              next: (newActivity) => {
                return patchState(store, (state) => ({
                  activities: [...state.activities, newActivity],
                  selected: state.selected
                    ? {
                        ...state.selected,
                        activities: [newActivity],
                      }
                    : undefined,
                  loading: false,
                }));
              },
              error: (err: HttpErrorResponse) => {
                patchState(store, { error: err.message, loading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    updateActivity: rxMethod<{ id: string; type: ActivityType }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ id, type }) => {
          return activityService.updateActivity(id, type).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  activities: state.activities.map((x) =>
                    x.id === id ? { ...x, type } : x,
                  ),
                  loading: false,
                  selected: state.selected
                    ? {
                        ...state.selected,
                      }
                    : undefined,
                })),
              error: (err: HttpErrorResponse) => {
                patchState(store, { error: err.message, loading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    deleteActivity: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((id) => {
          return activityService.deleteActivity(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  activities: state.activities.filter((x) => x.id !== id),
                  selected: state.selected
                    ? {
                        ...state.selected,
                        activities: [],
                      }
                    : undefined,
                  loading: false,
                })),
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

export type ActivityStore = InstanceType<typeof ActivityStore>;
