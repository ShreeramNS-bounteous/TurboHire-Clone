import React from "react";

const InterviewMetricsPanel = ({ data }) => {

  if (!data) return null;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-3">Interview Metrics</h2>

      <div className="flex gap-6">
        <div>Scheduled: {data.scheduled}</div>
        <div>Completed: {data.completed}</div>
        <div>No Show: {data.noShow}</div>
        <div>No Show Rate: {(data.noShowRate * 100).toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default InterviewMetricsPanel;