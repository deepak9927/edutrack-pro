import { EyeCareSettingsComponent } from '@/components/features/wellness/eye-care-settings';
import { FC } from 'react';

interface EyeCarePageProps {}

const EyeCarePage: FC<EyeCarePageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Eye Care System</h1>
      <p className="text-gray-600 mb-8">
        Blue light monitoring, eye exercise reminders, posture alerts.
      </p>
      <EyeCareSettingsComponent />
    </div>
  );
};

export default EyeCarePage;