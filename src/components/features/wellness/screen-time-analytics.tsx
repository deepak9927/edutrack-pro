"use client";

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScreenTimeData } from '@/lib/models/screen-time';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function ScreenTimeAnalytics() {
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/wellness/screen-time');
        const data = await response.json();
        setScreenTimeData(data);
      } catch (error) {
        console.error('Error fetching screen time data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Screen Time (minutes)',
      },
    },
  };

  const appUsageChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'App Usage (minutes)',
      },
    },
  };

  const barChartData = screenTimeData ? {
    labels: screenTimeData.map(item => item.date),
    datasets: [
      {
        label: 'Productive',
        data: screenTimeData.map(item => item.productiveTime),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Distracting',
        data: screenTimeData.map(item => item.distractingTime),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  } : null;

  const appUsageChartData = screenTimeData && screenTimeData[0]?.appUsage ? {
    labels: Object.keys(screenTimeData[0].appUsage),
    datasets: [
      {
        label: 'App Usage',
        data: Object.values(screenTimeData[0].appUsage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  } : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Screen Time Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading screen time data...</p>
        ) : screenTimeData ? (
          <>
            {barChartData && <Bar options={barChartOptions} data={barChartData} />}
            {appUsageChartData && <Pie options={appUsageChartOptions} data={appUsageChartData} />}
          </>
        ) : (
          <p>No data available.</p>
        )}
      </CardContent>
    </Card>
  );
}
