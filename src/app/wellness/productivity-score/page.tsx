import { ProductivityScore } from '@/components/features/wellness/productivity-score';
import { FC } from 'react';

interface ProductivityScorePageProps {}

const ProductivityScorePage: FC<ProductivityScorePageProps> = ({}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productivity Score</h1>
      <p className="text-gray-600 mb-8">
        AI-driven analysis of your digital habits and improvement suggestions.
      </p>
      <ProductivityScore />
    </div>
  );
};

export default ProductivityScorePage;