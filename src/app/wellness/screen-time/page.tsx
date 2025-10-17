import { ScreenTimeAnalytics } from '@/components/features/wellness/screen-time-analytics';
import { FC } from 'react';

interface ScreenTimePageProps {}

const ScreenTimePage: FC<ScreenTimePageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Screen Time Analytics</h1>
      <p className="text-gray-600 mb-8">
        Gain deep insights into your app usage and productivity patterns.
      </p>
      <ScreenTimeAnalytics />
    </div>
  );
};

export default ScreenTimePage;