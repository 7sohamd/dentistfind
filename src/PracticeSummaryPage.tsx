import React from 'react';

//types
export type PracticeSummary = {
  id: string;
  name: string;
  city: string;
  country: string;
  newPatientsThisMonth: number;
  appointmentRequests: number;
  conversionRate: number;
  showRate: number;
  monthlyTrend: number[];
};

export type PerformanceStatus = 'high' | 'stable' | 'at-risk';

export function getStatusFromConversionRate(conversionRate: number): PerformanceStatus {
  if (conversionRate >= 20) return 'high';
  if (conversionRate < 10) return 'at-risk';
  return 'stable';
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getRecommendations(practice: PracticeSummary): string[] {
  const { conversionRate, appointmentRequests } = practice;
  const recommendations: string[] = [];

  if (conversionRate < 10) {
    recommendations.push('Improve follow-up speed to capture more appointment requests');
    recommendations.push('Review messaging and value proposition on landing pages');
  } else if (conversionRate < 15 && appointmentRequests > 30) {
    recommendations.push('Optimize booking flow to reduce friction and increase conversions');
    recommendations.push('Consider adding live chat support during business hours');
  } else if (conversionRate >= 20) {
    recommendations.push('Maintain current follow-up processes—performance is strong');
    recommendations.push('Consider expanding marketing reach to increase volume');
  } else {
    recommendations.push('Continue monitoring conversion trends month-over-month');
    recommendations.push('Test A/B variations on appointment booking CTAs');
  }

  return recommendations.slice(0, 2);
}


//subcomponents
interface StatusBadgeProps {
  status: PerformanceStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, suffix = '' }) => {
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

interface TrendBarsProps {
  data: number[];
  globalMax: number;
}

const TrendBars: React.FC<TrendBarsProps> = ({ data }) => {
  const yAxisMax = 45;
  const yAxisLabels = [45, 35, 25, 15, 0];

  return (
    <div className="flex justify-center">
      <div className="flex gap-3">
        <div className="flex flex-col justify-between h-40 text-xs text-gray-400 pt-1 pb-1">
          {yAxisLabels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>
        <div className="relative h-40">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="border-t border-dashed border-gray-300"></div>
            <div className="border-t border-dashed border-gray-300"></div>
            <div className="border-t border-dashed border-gray-300"></div>
            <div className="border-t border-dashed border-gray-300"></div>
            <div className="border-t border-dashed border-gray-300"></div>
          </div>
          <div className="relative flex items-end gap-1.5 h-40">
            {data.map((value, index) => {
              const heightPercent = (value / yAxisMax) * 100;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all hover:from-emerald-600 hover:to-emerald-500"
                  style={{ height: `${heightPercent}%`, minHeight: '8%', width: '34px' }}
                  title={`Month ${index + 1}: ${value}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RecommendationsProps {
  practice: PracticeSummary;
}

const Recommendations: React.FC<RecommendationsProps> = ({ practice }) => {
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


//main-card
interface PracticeSummaryCardProps {
  practice: PracticeSummary;
  globalMax: number;
}

const PracticeSummaryCard: React.FC<PracticeSummaryCardProps> = ({ practice, globalMax }) => {
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


//mock-data
const mockPractices: PracticeSummary[] = [
  {
    id: '1',
    name: 'Downtown Dental Care',
    city: 'San Francisco',
    country: 'USA',
    newPatientsThisMonth: 42,
    appointmentRequests: 180,
    conversionRate: 23.3,
    monthlyTrend: [28, 32, 35, 38, 41, 42],
    showRate: 87.5,
  },
  {
    id: '2',
    name: 'Bright Smiles Clinic',
    city: 'Austin',
    country: 'USA',
    newPatientsThisMonth: 18,
    appointmentRequests: 220,
    conversionRate: 8.2,
    monthlyTrend: [25, 22, 20, 19, 18, 18],
    showRate: 72.3,
  },
  {
    id: '3',
    name: 'Elite Dental Studio',
    city: 'Toronto',
    country: 'Canada',
    newPatientsThisMonth: 31,
    appointmentRequests: 195,
    conversionRate: 15.9,
    monthlyTrend: [22, 25, 27, 28, 30, 31],
    showRate: 81.0,
  },
];

//main-page
export default function PracticeSummaryPage() {
  const globalMax = Math.max(...mockPractices.flatMap(p => p.monthlyTrend));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Dashboard</h1>
          <p className="text-gray-600">Monitor performance across all dental practices</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPractices.map((practice) => (
            <PracticeSummaryCard
              key={practice.id}
              practice={practice}
              globalMax={globalMax}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

