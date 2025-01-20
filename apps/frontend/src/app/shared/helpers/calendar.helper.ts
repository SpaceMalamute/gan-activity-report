import moment from 'moment';
import 'moment/locale/fr';
import { CalendarDay } from '../../core/types/calendar-day.type';

const DAY_NAME_FORMAT = 'dddd';

export const weekdays: string[] = moment.weekdays(true);

export const getDaysInMonth = (date: Date): Array<CalendarDay> => {
  const month: number = date.getMonth();
  const year: number = date.getFullYear();
  const lastDay: number = moment.utc([year, month]).daysInMonth();
  const days: Array<number> = Array.from({ length: lastDay }, (_, i) => i + 1);

  return getPreviousDays(date)
    .concat(
      days.map((day) => {
        const currentDay = moment.utc([
          date.getFullYear(),
          date.getMonth(),
          day,
        ]);
        return {
          currentMonth: true,
          holiday: weekdays.indexOf(currentDay.format(DAY_NAME_FORMAT)) > 4,
          date: moment.utc(currentDay).format('YYYY-MM-DD'),
        };
      }),
    )
    .concat(getNextDays(date));
};

const getPreviousDays = (date: Date): Array<CalendarDay> => {
  return Array.from({ length: getMonthPreviousOffset(date) }, (_, i) => i + 1)
    .reverse()
    .map((offset) => {
      const day = moment
        .utc([date.getFullYear(), date.getMonth(), 1])
        .add(-offset, 'days');

      return {
        currentMonth: false,
        holiday: weekdays.indexOf(day.format(DAY_NAME_FORMAT)) > 4,
        date: day.toISOString(),
      };
    });
};

const getNextDays = (date: Date): Array<CalendarDay> => {
  return Array.from({ length: getMonthNextOffset(date) }, (_, i) => i + 1).map(
    (offset) => {
      const day = moment
        .utc([
          date.getFullYear(),
          date.getMonth(),
          moment.utc([date.getFullYear(), date.getMonth()]).daysInMonth(),
        ])
        .add(offset, 'days');

      return {
        currentMonth: false,
        holiday: weekdays.indexOf(day.format(DAY_NAME_FORMAT)) > 4,
        date: day.toISOString(),
      };
    },
  );
};

const getMonthPreviousOffset = (date: Date): number => {
  const firstDay = moment.utc([date.getFullYear(), date.getMonth(), 1]);
  return weekdays.indexOf(firstDay.format(DAY_NAME_FORMAT));
};

const getMonthNextOffset = (date: Date): number => {
  const lastDay = moment.utc([
    date.getFullYear(),
    date.getMonth(),
    moment.utc([date.getFullYear(), date.getMonth()]).daysInMonth(),
  ]);

  return 6 - weekdays.indexOf(lastDay.format(DAY_NAME_FORMAT));
};
