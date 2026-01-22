import React from 'react';
import type { PerformanceStatus } from '../types';

interface StatusBadgeProps {
    status: PerformanceStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const styles = {
        high: 'bg-green-50 text-green-700 border-green-200',
        stable: 'bg-blue-50 text-blue-700 border-blue-200',
        'at-risk': 'bg-red-50 text-red-700 border-red-200',
    };

    const dotColors = {
        high: 'bg-green-500',
        stable: 'bg-blue-500',
        'at-risk': 'bg-red-500',
    };

    const labels = {
        high: 'High Performer',
        stable: 'Stable',
        'at-risk': 'At Risk',
    };

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${styles[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
            {labels[status]}
        </div>
    );
};
