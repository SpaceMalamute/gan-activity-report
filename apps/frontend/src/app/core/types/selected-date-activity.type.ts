import { Activity } from '../models/activity.model';

export type SelectedDateActivities = {
  date: string;
  activities: Array<Activity>;
};
