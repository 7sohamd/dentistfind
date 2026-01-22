import React from 'react';
import type { PracticeSummary } from '../types';
import { getStatusFromConversionRate } from '../helpers';
import { StatusBadge } from './StatusBadge';
import { MetricCard } from './MetricCard';
import { TrendBars } from './TrendBars';
import { Recommendations } from './Recommendations';

interface PracticeSummaryCardProps {
    practice: PracticeSummary;
    globalMax: number;
}

export const PracticeSummaryCard: React.FC<PracticeSummaryCardProps> = ({ practice, globalMax }) => {
    const status = getStatusFromConversionRate(practice.conversionRate);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden flex flex-col">
            <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{practice.name}</h3>
                    <StatusBadge status={status} />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {practice.city}, {practice.country}
                </p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 border-b border-gray-100">
                <MetricCard label="New Patients" value={practice.newPatientsThisMonth} />
                <MetricCard label="Appointment Requests" value={practice.appointmentRequests} />
                <MetricCard label="Conversion Rate" value={practice.conversionRate.toFixed(1)} suffix="%" />
                <MetricCard label="Show Rate" value={practice.showRate.toFixed(1)} suffix="%" />
            </div>
            <div className="p-6 pb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">6-Month Patient Trend</h4>
                <TrendBars data={practice.monthlyTrend} globalMax={globalMax} />
                <div className="flex justify-center mt-2">
                    <div className="flex justify-between text-xs text-gray-400" style={{ width: `${practice.monthlyTrend.length * 34 + (practice.monthlyTrend.length - 1) * 6}px` }}>
                        <span>6 mo</span>
                        <span>Now</span>
                    </div>
                </div>
            </div>
            <div className="px-6 pt-6 pb-6 bg-gray-50 flex-grow">
                <Recommendations practice={practice} />
            </div>
        </div>
    );
};
