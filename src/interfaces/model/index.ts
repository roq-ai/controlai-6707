import { AttackInterface } from 'interfaces/attack';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ModelInterface {
  id?: string;
  name: string;
  format: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  attack?: AttackInterface[];
  user?: UserInterface;
  _count?: {
    attack?: number;
  };
}

export interface ModelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  format?: string;
  user_id?: string;
}
