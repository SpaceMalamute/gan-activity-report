import { ActivityType } from '../enums/activity-type.enum';
import { Nullable } from '../types/nullable.type';

export interface Activity {
  id?: string;
  date: string;
  agentName: string;
  type?: Nullable<ActivityType>;
}
