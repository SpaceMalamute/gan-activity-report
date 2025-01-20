import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgentsStore } from './agents.store';
import { CreateAgentDialogComponent } from './dialogs/create-agent-dialog.component';

const imports = [
  MatTableModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
];

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

  private readonly dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.store.fetchAgents();
  }

  public openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateAgentDialogComponent, {
      data: { name: '', email: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.store.createAgent(result);
      }
    });
  }
}
