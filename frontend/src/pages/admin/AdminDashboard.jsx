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
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Analytics and insights across the hiring pipeline
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <section className="bg-white p-5 rounded-xl shadow-sm border">
        <AdminSummaryCards data={summary} />
      </section>

      {/* FUNNEL + INTERVIEW METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-3">Hiring Funnel</h2>
          <HiringFunnelChart data={funnel} />
        </section>

        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-3">Interview Metrics</h2>
          <InterviewMetricsPanel data={interviewMetrics} />
        </section>

      </div>

      {/* TIME ANALYTICS */}
      <section className="bg-white p-5 rounded-xl shadow-sm border">
        <h2 className="font-semibold mb-3">Time Trends</h2>
        <TimeAnalyticsCharts data={trends} />
      </section>

      {/* JOB ANALYTICS TABLE */}
      <section className="bg-white p-5 rounded-xl shadow-sm border">
        <h2 className="font-semibold mb-4">Job Analytics</h2>

        <AdminJobFilters
          onApply={applyFilters}
          onReset={resetFilters}
        />

        <div className="mt-4">
          <AdminJobTable jobs={jobs} />
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;