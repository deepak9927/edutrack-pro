import { StudyGroupFormation } from '@/components/features/community/study-group-formation';
import { FC } from 'react';

interface CommunityPageProps {}

const CommunityPage: FC<CommunityPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Community Learning Hub</h1>
      <p className="text-gray-600 mb-8">
        AI-optimized team creation based on learning styles and goals.
      </p>
      <StudyGroupFormation />
    </div>
  );
};

export default CommunityPage;