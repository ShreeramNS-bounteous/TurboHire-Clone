import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Chart = ({ title, data }) => (
  <div className="bg-white shadow rounded p-4">
    <h3 className="mb-3">{title}</h3>

    <LineChart width={600} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" />
    </LineChart>
  </div>
);

const TimeAnalyticsCharts = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Chart title="Hires per Month" data={data.hiresPerMonth} />
      <Chart title="Candidates Added per Month" data={data.candidatesPerMonth} />
      <Chart title="Interview Volume per Month" data={data.interviewsPerMonth} />
    </div>
  );
};

export default TimeAnalyticsCharts;