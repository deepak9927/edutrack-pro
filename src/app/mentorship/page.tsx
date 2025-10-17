import { MentorConnect } from '@/components/features/mentorship/mentor-connect';
import { FC } from 'react';

interface MentorshipPageProps {}

const MentorshipPage: FC<MentorshipPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI-Powered Mentor Connect</h1>
      <p className="text-gray-600 mb-8">
        Intelligent matching with ideal mentors.
      </p>
      <MentorConnect />
    </div>
  );
};

export default MentorshipPage;