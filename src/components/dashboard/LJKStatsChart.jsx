// src/components/dashboard/LJKStatsChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const LJKStatsChart = ({ data, filter }) => {
  // Data sample berdasarkan distribusi industri dari CSV
  const chartData = [
    { name: 'Jasa Penilai (JPJP)', value: 120, color: '#EF4444' },
    { name: 'Ahli Syariah (ASPM)', value: 35, color: '#F97316' },
    { name: 'Modal Ventura (PMVJKL)', value: 45, color: '#3B82F6' },
    { name: 'Pergadaian (PGJKL)', value: 25, color: '#8B5CF6' },
    { name: 'Konsultan Aktuaria (JPKA)', value: 15, color: '#06B6D4' },
    { name: 'Perusahaan Efek (PEEFEK)', value: 8, color: '#10B981' },
    { name: 'Pialang Asuransi (JPPA)', value: 6, color: '#F59E0B' },
    { name: 'Lainnya', value: 12, color: '#6B7280' }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value} LJK`, 'Jumlah']}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LJKStatsChart;