import { CredentialTracking } from '@/components/features/achievements/credential-tracking';
import { FC } from 'react';

interface AchievementsPageProps {}

const AchievementsPage: FC<AchievementsPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gamified Achievement & Certification System</h1>
      <p className="text-gray-600 mb-8">
        Comprehensive credential tracking and gamification.
      </p>
      <CredentialTracking />
    </div>
  );
};

export default AchievementsPage;