export interface Agent {
  id: string;
  name: string;
  email: string;
}

export type CreateAgent = Omit<Agent, 'id'>;
