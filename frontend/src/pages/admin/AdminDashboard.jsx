import React, { useEffect, useState } from "react";

import {
  getAdminDashboardSummary,
  getJobAnalytics,
  getHiringFunnelAnalytics,
  getInterviewMetrics,
  getTimeAnalytics,
  getFilteredJobAnalytics
} from "../../api/adminAnalyticsService";

import AdminSummaryCards from "../../components/admin/AdminSummaryCards";
import HiringFunnelChart from "../../components/admin/HiringFunnelChart";
import InterviewMetricsPanel from "../../components/admin/InterviewMetricsPanel";
import TimeAnalyticsCharts from "../../components/admin/TimeAnalyticsChart";
import AdminJobFilters from "../../components/admin/AdminJobFilters";
import AdminJobTable from "../../components/admin/AdminJobTable";

const AdminDashboard = () => {

  const [summary, setSummary] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [funnel, setFunnel] = useState(null);
  const [interviewMetrics, setInterviewMetrics] = useState(null);
  const [trends, setTrends] = useState(null);

  const applyFilters = async (filters) => {
    const data = await getFilteredJobAnalytics(filters);
    setJobs(data);
  };

  const resetFilters = async () => {
    const data = await getJobAnalytics();
    setJobs(data);
  };

  const loadDashboard = async () => {
    const [s, j, f, i, t] = await Promise.all([
      getAdminDashboardSummary(),
      getJobAnalytics(),
      getHiringFunnelAnalytics(),
      getInterviewMetrics(),
      getTimeAnalytics()
    ]);

    setSummary(s);
    setJobs(j);
    setFunnel(f);
    setInterviewMetrics(i);
    setTrends(t);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <AdminSummaryCards data={summary} />

      <HiringFunnelChart data={funnel} />

      <InterviewMetricsPanel data={interviewMetrics} />

      <TimeAnalyticsCharts data={trends} />

      <AdminJobFilters
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <AdminJobTable jobs={jobs} />

    </div>
  );
};

export default AdminDashboard;