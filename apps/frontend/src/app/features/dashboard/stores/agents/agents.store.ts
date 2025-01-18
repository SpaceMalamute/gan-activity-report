import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { Agent } from '../../../../core/models/agent.model';
import { inject, InjectionToken } from '@angular/core';
import { AgentAPIService } from 'apps/frontend/src/app/core/api-client/agent/agent.api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type AgentsState = {
  agents: Array<Agent>;
  loading: boolean;
  error: string;
};

const initialState: AgentsState = {
  agents: [],
  loading: false,
  error: '',
};

const AGENTS_STATE = new InjectionToken<AgentsState>('BooksState', {
  factory: () => initialState,
});

export const AgentsStore = signalStore(
  withState(() => inject(AGENTS_STATE)),
  withMethods((store, agentService = inject(AgentAPIService)) => ({
    fetchAgents: rxMethod<void>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return agentService.getAgents().pipe(
            tapResponse({
              next: (agents) => patchState(store, { agents, loading: false }),
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

export type AgentsStore = InstanceType<typeof AgentsStore>;
