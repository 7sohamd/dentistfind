import React from 'react';
import { getRecommendations } from '../helpers';
import type { PracticeSummary } from '../types';

interface RecommendationsProps {
    practice: PracticeSummary;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ practice }) => {
    const recommendations = getRecommendations(practice);

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Recommendations</h4>
            <ul className="space-y-1.5">
                {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{recommendation}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
