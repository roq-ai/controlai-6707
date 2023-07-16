const mapping: Record<string, string> = {
  attacks: 'attack',
  benchmarks: 'benchmark',
  companies: 'company',
  dashboards: 'dashboard',
  models: 'model',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
