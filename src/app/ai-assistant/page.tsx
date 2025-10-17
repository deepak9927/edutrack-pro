import { IntelligentPersonalAssistant } from '@/components/features/ai-assistant/intelligent-personal-assistant';
import { FC } from 'react';

interface AIAssistantPageProps {}

const AIAssistantPage: FC<AIAssistantPageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Intelligent Personal Assistant</h1>
      <p className="text-gray-600 mb-8">
        Voice and text-based interaction with context awareness.
      </p>
      <IntelligentPersonalAssistant />
    </div>
  );
};

export default AIAssistantPage;