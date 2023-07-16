import { ModelInterface } from 'interfaces/model';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AttackInterface {
  id?: string;
  type: string;
  model_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  model?: ModelInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AttackGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  model_id?: string;
  user_id?: string;
}
