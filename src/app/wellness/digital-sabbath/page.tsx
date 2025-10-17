import { DigitalSabbathPlanner } from '@/components/features/wellness/digital-sabbath-planner';
import { FC } from 'react';

interface DigitalSabbathPageProps {}

const DigitalSabbathPage: FC<DigitalSabbathPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Digital Sabbath Planner</h1>
      <p className="text-gray-600 mb-8">
        Scheduled offline time with alternative activity suggestions.
      </p>
      <DigitalSabbathPlanner />
    </div>
  );
};

export default DigitalSabbathPage;