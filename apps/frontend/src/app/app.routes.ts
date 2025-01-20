import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (r) => r.DASHBOARD_ROUTES,
      ),
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./features/activity/activity.routes').then(
        (r) => r.ACTIVITY_ROUTES,
      ),
  },
];
