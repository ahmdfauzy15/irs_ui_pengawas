// src/components/dashboard/ComplianceChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComplianceChart = ({ data }) => {
  // Data sample untuk compliance
  const chartData = [
    { month: 'Jan', tepatWaktu: 1780, terlambat: 52, bermasalah: 15 },
    { month: 'Feb', tepatWaktu: 1820, terlambat: 48, bermasalah: 12 },
    { month: 'Mar', tepatWaktu: 1850, terlambat: 45, bermasalah: 10 },
    { month: 'Apr', tepatWaktu: 1890, terlambat: 42, bermasalah: 8 },
    { month: 'Mei', tepatWaktu: 1920, terlambat: 40, bermasalah: 7 },
    { month: 'Jun', tepatWaktu: 1950, terlambat: 38, bermasalah: 5 }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip 
          formatter={(value) => [`${value} laporan`, 'Jumlah']}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend />
        <Bar dataKey="tepatWaktu" name="Tepat Waktu" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="terlambat" name="Terlambat" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        <Bar dataKey="bermasalah" name="Bermasalah" fill="#EF4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComplianceChart;