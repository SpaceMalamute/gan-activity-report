import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import moment from 'moment';
import { ActivityType } from '../../core/enums/activity-type.enum';
import { Activity } from '../../core/models/activity.model';
import { Nullable } from '../../core/types/nullable.type';
import { SelectedDateActivities } from '../../core/types/selected-date-activity.type';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { AgentsStore } from '../dashboard/pages/agents/agents.store';
import { ActivityStore } from './activity.store';

const imports = [
  CommonModule,
  MatGridListModule,
  CalendarComponent,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatProgressBarModule,
];

const providers = [ActivityStore];

@Component({
  selector: 'app-activity',
  imports: [...imports],
  providers: [...providers],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent implements OnInit {
  protected readonly activityType: typeof ActivityType = ActivityType;

  protected readonly actitityStore: ActivityStore = inject(ActivityStore);

  protected readonly agentsStore: AgentsStore = inject(AgentsStore);

  protected currentDate: WritableSignal<Date> = signal(moment.utc().toDate());

  public constructor() {
    effect(() => {
      const agent = this.agentsStore.currentAgent();
      if (this.agentsStore.isValidAgent(agent)) {
        this.actitityStore.fetchActivities({
          agentId: agent.id,
          date: this.currentDate(),
        });
      }
    });
  }

  public ngOnInit(): void {
    this.actitityStore.init(this.currentDate());
  }

  protected selectActivity(activity: SelectedDateActivities) {
    this.actitityStore.setSelected(activity);
  }

  protected updateActivity(
    type: ActivityType,
    activity: Activity,
    event: MatChipSelectionChange,
  ) {
    const selected: Nullable<SelectedDateActivities> =
      this.actitityStore.selected();

    if (event.isUserInput && selected) {
      if (activity && activity.id) {
        if (event.selected && activity) {
          this.actitityStore.updateActivity({
            id: activity.id,
            type: type,
          });
        } else {
          this.actitityStore.deleteActivity(activity.id);
        }
      } else {
        const agent = this.agentsStore.currentAgent();
        if (this.agentsStore.isValidAgent(agent)) {
          this.actitityStore.createActivity({
            agentId: agent.id,
            activity: {
              agentName: agent.name,
              date: selected.date,
              type: type,
            },
          });
        }
      }
    }
  }
}
