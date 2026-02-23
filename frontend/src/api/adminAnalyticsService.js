import api from "../api/axios";

export const getAdminDashboardSummary = async () => {
  const response = await api.get("/api/admin/analytics/summary");
  return response.data;
};

export const getJobAnalytics = async () => {
  const response = await api.get("/api/admin/analytics/jobs");
  return response.data;
};

export const getFilteredJobAnalytics = async (filters) => {
  const response = await api.get("/api/admin/analytics/jobs/filter", {
    params: filters
  });
  return response.data;
};

export const getHiringFunnelAnalytics = async () => {
  const response = await api.get("/api/admin/analytics/funnel");
  return response.data;
};

export const getInterviewMetrics = async () => {
  const response = await api.get("/api/admin/analytics/interviews");
  return response.data;
};

export const getTimeAnalytics = async () => {
  const response = await api.get("/api/admin/analytics/trends");
  return response.data;
};