import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const HiringFunnelChart = ({ data }) => {

  if (!data) return null;

  const chartData = [
    { stage: "Shortlisted", value: data.shortlisted },
    { stage: "Round 1", value: data.round1 },
    { stage: "Round 2", value: data.round2 },
    { stage: "Round 3", value: data.round3 },
    { stage: "Hired", value: data.hired }
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-3">Hiring Funnel</h2>

      <BarChart width={700} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
};

export default HiringFunnelChart;