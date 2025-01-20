import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityType } from '../../enums/activity-type.enum';
import { Activity } from '../../models/activity.model';
import { Agent } from '../../models/agent.model';
import { BaseAPIService } from '../base.api.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityAPIService extends BaseAPIService {
  private readonly http: HttpClient = inject(HttpClient);
  protected override API_URL: string = `${this.API_ROOT}/activities`;

  public getActivities(
    date: Date,
  ): Observable<Array<Activity & { agent: Agent }>> {
    return this.http
      .get<Array<Activity & { agent: Agent }>>(
        `${this.API_URL}/${date.toISOString()}`,
      )
      .pipe(map((response) => response));
  }

  public getActivitiesByAgent(
    agentId: string,
    date: Date,
  ): Observable<Array<Activity>> {
    return this.http
      .get<Array<Activity>>(`${this.API_URL}/${agentId}/${date.toISOString()}`)
      .pipe(map((response) => response));
  }

  public createActivity(
    agentId: string,
    activity: Activity,
  ): Observable<Activity> {
    return this.http
      .post<Activity>(this.API_URL, {
        agentId: agentId,
        date: activity.date,
        type: activity.type,
      })
      .pipe(map((response) => response));
  }

  public updateActivity(id: string, type: ActivityType): Observable<Activity> {
    return this.http
      .patch<Activity>(`${this.API_URL}/${id}/${type}`, {})
      .pipe(map((response) => response));
  }

  public deleteActivity(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(map(() => undefined));
  }
}
