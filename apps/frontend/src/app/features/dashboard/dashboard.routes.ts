import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'agents',
        pathMatch: 'full',
      },
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
