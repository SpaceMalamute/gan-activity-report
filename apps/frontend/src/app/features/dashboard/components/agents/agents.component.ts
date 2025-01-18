import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AgentsStore } from '../../stores/agents/agents.store';

const imports = [MatTableModule, MatProgressBarModule];

const providers = [AgentsStore];

@Component({
  selector: 'app-agents',
  imports: [...imports],
  providers: [...providers],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
})
export class AgentsComponent implements OnInit {
  protected readonly store: AgentsStore = inject(AgentsStore);

  protected readonly displayedColumns: string[] = ['id', 'name', 'email'];

  ngOnInit(): void {
    this.store.fetchAgents();
  }
}
