import { HttpErrorResponse } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { AgentAPIService } from '../../../../core/api-client/agent/agent.api.service';
import { Agent, CreateAgent } from '../../../../core/models/agent.model';
import { Nullable } from '../../../../core/types/nullable.type';

type AgentsState = {
  currentAgent: Nullable<Agent>;
  agents: Array<Agent>;
  loading: boolean;
  error: string;
};

const initialState: AgentsState = {
  currentAgent: undefined,
  agents: [],
  loading: false,
  error: '',
};

const AGENTS_STATE = new InjectionToken<AgentsState>('AgentsState', {
  factory: () => initialState,
});

export const AgentsStore = signalStore(
  withState(() => inject(AGENTS_STATE)),
  withMethods((store, agentService = inject(AgentAPIService)) => ({
    logInAs: (agent: Nullable<Agent>) => {
      patchState(store, { currentAgent: agent });
    },
    isValidAgent: (agent: Nullable<Agent>): agent is Agent => {
      return agent !== null && agent !== undefined;
    },
    createAgent: rxMethod<CreateAgent>(
      pipe(
        switchMap((agent) => {
          return agentService.createAgent(agent).pipe(
            tapResponse({
              next: (newAgent) => {
                patchState(store, (state) => ({
                  loading: false,
                  agents: [...state.agents, newAgent],
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
    fetchAgents: rxMethod<void>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return agentService.getAgents().pipe(
            tapResponse({
              next: (agents) =>
                patchState(store, {
                  agents,
                  currentAgent: agents[0],
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

export type AgentsStore = InstanceType<typeof AgentsStore>;
