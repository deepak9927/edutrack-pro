import { EyeCareSettingsComponent } from '@/components/features/wellness/eye-care-settings';
import React from 'react';

const EyeCareSystemPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Digital Wellness: Eye Care System</h1>
      <EyeCareSettingsComponent />
    </div>
  );
};

export default EyeCareSystemPage;
