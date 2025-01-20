import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import moment from 'moment';
import { Activity } from '../../../core/models/activity.model';
import { CalendarDay } from '../../../core/types/calendar-day.type';
import { Nullable } from '../../../core/types/nullable.type';
import { SelectedDateActivities } from '../../../core/types/selected-date-activity.type';
import { getDaysInMonth, weekdays } from '../../helpers/calendar.helper';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  public readonly select = output<SelectedDateActivities>();

  public currentDate: InputSignal<Date> = input.required<Date>();

  public activities: InputSignal<Nullable<Array<Activity>>> =
    input<Nullable<Array<Activity>>>();

  public displayAgent: InputSignal<boolean> = input<boolean>(false);

  public readonly: InputSignal<boolean> = input<boolean>(false);

  protected readonly dayNames: Signal<Array<string>> = signal(weekdays);

  protected readonly days: Signal<
    Map<
      string,
      {
        day: CalendarDay;
        activities: Array<Activity>;
      }
    >
  > = computed(() => {
    return new Map<
      string,
      {
        day: CalendarDay;
        activities: Array<Activity>;
      }
    >(
      getDaysInMonth(this.currentDate()).map((day) => {
        const date = moment.utc(day.date).format('YYYY-MM-DD');
        return [
          date,
          {
            day: day,
            activities:
              this.activities()?.filter(
                (activity) =>
                  date === moment.utc(activity.date).format('YYYY-MM-DD'),
              ) ?? [],
          },
        ];
      }),
    );
  });

  protected selected: WritableSignal<Nullable<CalendarDay>> = signal(undefined);

  protected selectDate(
    day: CalendarDay,
    activities: Nullable<Array<Activity>>,
  ): void {
    if (!this.readonly() && day.currentMonth) {
      this.selected.set(day);
      this.select.emit({
        date: day.date,
        activities: activities ?? [],
      });
    }
  }
}
