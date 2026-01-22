import React from 'react';

interface MetricCardProps {
    label: string;
    value: string | number;
    suffix?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, suffix = '' }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-2xl font-bold text-gray-900">
                {value}
                {suffix && <span className="text-lg text-gray-600 ml-0.5">{suffix}</span>}
            </span>
        </div>
    );
};
