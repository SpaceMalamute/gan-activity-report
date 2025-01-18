import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BaseAPIService } from '../base.api.service';
import { Agent } from '../../models/agent.model';

@Injectable({
  providedIn: 'root',
})
export class AgentAPIService extends BaseAPIService {
  private readonly http: HttpClient = inject(HttpClient);
  protected override API_URL: string = `${this.API_ROOT}/agents`;

  public getAgents(): Observable<Array<Agent>> {
    return this.http
      .get<Array<Agent>>(this.API_URL)
      .pipe(map((response) => response));
  }

  public getAgent(id: string): Observable<Agent> {
    return this.http
      .get<Agent>(`${this.API_URL}/${id}`)
      .pipe(map((response) => response));
  }

  public createAgent(agent: Agent): Observable<Agent> {
    return this.http
      .post<Agent>(this.API_URL, agent)
      .pipe(map((response) => response));
  }

  public updateAgent(agent: Agent): Observable<Agent> {
    return this.http
      .put<Agent>(`${this.API_URL}/${agent.id}`, agent)
      .pipe(map((response) => response));
  }

  public deleteAgent(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(map(() => undefined));
  }
}
