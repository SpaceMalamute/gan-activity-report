import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Agent } from './core/models/agent.model';
import { Nullable } from './core/types/nullable.type';
import { AgentsStore } from './features/dashboard/pages/agents/agents.store';
const imports = [
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
];

const providers = [AgentsStore];

@Component({
  imports: [...imports],
  providers: [...providers],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = 'GAN - Activity Report';

  protected readonly agentsStore = inject(AgentsStore);

  public ngOnInit(): void {
    this.agentsStore.fetchAgents();
  }

  protected logInAs(agent: Nullable<Agent>): void {
    this.agentsStore.logInAs(agent);
  }
}
