export type PracticeSummary = {
    id: string;
    name: string;
    city: string;
    country: string;
    newPatientsThisMonth: number;
    appointmentRequests: number;
    conversionRate: number;
    showRate: number;
    showRateTrend?: number;
    monthlyTrend: number[];
};

export type PerformanceStatus = 'high' | 'stable' | 'at-risk';
