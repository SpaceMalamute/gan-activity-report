import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'agents',
        component: AgentsComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
    ],
  },
];
