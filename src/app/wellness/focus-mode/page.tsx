import { FocusModeSettingsComponent } from '@/components/features/wellness/focus-mode-settings';
import React from 'react';

const FocusModePage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Digital Wellness: Focus Mode Pro</h1>
      <FocusModeSettingsComponent />
    </div>
  );
};

export default FocusModePage;
