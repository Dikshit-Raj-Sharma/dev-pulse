import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from "recharts";

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10} // This adds the "Growth"
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const LanguageCharts = ({ repos }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  if (!repos || repos.length === 0) return null;

  const langData = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(langData).map((name) => ({
    name: name,
    value: langData[name],
  }));

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="h-full p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-500">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center md:text-left">
        Language Distribution
      </h3>
      {/* 'ResponsiveContainer' makes the chart grow/shrink for mobile phones */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape} // 3. Use the function here
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              stroke="none" // Removes the thin white lines between slices for a cleaner look
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend 
              verticalAlign="bottom" 
              formatter={(value, entry) => {
                const percent = ((entry.payload.value / total) * 100).toFixed(0);
                return <span className="text-slate-600 text-xs font-semibold">{value} ({percent}%)</span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default LanguageCharts;
