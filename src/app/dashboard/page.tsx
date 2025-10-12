"use client";

import React from 'react';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const DashboardPage = () => {
  return (
    <ErrorBoundary>
      <StudentDashboard />
    </ErrorBoundary>
  );
};

export default DashboardPage;
