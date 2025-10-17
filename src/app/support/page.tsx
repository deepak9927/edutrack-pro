import { PeerSupportGroups } from '@/components/features/support/peer-support-groups';
import { FC } from 'react';

interface SupportPageProps {}

const SupportPage: FC<SupportPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Anonymous Support Network</h1>
      <p className="text-gray-600 mb-8">
        A safe and private space for mental health discussions.
      </p>
      <PeerSupportGroups />
    </div>
  );
};

export default SupportPage;