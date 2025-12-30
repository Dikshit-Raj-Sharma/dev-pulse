import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
} from "recharts";

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        // SMOOTH HOVER FIX: CSS transition makes the slice growth fluid
        style={{ 
          transition: 'all 400ms ease-in-out',
          outline: 'none',
          cursor: 'pointer'
        }}
      />
    </g>
  );
};

const LanguageCharts = ({ repos, darkMode }) => { // Added darkMode prop
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
    <div className="h-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 text-center md:text-left">
        Language Distribution
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                color: darkMode ? "#f1f5f9" : "#1e293b"
              }}
              itemStyle={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}
              formatter={(value, name) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [`${value} repos (${percent}%)`, name];
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value, entry) => {
                const percent = ((entry.payload.value / total) * 100).toFixed(0);
                return (
                  <span className="text-slate-600 dark:text-slate-400 text-xs font-semibold">
                    {value} ({percent}%)
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageCharts;