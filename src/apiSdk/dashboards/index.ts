import axios from 'axios';
import queryString from 'query-string';
import { DashboardInterface, DashboardGetQueryInterface } from 'interfaces/dashboard';
import { GetQueryInterface } from '../../interfaces';

export const getDashboards = async (query?: DashboardGetQueryInterface) => {
  const response = await axios.get(`/api/dashboards${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDashboard = async (dashboard: DashboardInterface) => {
  const response = await axios.post('/api/dashboards', dashboard);
  return response.data;
};

export const updateDashboardById = async (id: string, dashboard: DashboardInterface) => {
  const response = await axios.put(`/api/dashboards/${id}`, dashboard);
  return response.data;
};

export const getDashboardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dashboards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDashboardById = async (id: string) => {
  const response = await axios.delete(`/api/dashboards/${id}`);
  return response.data;
};
