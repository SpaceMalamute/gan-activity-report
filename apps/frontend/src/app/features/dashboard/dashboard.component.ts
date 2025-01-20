import { Component, Signal, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TabRoute } from '../../core/interfaces/tab-route.interface';
import { DASHBOARD_TABS } from './constants/dashboard-tabs.constants';

const imports = [RouterModule, MatTabsModule];

@Component({
  selector: 'app-dashboard',
  imports: [...imports],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected readonly links: Signal<Array<TabRoute>> = signal(DASHBOARD_TABS);
}
