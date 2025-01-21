import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import moment from 'moment';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { ScheduleStore } from './schedule.store';
const imports = [
  MatGridListModule,
  CalendarComponent,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatProgressBarModule,
  DatePipe,
];

const providers = [ScheduleStore];

@Component({
  selector: 'app-schedule',
  imports: [...imports],
  providers: [...providers],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  protected readonly store: ScheduleStore = inject(ScheduleStore);

  protected currentDate: WritableSignal<Date> = signal(moment.utc().toDate());

  public constructor() {
    effect(() => {
      this.store.fetchActivities({ date: this.currentDate() });
    });
  }

  public ngOnInit(): void {
    this.store.init(this.currentDate());
  }

  protected prevMonth(): void {
    this.currentDate.update((date) =>
      moment.utc(date).subtract(1, 'M').toDate(),
    );
  }

  protected nextMonth(): void {
    this.currentDate.update((date) => moment.utc(date).add(1, 'M').toDate());
  }
}
