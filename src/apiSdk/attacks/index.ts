import axios from 'axios';
import queryString from 'query-string';
import { AttackInterface, AttackGetQueryInterface } from 'interfaces/attack';
import { GetQueryInterface } from '../../interfaces';

export const getAttacks = async (query?: AttackGetQueryInterface) => {
  const response = await axios.get(`/api/attacks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAttack = async (attack: AttackInterface) => {
  const response = await axios.post('/api/attacks', attack);
  return response.data;
};

export const updateAttackById = async (id: string, attack: AttackInterface) => {
  const response = await axios.put(`/api/attacks/${id}`, attack);
  return response.data;
};

export const getAttackById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/attacks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAttackById = async (id: string) => {
  const response = await axios.delete(`/api/attacks/${id}`);
  return response.data;
};
