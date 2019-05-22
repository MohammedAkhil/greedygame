import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function LineGraph(props) {
  const { data } = props;
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis dataKey="eCPM" />
      <Line type="monotone" dataKey="eCPM" stroke="#8884d8" />
    </LineChart>
  );
}
