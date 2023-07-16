import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DashboardInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DashboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
