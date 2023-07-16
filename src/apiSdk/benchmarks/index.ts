import axios from 'axios';
import queryString from 'query-string';
import { BenchmarkInterface, BenchmarkGetQueryInterface } from 'interfaces/benchmark';
import { GetQueryInterface } from '../../interfaces';

export const getBenchmarks = async (query?: BenchmarkGetQueryInterface) => {
  const response = await axios.get(`/api/benchmarks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBenchmark = async (benchmark: BenchmarkInterface) => {
  const response = await axios.post('/api/benchmarks', benchmark);
  return response.data;
};

export const updateBenchmarkById = async (id: string, benchmark: BenchmarkInterface) => {
  const response = await axios.put(`/api/benchmarks/${id}`, benchmark);
  return response.data;
};

export const getBenchmarkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/benchmarks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBenchmarkById = async (id: string) => {
  const response = await axios.delete(`/api/benchmarks/${id}`);
  return response.data;
};
